module AngularTypeaheadModule {

    class TypeaheadController {
        static $inject = ['$timeout', '$q'];

        constructor(private $timeout, private $q: angular.IQService) {
            this.selectedIdx = -1;
        }

        onSearch;
        ticket;
        searchDelay = 150;
        results;
        selectedIdx;
        _typeahead: any;
        typeaheadText;
        ngModel;
        update;
        resetValidity;
        onSelect: any;
        
        set typeahead(value: any){
            this._typeahead = value;
            if(this.resetValidity)
                this.resetValidity();
        }
        
        get typeahead(): any{
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
                this.typeahead = this.results[this.selectedIdx];
                this.onSelect();
            }
            this.selectedIdx = -1;
            this.update();
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
                    this.isVisible = this.results.length > 0;

                    defer.resolve();
                });

            }, this.searchDelay);

            return defer.promise;
        }
    }

    class TypeaheadDirective {
        static $inject = ['$compile', '$templateCache', '$parse', '$timeout'];

        constructor(private $compile, private $templateCache, private $parse, private $timeout) {}

        restrict = 'A';
        require = 'ngModel';
        controller = TypeaheadController;
        controllerAs = 'typeaheadVm';
        bindToController = true;
        scope = {
            typeahead: '=',
            typeaheadTemplate: '@',
            typeaheadText: '@',
            onSearch: '&',
            onSelect: '&'
        };

        link = ($scope, $element, $attrs, ngModelCtrl) => {
            var ctrl: TypeaheadController = $scope[this.controllerAs],
                $body = angular.element('body'),
                getTextFromModel = this.$parse($attrs.typeaheadText),
                content,
                tether;

            $element.attr("autocomplete", "off");

            $body.on("keyup.typeahead", e => {
                if (!this.isEscape(e))
                    return;

                ctrl.isVisible = false;
                $scope.$apply();
            });

            var blurTimer;

            $body.on("click.typeahead", e => {
                if ($element.is(e.target) || !content || content.is(e.target)) {
                    this.$timeout.cancel(blurTimer);
                    return;
                }

                ctrl.isVisible = false;
                $scope.$apply();
            });

            $element.on('blur.typeahead', () => {
                // Allow any click on the menu to come through first
                blurTimer = this.$timeout(() => {
                    var value = ngModelCtrl.$modelValue;

                    if (value == null || !value.length)
                        setValidity(true);
                    else if ($attrs.typeaheadSelectionRequired != null && ctrl.typeahead == null)
                        setValidity(false);

                    ctrl.isVisible = false;
                    $scope.$apply();
                }, 300);
            });

            ctrl.update = () => {
                var value = getTextFromModel(ctrl.typeahead) || ctrl.typeahead;
                ngModelCtrl.$setViewValue(value);

                setValidity(true);

                ngModelCtrl.$render();
            };

            $element.on('keydown.typeahead change.typeahead', e => {
                if (!ctrl.isVisible)
                    return true;

                if (this.isEscape(e)) {
                    ctrl.isVisible = false;
                    $scope.$apply();
                    return this.preventDefault(e);
                }

                if (this.isKeyUp(e)) {
                    ctrl.selectPrev();
                    $scope.$apply();
                    return this.preventDefault(e);
                }

                if (this.isKeyDown(e)) {
                    ctrl.selectNext();
                    $scope.$apply();
                    return this.preventDefault(e);
                }

                if ((this.isEnter(e) || this.isTab(e)) && ctrl.hasSelection()) {
                    ctrl.select();
                    ctrl.isVisible = false;
                    $scope.$apply();
                    return this.preventDefault(e);
                }

                return true;
            });

            $element.on('keyup.typeahead', e => {

                if (this.isControlKey(e))
                    return;

                ctrl.selectedIdx = -1;
                ctrl.typeahead = null;

                if (!content) {
                    var itemText = $attrs.typeaheadText == null ? "item" : `item.${$attrs.typeaheadText}`;
                    content = this.createContent($scope, $element, $attrs.typeaheadTemplate, itemText);
                    $body.append(content);
                    tether = new Tether({
                        target: $element,
                        targetAttachment: 'bottom left',
                        element: content,
                        attachment: 'top left',
                        classPrefix: 'typeahead',
                        targetOffset: '6px 0',
                        constraints: [
                            {
                                to: 'window',
                                attachment: 'together',
                                pin: ['top', 'left', 'bottom', 'right']
                            }
                        ]
                    });
                    $scope.$apply();
                }

                ctrl.search(ngModelCtrl.$modelValue).then(() => {
                    $scope.$applyAsync(() => {
                        tether.position();
                    });
                });
            });

            $element.addClass('typeahead-placeholder');

            $scope.$on('$destroy', () => {
                if (content) content.remove();
                $body.off("keyup.typeahead click.typeahead");
            });

            function setValidity(isValid: boolean) {
                ngModelCtrl.$setValidity('typeahead', isValid);
            }
            
            ctrl.resetValidity = () => {
                setValidity(true);
            };

            if (ctrl.typeahead != null)
                ctrl.update();
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

        createContent(scope, element, templateUrl, text) {
            var html = templateUrl ? this.$templateCache.get(templateUrl) : `<a href="#" class="typeahead-link">{{${text}}}</a>`,
                template = `<div class="typeahead" ng-class="{'typeahead--hidden':!typeaheadVm.isVisible}"><ul class="typeahead-menu"><li class="typeahead-item" ng-repeat="item in typeaheadVm.results" ng-class="{'typeahead-item--selected': typeaheadVm.isSelected($index)}" ng-click="typeaheadVm.select($index)">${html}</li></ul></div>`,
                content = angular.element(template);

            this.$compile(content)(scope);

            return content;
        }
    }

    Angular.module("ngTypeahead").directive('typeahead', TypeaheadDirective);
}