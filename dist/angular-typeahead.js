Angular.module("ngTypeahead", []);
var AngularTypeaheadModule;
(function (AngularTypeaheadModule) {
    var TypeaheadController = (function () {
        function TypeaheadController($timeout, $q) {
            this.$timeout = $timeout;
            this.$q = $q;
            this.searchDelay = 150;
            this.selectedIdx = -1;
        }
        Object.defineProperty(TypeaheadController.prototype, "typeahead", {
            get: function () {
                return this._typeahead;
            },
            set: function (value) {
                this._typeahead = value;
                if (this.resetValidity)
                    this.resetValidity();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeaheadController.prototype, "isVisible", {
            get: function () {
                return this._isVisible;
            },
            set: function (value) {
                this._isVisible = value;
                if (!this._isVisible)
                    this.cancelSearch();
            },
            enumerable: true,
            configurable: true
        });
        TypeaheadController.prototype.cancelSearch = function () {
            if (this.ticket != null)
                this.$timeout.cancel(this.ticket);
        };
        TypeaheadController.prototype.selectPrev = function () {
            if (this.selectedIdx > 0)
                this.selectedIdx--;
            else
                this.selectedIdx = this.results.length - 1;
        };
        TypeaheadController.prototype.selectNext = function () {
            if (this.selectedIdx < this.results.length - 1)
                this.selectedIdx++;
            else
                this.selectedIdx = 0;
        };
        TypeaheadController.prototype.select = function ($index) {
            if ($index != null)
                this.selectedIdx = $index;
            if (this.selectedIdx > -1)
                this.typeahead = this.results[this.selectedIdx];
            this.selectedIdx = -1;
            this.update();
        };
        TypeaheadController.prototype.isSelected = function ($index) {
            return this.selectedIdx === $index;
        };
        TypeaheadController.prototype.hasSelection = function () {
            return this.selectedIdx > -1;
        };
        TypeaheadController.prototype.search = function (text) {
            var _this = this;
            var defer = this.$q.defer();
            this.cancelSearch();
            if (text == null || text.length === 0) {
                this.results = [];
                this.isVisible = false;
                defer.resolve();
                return defer.promise;
            }
            this.ticket = this.$timeout(function () {
                var promise = _this.onSearch({ text: text });
                if (!promise.then) {
                    _this.results = promise;
                    defer.resolve();
                    return;
                }
                promise.then(function (results) {
                    _this.results = results;
                    _this.isVisible = _this.results.length > 0;
                    defer.resolve();
                });
            }, this.searchDelay);
            return defer.promise;
        };
        TypeaheadController.$inject = ['$timeout', '$q'];
        return TypeaheadController;
    })();
    var TypeaheadDirective = (function () {
        function TypeaheadDirective($compile, $templateCache, $parse, $timeout) {
            var _this = this;
            this.$compile = $compile;
            this.$templateCache = $templateCache;
            this.$parse = $parse;
            this.$timeout = $timeout;
            this.restrict = 'A';
            this.require = 'ngModel';
            this.controller = TypeaheadController;
            this.controllerAs = 'typeaheadVm';
            this.bindToController = true;
            this.scope = {
                typeahead: '=',
                typeaheadTemplate: '@',
                typeaheadText: '@',
                onSearch: '&'
            };
            this.link = function ($scope, $element, $attrs, ngModelCtrl) {
                var ctrl = $scope[_this.controllerAs], $body = angular.element('body'), getTextFromModel = _this.$parse($attrs.typeaheadText), content, tether;
                $element.attr("autocomplete", "off");
                $body.on("keyup.typeahead", function (e) {
                    if (!_this.isEscape(e))
                        return;
                    ctrl.isVisible = false;
                    $scope.$apply();
                });
                var blurTimer;
                $body.on("click.typeahead", function (e) {
                    if ($element.is(e.target) || !content || content.is(e.target)) {
                        _this.$timeout.cancel(blurTimer);
                        return;
                    }
                    ctrl.isVisible = false;
                    $scope.$apply();
                });
                $element.on('blur.typeahead', function () {
                    blurTimer = _this.$timeout(function () {
                        var value = ngModelCtrl.$modelValue;
                        if (value == null || !value.length)
                            setValidity(true);
                        else if ($attrs.typeaheadSelectionRequired != null && ctrl.typeahead == null)
                            setValidity(false);
                        ctrl.isVisible = false;
                        $scope.$apply();
                    }, 300);
                });
                ctrl.update = function () {
                    var value = getTextFromModel(ctrl.typeahead) || ctrl.typeahead;
                    ngModelCtrl.$setViewValue(value);
                    setValidity(true);
                    ngModelCtrl.$render();
                };
                $element.on('keydown.typeahead change.typeahead', function (e) {
                    if (!ctrl.isVisible)
                        return true;
                    if (_this.isEscape(e)) {
                        ctrl.isVisible = false;
                        $scope.$apply();
                        return _this.preventDefault(e);
                    }
                    if (_this.isKeyUp(e)) {
                        ctrl.selectPrev();
                        $scope.$apply();
                        return _this.preventDefault(e);
                    }
                    if (_this.isKeyDown(e)) {
                        ctrl.selectNext();
                        $scope.$apply();
                        return _this.preventDefault(e);
                    }
                    if ((_this.isEnter(e) || _this.isTab(e)) && ctrl.hasSelection()) {
                        ctrl.select();
                        ctrl.isVisible = false;
                        $scope.$apply();
                        return _this.preventDefault(e);
                    }
                    return true;
                });
                $element.on('keyup.typeahead', function (e) {
                    if (_this.isControlKey(e))
                        return;
                    ctrl.selectedIdx = -1;
                    ctrl.typeahead = null;
                    if (!content) {
                        var itemText = $attrs.typeaheadText == null ? "item" : "item." + $attrs.typeaheadText;
                        content = _this.createContent($scope, $element, $attrs.typeaheadTemplate, itemText);
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
                    ctrl.search(ngModelCtrl.$modelValue).then(function () {
                        $scope.$applyAsync(function () {
                            tether.position();
                        });
                    });
                });
                $element.addClass('typeahead-placeholder');
                $scope.$on('$destroy', function () {
                    if (content)
                        content.remove();
                    $body.off("keyup.typeahead click.typeahead");
                });
                function setValidity(isValid) {
                    ngModelCtrl.$setValidity('typeahead', isValid);
                }
                ctrl.resetValidity = function () {
                    setValidity(true);
                };
                if (ctrl.typeahead != null)
                    ctrl.update();
            };
        }
        TypeaheadDirective.prototype.preventDefault = function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };
        TypeaheadDirective.prototype.isEscape = function (e) {
            return e.which === 27;
        };
        TypeaheadDirective.prototype.isEnter = function (e) {
            return e.which === 9;
        };
        TypeaheadDirective.prototype.isTab = function (e) {
            return e.which === 13;
        };
        TypeaheadDirective.prototype.isKeyUp = function (e) {
            return e.which === 38;
        };
        TypeaheadDirective.prototype.isKeyDown = function (e) {
            return e.which === 40;
        };
        TypeaheadDirective.prototype.isControlKey = function (e) {
            var k = e.which;
            return k === 9 || k === 13 || (k >= 16 && k <= 20) || k === 27 || (k >= 33 && k <= 40) || k === 45 || (k >= 91 && k <= 93);
        };
        TypeaheadDirective.prototype.createContent = function (scope, element, templateUrl, text) {
            var html = templateUrl ? this.$templateCache.get(templateUrl) : "<a href=\"#\" class=\"typeahead-link\">{{" + text + "}}</a>", template = "<div class=\"typeahead\" ng-class=\"{'typeahead--hidden':!typeaheadVm.isVisible}\"><ul class=\"typeahead-menu\"><li class=\"typeahead-item\" ng-repeat=\"item in typeaheadVm.results\" ng-class=\"{'typeahead-item--selected': typeaheadVm.isSelected($index)}\" ng-click=\"typeaheadVm.select($index)\">" + html + "</li></ul></div>", content = angular.element(template);
            this.$compile(content)(scope);
            return content;
        };
        TypeaheadDirective.$inject = ['$compile', '$templateCache', '$parse', '$timeout'];
        return TypeaheadDirective;
    })();
    Angular.module("ngTypeahead").directive('typeahead', TypeaheadDirective);
})(AngularTypeaheadModule || (AngularTypeaheadModule = {}));
