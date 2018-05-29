module AngularTypeaheadModule {

    class TypeaheadController {
        static $inject = ['$timeout', '$q', 'isMobile'];

        constructor(private $timeout, private $q: angular.IQService) {
            this.selectedIdx = -1;
            this._isVisible = false;
            this.searchDelay = 150;
        }

        onSearch;
        ticket;
        searchDelay: number;
        results;
        selectedIdx: number;
        _typeahead: any;
        typeaheadText;
        ngModel;
        update;
        resetValidity;
        onSelect: any;
        typeaheadName: string;

        set typeahead(value: any) {
            this._typeahead = value;
            if (this.resetValidity)
                this.resetValidity();
        }

        get typeahead(): any {
            return this._typeahead;
        }

        private _isVisible: boolean;

        get isVisible() {
            return this._isVisible;
        }

        set isVisible(value: boolean) {
            this._isVisible = value;
            if (!this._isVisible)
                this.cancelSearch();
        }

        cancelSearch() {
            if (this.ticket != null)
                this.$timeout.cancel(this.ticket);
        }

        selectPrev() {
            if (this.selectedIdx > 0)
                this.selectedIdx--;
            else this.selectedIdx = this.results.length - 1;
        }

        selectNext() {
            if (this.selectedIdx < this.results.length - 1)
                this.selectedIdx++;
            else this.selectedIdx = 0;
        }

        select($index?) {
            if ($index != null) // single equality (=) to snag undefined also
                this.selectedIdx = $index;
            if (this.selectedIdx > -1) {
                var value = this.results[this.selectedIdx];
                this.typeahead = value;
            }
            this.selectedIdx = -1;
            this.update();

            if(this.typeahead != undefined)
                this.onSelect({value:this.typeahead});
        }

        isSelected($index) {
            return this.selectedIdx === $index;
        }

        hasSelection() {
            return this.selectedIdx > -1;
        }

        search(text) {
            var defer = this.$q.defer<any>();

            this.cancelSearch();

            if (text == null || text.length === 0) {
                this.results = [];
                this.isVisible = false;

                defer.resolve();
                return defer.promise;
            }

            this.ticket = this.$timeout(() => {
                var promise = this.onSearch({ text: text });

                if (!promise.then) {
                    this.results = promise;
                    defer.resolve();
                    return;
                }

                promise.then(results => {
                    this.results = results;

                    defer.resolve();
                });

            }, this.searchDelay);

            return defer.promise;
        }
    }

    class TypeaheadDirective {
        static $inject = ['$compile', '$templateCache', '$parse', '$timeout', 'isMobile'];

        constructor(
            private $compile: angular.ICompileService,
            private $templateCache: angular.ITemplateCacheService,
            private $parse: angular.IParseService,
            private $timeout: angular.ITimeoutService,
            private isMobile: boolean
        ) { }

        restrict = 'A';
        require = ['typeahead', 'ngModel'];
        controller = TypeaheadController;
        controllerAs = 'typeaheadVm';
        bindToController = true;
        scope = {
            typeahead: '=?',
            typeaheadTemplate: '@',
            typeaheadText: '@',
            typeaheadName: '@',
            onSearch: '&',
            onSelect: '&'
        };

        link = ($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, ctrls: any[]) => {
            var $ctrl: TypeaheadController = ctrls[0],
                $ngModelCtrl: angular.INgModelController = ctrls[1],
                $body = angular.element('body'),
                getTextFromModel = this.$parse($attrs['typeaheadText']),
                getContent: () => angular.IAugmentedJQuery;

            $element.attr("autocomplete", "off");

            $ctrl.update = () => {
                var value = getTextFromModel($ctrl.typeahead) || $ctrl.typeahead;
                //$ngModelCtrl.$setViewValue(value); // dont do this...
                $ngModelCtrl.$viewValue = value; // do this, because of ng-disabled
                $ngModelCtrl.$render();

                setValidity(true);
            };

            $element.addClass('typeahead-placeholder');

            $scope.$on('$destroy', () => {
                var content = getContent();
                if (content) content.remove();
                $body.off("keyup.typeahead click.typeahead");
            });

            function setValidity(isValid: boolean) {
                $ngModelCtrl.$setValidity('typeahead', isValid);
            }

            $ctrl.resetValidity = () => {
                setValidity(true);
            };

            if ($ctrl.typeahead != null)
                $ctrl.update();

            if (this.isMobile) {
                getContent = this.linkMobile($scope, $element, $attrs, $ctrl, $ngModelCtrl);
                return;
            }

            getContent = this.linkDesktop($scope, $element, $attrs, $ctrl, $ngModelCtrl);
        };

        linkMobile = ($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, $ctrl: TypeaheadController, $ngModelCtrl: angular.INgModelController) => {
            var $body = angular.element('body'),
                $content: angular.IAugmentedJQuery,
                $input: angular.IAugmentedJQuery,
                $close: angular.IAugmentedJQuery,
                $placeholder: angular.IAugmentedJQuery,
                blurTimer;

            function setValidity(isValid: boolean) {
                $ngModelCtrl.$setValidity('typeahead', isValid);
            }

            var freezeVp = function (e) {
                e.preventDefault();
            };

            function stopBodyScrolling(stopScroll) {
                if (stopScroll) {
                    $body.on("touchmove", freezeVp);
                    $body.addClass("typeahead-mobile-body");
                } else {
                    $body.off("touchmove", freezeVp);
                    $body.removeClass("typeahead-mobile-body");
                }
            }

            var ensureContentExists = () => {
                if ($content)
                    return;

                $content = this.createContentFromAttr($scope, $element, $attrs, $ctrl);
                $body.append($content);

                $input = $content.find(".typeahead-mobile-input");

                $input.on('keyup.typeahead', e => {
                    if (this.isControlKey(e))
                        return;

                    $ctrl.selectedIdx = -1;
                    $ctrl.typeahead = null;

                    $ngModelCtrl.$setViewValue($input.val());
                    $scope.$apply();
                });

                $input.on('blur.typeahead', (e) => {
                    this.$timeout(() => {
                        stopBodyScrolling(false);
                        $content.removeClass('typeahead-mobile-dropdown');

                        var value = $ngModelCtrl.$modelValue;

                        if (value == null || !value.length)
                            setValidity(true);
                        else if ($attrs['typeaheadSelectionRequired'] != null && $ctrl.typeahead == null)
                            setValidity(false);

                        $ctrl.isVisible = false;
                        $scope.$apply();

                        $ngModelCtrl.$render();
                    }, 300);
                });

                $close = $content.find(".typeahead-mobile-close");
            };

            $element.on('focus.typeahead', () => {
                ensureContentExists();
                $content.addClass('typeahead-mobile-dropdown');
                $input.val($ngModelCtrl.$viewValue);

                stopBodyScrolling(true);

                $ctrl.results = [];
                $ctrl.isVisible = true;
                $scope.$apply();

                $input.focus();
            });

            $ngModelCtrl.$viewChangeListeners.push(() => {
                $ctrl.search($ngModelCtrl.$viewValue);
            });

            return () => $content;
        };

        linkDesktop = ($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, $ctrl: TypeaheadController, $ngModelCtrl: angular.INgModelController) => {
            var $body = angular.element('body'),
                content: angular.IAugmentedJQuery;

            $body.on("keyup.typeahead", e => {
                if (!this.isEscape(e))
                    return;

                $ctrl.isVisible = false;
                $scope.$apply();
            });

            $element.on('keyup.typeahead', e => {
                if (this.isControlKey(e))
                    return;

                $ctrl.selectedIdx = -1;
                $ctrl.typeahead = null;

                $ctrl.search($ngModelCtrl.$modelValue).then(() => {
                    $ctrl.isVisible = $ctrl.results.length > 0;
                });
            });

            $element.on('keydown.typeahead change.typeahead', e => {
                if (!$ctrl.isVisible)
                    return true;

                if (this.isEscape(e)) {
                    $ctrl.isVisible = false;
                    $scope.$apply();
                    return this.preventDefault(e);
                }

                if (this.isKeyUp(e)) {
                    $ctrl.selectPrev();
                    $scope.$apply();
                    return this.preventDefault(e);
                }

                if (this.isKeyDown(e)) {
                    $ctrl.selectNext();
                    $scope.$apply();
                    return this.preventDefault(e);
                }

                if ((this.isEnter(e) || this.isTab(e)) && $ctrl.hasSelection()) {
                    $ctrl.select();
                    $ctrl.isVisible = false;
                    $scope.$apply();
                    return this.preventDefault(e);
                }

                return true;
            });

            $element.on('focus.typeahead', () => {
                if (content)
                    return;

                content = this.createContentFromAttr($scope, $element, $attrs, $ctrl);
                $body.append(content);

                var tether = new Tether({
                    target: $element,
                    targetAttachment: 'bottom left',
                    element: content,
                    attachment: 'top left',
                    classPrefix: 'typeahead',
                    targetOffset: '6px 0',
                    constraints: [{
                        to: 'window',
                        attachment: 'together',
                        pin: ['top', 'left', 'bottom', 'right']
                    }]
                });

                tether.position();
                $scope.$apply();
            });

            function setValidity(isValid: boolean) {
                $ngModelCtrl.$setValidity('typeahead', isValid);
            }

            var blurTimer;

            $body.on("click.typeahead", (e: JQuery.Event) => {
                const target = e.target as Element;
                if ($element.is(target) || !content || content.is(target)) {
                    this.$timeout.cancel(blurTimer);
                    return;
                }

                $ctrl.isVisible = false;
                $scope.$apply();
            });

            $element.on('blur.typeahead', () => {
                // Allow any click on the menu to come through first
                blurTimer = this.$timeout(() => {
                    var value = $ngModelCtrl.$modelValue;

                    if (value == null || !value.length)
                        setValidity(true);
                    else if ($attrs['typeaheadSelectionRequired'] != null && $ctrl.typeahead == null)
                        setValidity(false);

                    $ctrl.isVisible = false;
                    $ctrl.results = [];
                    $scope.$apply();
                }, 300);
            });

            return () => content;
        };

        preventDefault(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        isEscape(e) {
            return e.which === 27;
        }

        isEnter(e) {
            return e.which === 9;
        }

        isTab(e) {
            return e.which === 13;
        }

        isKeyUp(e) {
            return e.which === 38;
        }

        isKeyDown(e) {
            return e.which === 40;
        }

        isControlKey(e) {
            var k = e.which;
            return k === 9 || k === 13 || (k >= 16 && k <= 20) || k === 27 || (k >= 33 && k <= 40) || k === 45 || (k >= 91 && k <= 93);
        }

        createContentFromAttr($scope, $element, $attrs, $ctrl: TypeaheadController) {
            var itemText = $attrs['typeaheadText'] == null ? "item" : `item.${$attrs['typeaheadText']}`,
                name = $ctrl.typeaheadName || $scope.$id,
                content = this.createContent($scope, $element, $attrs['typeaheadTemplate'], name, itemText);
            return content;
        }

        createContent(scope: angular.IScope, element, templateUrl, name, text) {
            var html = templateUrl ? this.$templateCache.get(templateUrl) : `<a href="#" class="typeahead-link">{{${text}}}</a>`,
                template = `
                <div class="typeahead typeahead-${name}" ng-class="{'typeahead--hidden':!typeaheadVm.isVisible}">
                    <div class="typeahead-mobile-top">
                        <input class="typeahead-mobile-input" type="text"><i class="typeahead-mobile-close">&times;</i>
                    </div>
                    <div class="typeahead-mobile-bottom">
                        <ul class="typeahead-menu">
                            <li class="typeahead-item" ng-repeat="item in typeaheadVm.results" ng-class="{'typeahead-item--selected': typeaheadVm.isSelected($index)}"
                                ng-click="typeaheadVm.select($index)">${html}</li>
                        </ul>
                    </div>
                </div>
                `,
                content = angular.element(template);
            this.$compile(content)(scope);
            return content;
        }
    }

    Angular.module("ngTypeahead").directive('typeahead', TypeaheadDirective);
}