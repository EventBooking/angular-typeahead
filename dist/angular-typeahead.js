/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../bower_components/angular-typescript-module/dist/angular-typescript-module.d.ts"/>
Angular.module("ngTypeahead", []);
var AngularTypeaheadModule;
(function (AngularTypeaheadModule) {
    var MobileConfig = (function () {
        function MobileConfig() {
        }
        MobileConfig.isMobile = function () {
            var agent = navigator.userAgent || navigator.vendor || window["opera"];
            var test1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(agent);
            var agentPrefix = agent.substr(0, 4);
            var test2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agentPrefix);
            return test1 || test2;
        };
        return MobileConfig;
    })();
    Angular.module("ngTypeahead").constant('isMobile', MobileConfig.isMobile());
})(AngularTypeaheadModule || (AngularTypeaheadModule = {}));
var AngularTypeaheadModule;
(function (AngularTypeaheadModule) {
    var TypeaheadController = (function () {
        function TypeaheadController($timeout, $q) {
            this.$timeout = $timeout;
            this.$q = $q;
            this.selectedIdx = -1;
            this._isVisible = false;
            this.searchDelay = 150;
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
            if (this.selectedIdx > -1) {
                this.typeahead = this.results[this.selectedIdx];
                this.onSelect();
            }
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
        TypeaheadController.$inject = ['$timeout', '$q', 'isMobile'];
        return TypeaheadController;
    })();
    var TypeaheadDirective = (function () {
        function TypeaheadDirective($compile, $templateCache, $parse, $timeout, isMobile) {
            var _this = this;
            this.$compile = $compile;
            this.$templateCache = $templateCache;
            this.$parse = $parse;
            this.$timeout = $timeout;
            this.isMobile = isMobile;
            this.restrict = 'A';
            this.require = ['typeahead', 'ngModel'];
            this.controller = TypeaheadController;
            this.controllerAs = 'typeaheadVm';
            this.bindToController = true;
            this.scope = {
                typeahead: '=',
                typeaheadTemplate: '@',
                typeaheadText: '@',
                onSearch: '&',
                onSelect: '&'
            };
            this.link = function ($scope, $element, $attrs, ctrls) {
                var $ctrl = ctrls[0], $ngModelCtrl = ctrls[1], $body = angular.element('body'), getTextFromModel = _this.$parse($attrs['typeaheadText']), getContent;
                $element.attr("autocomplete", "off");
                $body.on("keyup.typeahead", function (e) {
                    if (!_this.isEscape(e))
                        return;
                    $ctrl.isVisible = false;
                    $scope.$apply();
                });
                $ctrl.update = function () {
                    var value = getTextFromModel($ctrl.typeahead) || $ctrl.typeahead;
                    $ngModelCtrl.$setViewValue(value);
                    setValidity(true);
                    $ngModelCtrl.$render();
                };
                $element.on('keydown.typeahead change.typeahead', function (e) {
                    if (!$ctrl.isVisible)
                        return true;
                    if (_this.isEscape(e)) {
                        $ctrl.isVisible = false;
                        $scope.$apply();
                        return _this.preventDefault(e);
                    }
                    if (_this.isKeyUp(e)) {
                        $ctrl.selectPrev();
                        $scope.$apply();
                        return _this.preventDefault(e);
                    }
                    if (_this.isKeyDown(e)) {
                        $ctrl.selectNext();
                        $scope.$apply();
                        return _this.preventDefault(e);
                    }
                    if ((_this.isEnter(e) || _this.isTab(e)) && $ctrl.hasSelection()) {
                        $ctrl.select();
                        $ctrl.isVisible = false;
                        $scope.$apply();
                        return _this.preventDefault(e);
                    }
                    return true;
                });
                $element.on('keyup.typeahead', function (e) {
                    if (_this.isControlKey(e))
                        return;
                    $ctrl.selectedIdx = -1;
                    $ctrl.typeahead = null;
                    $ctrl.search($ngModelCtrl.$modelValue);
                });
                $element.addClass('typeahead-placeholder');
                $scope.$on('$destroy', function () {
                    var content = getContent();
                    if (content)
                        content.remove();
                    $body.off("keyup.typeahead click.typeahead");
                });
                function setValidity(isValid) {
                    $ngModelCtrl.$setValidity('typeahead', isValid);
                }
                $ctrl.resetValidity = function () {
                    setValidity(true);
                };
                if ($ctrl.typeahead != null)
                    $ctrl.update();
                if (_this.isMobile) {
                    getContent = _this.linkMobile($scope, $element, $attrs, $ctrl, $ngModelCtrl);
                    return;
                }
                getContent = _this.linkDesktop($scope, $element, $attrs, $ctrl, $ngModelCtrl);
            };
            this.linkMobile = function ($scope, $element, $attrs, $ctrl, $ngModelCtrl) {
                var $body = angular.element('body'), $content, $placeholder;
                $element.addClass('typeahead-mobile typeahead-mobile--input');
                function setValidity(isValid) {
                    $ngModelCtrl.$setValidity('typeahead', isValid);
                }
                var ensurePlaceholderExists = function () {
                    if ($placeholder)
                        return;
                    $placeholder = angular.element("<div class='typeahead-placeholder'></div>");
                };
                var moveElementToBody = function () {
                    if (isBodyElement())
                        return;
                    ensurePlaceholderExists();
                    $placeholder.insertBefore($element);
                    $body.append($element);
                    $element.addClass('typeahead-mobile--focused');
                    $element.focus();
                    ensureContentExists();
                    $content.addClass('typeahead-mobile--focused');
                    $ctrl.isVisible = true;
                    $ctrl.search($ngModelCtrl.$viewValue);
                };
                var moveElementBack = function () {
                    if (!isBodyElement() || $placeholder == null)
                        return;
                    $element.removeClass('typeahead-mobile--focused');
                    $content.removeClass('typeahead-mobile--focused');
                    $element.insertBefore($placeholder);
                    $placeholder.remove();
                    $ctrl.isVisible = false;
                };
                var ensureContentExists = function () {
                    if ($content)
                        return;
                    $content = _this.createContentFromAttr($scope, $element, $attrs);
                    $content.on('click.typeahead', function ($event) {
                        moveElementBack();
                        $ctrl.isVisible = false;
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.$apply();
                    });
                    $content.addClass('typeahead-mobile typeahead-mobile--dropdown');
                    $body.append($content);
                };
                var initElement = function () {
                    moveElementToBody();
                };
                var isBodyElement = function () {
                    return $element.parent().is($body);
                };
                $element.on('focus.typeahead', function () {
                    var value = $ngModelCtrl.$modelValue;
                    if (value == null || !value.length)
                        setValidity(true);
                    else if ($attrs['typeaheadSelectionRequired'] != null && $ctrl.typeahead == null)
                        setValidity(false);
                    moveElementToBody();
                    $ctrl.results = [];
                    $ctrl.isVisible = true;
                    $scope.$apply();
                });
                return function () { return $content; };
            };
            this.linkDesktop = function ($scope, $element, $attrs, $ctrl, $ngModelCtrl) {
                var $body = angular.element('body'), content;
                $element.on('focus.typeahead', function () {
                    if (content)
                        return;
                    content = _this.createContentFromAttr($scope, $element, $attrs);
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
                function setValidity(isValid) {
                    $ngModelCtrl.$setValidity('typeahead', isValid);
                }
                var blurTimer;
                $body.on("click.typeahead", function (e) {
                    if ($element.is(e.target) || !content || content.is(e.target)) {
                        _this.$timeout.cancel(blurTimer);
                        return;
                    }
                    $ctrl.isVisible = false;
                    $scope.$apply();
                });
                $element.on('blur.typeahead', function () {
                    // Allow any click on the menu to come through first
                    blurTimer = _this.$timeout(function () {
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
                return function () { return content; };
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
        TypeaheadDirective.prototype.createContentFromAttr = function ($scope, $element, $attrs) {
            var itemText = $attrs['typeaheadText'] == null ? "item" : "item." + $attrs['typeaheadText'], content = this.createContent($scope, $element, $attrs['typeaheadTemplate'], itemText);
            return content;
        };
        TypeaheadDirective.prototype.createContent = function (scope, element, templateUrl, text) {
            var html = templateUrl ? this.$templateCache.get(templateUrl) : "<a href=\"#\" class=\"typeahead-link\">{{" + text + "}}</a>", template = "<div class=\"typeahead\" ng-class=\"{'typeahead--hidden':!typeaheadVm.isVisible}\"><ul class=\"typeahead-menu\"><li class=\"typeahead-item\" ng-repeat=\"item in typeaheadVm.results\" ng-class=\"{'typeahead-item--selected': typeaheadVm.isSelected($index)}\" ng-click=\"typeaheadVm.select($index)\">" + html + "</li></ul></div>", content = angular.element(template);
            this.$compile(content)(scope);
            return content;
        };
        TypeaheadDirective.$inject = ['$compile', '$templateCache', '$parse', '$timeout', 'isMobile'];
        return TypeaheadDirective;
    })();
    Angular.module("ngTypeahead").directive('typeahead', TypeaheadDirective);
})(AngularTypeaheadModule || (AngularTypeaheadModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10eXBlYWhlYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL21vYmlsZS50cyIsIi4uL3NyYy90eXBlYWhlYWQudHMiXSwibmFtZXMiOlsiQW5ndWxhclR5cGVhaGVhZE1vZHVsZSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuTW9iaWxlQ29uZmlnIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5Nb2JpbGVDb25maWcuY29uc3RydWN0b3IiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLk1vYmlsZUNvbmZpZy5pc01vYmlsZSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlciIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlci50eXBlYWhlYWQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZENvbnRyb2xsZXIuaXNWaXNpYmxlIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLmNhbmNlbFNlYXJjaCIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlci5zZWxlY3RQcmV2IiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLnNlbGVjdE5leHQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZENvbnRyb2xsZXIuc2VsZWN0IiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLmlzU2VsZWN0ZWQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZENvbnRyb2xsZXIuaGFzU2VsZWN0aW9uIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLnNlYXJjaCIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkRGlyZWN0aXZlIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuY29uc3RydWN0b3IiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5jb25zdHJ1Y3Rvci5zZXRWYWxpZGl0eSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkRGlyZWN0aXZlLnByZXZlbnREZWZhdWx0IiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuaXNFc2NhcGUiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5pc0VudGVyIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuaXNUYWIiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5pc0tleVVwIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuaXNLZXlEb3duIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuaXNDb250cm9sS2V5IiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuY3JlYXRlQ29udGVudEZyb21BdHRyIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuY3JlYXRlQ29udGVudCJdLCJtYXBwaW5ncyI6IkFBQUEsMkNBQTJDO0FBQzNDLHlHQUF5RztBQUd6RyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQ0psQyxJQUFPLHNCQUFzQixDQWU1QjtBQWZELFdBQU8sc0JBQXNCLEVBQUMsQ0FBQztJQUUzQkE7UUFBQUM7UUFVQUMsQ0FBQ0E7UUFUVUQscUJBQVFBLEdBQWZBO1lBQ0lFLElBQUlBLEtBQUtBLEdBQUdBLFNBQVNBLENBQUNBLFNBQVNBLElBQUlBLFNB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TUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7b0JBRWhCQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDbkJBLEtBQUtBLENBQUNBLFNBQVNBLEdBQUdBLEtBQUtBLENBQUNBO3dCQUN4QkEsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7d0JBQ2hCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDbENBLENBQUNBO29CQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDbEJBLEtBQUtBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBO3dCQUNuQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7d0JBQ2hCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDbENBLENBQUNBO29CQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDcEJBLEtBQUtBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBO3dCQUNuQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7d0JBQ2hCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDbENBLENBQUNBO29CQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDN0RBLEtBQUtB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QUFDQSxPQUFPQSxDQUFDQTtRQUNuQkEsQ0FBQ0E7UUF2VE1YLDBCQUFPQSxHQUFHQSxDQUFDQSxVQUFVQSxFQUFFQSxnQkFBZ0JBLEVBQUVBLFFBQVFBLEVBQUVBLFVBQVVBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO1FBd1R0RkEseUJBQUNBO0lBQURBLENBQUNBLEFBelREZixJQXlUQ0E7SUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsV0FBV0EsRUFBRUEsa0JBQWtCQSxDQUFDQSxDQUFDQTtBQUM3RUEsQ0FBQ0EsRUFoYk0sc0JBQXNCLEtBQXRCLHNCQUFzQixRQWdiNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jvd2VyX2NvbXBvbmVudHMvYW5ndWxhci10eXBlc2NyaXB0LW1vZHVsZS9kaXN0L2FuZ3VsYXItdHlwZXNjcmlwdC1tb2R1bGUuZC50c1wiLz5cclxuZGVjbGFyZSB2YXIgVGV0aGVyOiBhbnk7XHJcblxyXG5Bbmd1bGFyLm1vZHVsZShcIm5nVHlwZWFoZWFkXCIsIFtdKTsiLCJtb2R1bGUgQW5ndWxhclR5cGVhaGVhZE1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgTW9iaWxlQ29uZmlnIHtcclxuICAgICAgICBzdGF0aWMgaXNNb2JpbGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBhZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3dbXCJvcGVyYVwiXTtcclxuICAgICAgICAgICAgdmFyIHRlc3QxID0gLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWluby9pLnRlc3QoYWdlbnQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFnZW50UHJlZml4ID0gYWdlbnQuc3Vic3RyKDAsIDQpO1xyXG4gICAgICAgICAgICB2YXIgdGVzdDIgPSAvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGFnZW50UHJlZml4KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0ZXN0MSB8fCB0ZXN0MjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ1R5cGVhaGVhZFwiKS5jb25zdGFudCgnaXNNb2JpbGUnLCBNb2JpbGVDb25maWcuaXNNb2JpbGUoKSk7XHJcbn0iLCJtb2R1bGUgQW5ndWxhclR5cGVhaGVhZE1vZHVsZSB7XHJcblxyXG4gICAgY2xhc3MgVHlwZWFoZWFkQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyR0aW1lb3V0JywgJyRxJywgJ2lzTW9iaWxlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHRpbWVvdXQsIHByaXZhdGUgJHE6IGFuZ3VsYXIuSVFTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5faXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoRGVsYXkgPSAxNTA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblNlYXJjaDtcclxuICAgICAgICB0aWNrZXQ7XHJcbiAgICAgICAgc2VhcmNoRGVsYXk6IG51bWJlcjtcclxuICAgICAgICByZXN1bHRzO1xyXG4gICAgICAgIHNlbGVjdGVkSWR4OiBudW1iZXI7XHJcbiAgICAgICAgX3R5cGVhaGVhZDogYW55O1xyXG4gICAgICAgIHR5cGVhaGVhZFRleHQ7XHJcbiAgICAgICAgbmdNb2RlbDtcclxuICAgICAgICB1cGRhdGU7XHJcbiAgICAgICAgcmVzZXRWYWxpZGl0eTtcclxuICAgICAgICBvblNlbGVjdDogYW55O1xyXG5cclxuICAgICAgICBzZXQgdHlwZWFoZWFkKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHlwZWFoZWFkID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc2V0VmFsaWRpdHkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0VmFsaWRpdHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB0eXBlYWhlYWQoKTogYW55IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGVhaGVhZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2lzVmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgZ2V0IGlzVmlzaWJsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzVmlzaWJsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBpc1Zpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5faXNWaXNpYmxlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxTZWFyY2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbmNlbFNlYXJjaCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGlja2V0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0LmNhbmNlbCh0aGlzLnRpY2tldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RQcmV2KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZElkeCA+IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSWR4LS07XHJcbiAgICAgICAgICAgIGVsc2UgdGhpcy5zZWxlY3RlZElkeCA9IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0TmV4dCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJZHggPCB0aGlzLnJlc3VsdHMubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJZHgrKztcclxuICAgICAgICAgICAgZWxzZSB0aGlzLnNlbGVjdGVkSWR4ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdCgkaW5kZXg/KSB7XHJcbiAgICAgICAgICAgIGlmICgkaW5kZXggIT0gbnVsbCkgLy8gc2luZ2xlIGVxdWFsaXR5ICg9KSB0byBzbmFnIHVuZGVmaW5lZCBhbHNvXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSWR4ID0gJGluZGV4O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZElkeCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZCA9IHRoaXMucmVzdWx0c1t0aGlzLnNlbGVjdGVkSWR4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSWR4ID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1NlbGVjdGVkKCRpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZElkeCA9PT0gJGluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGFzU2VsZWN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZElkeCA+IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VhcmNoKHRleHQpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVyID0gdGhpcy4kcS5kZWZlcjxhbnk+KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbFNlYXJjaCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRleHQgPT0gbnVsbCB8fCB0ZXh0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpY2tldCA9IHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLm9uU2VhcmNoKHsgdGV4dDogdGV4dCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXByb21pc2UudGhlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IHByb21pc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0cyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0cztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRoaXMucmVzdWx0cy5sZW5ndGggPiAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0sIHRoaXMuc2VhcmNoRGVsYXkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFR5cGVhaGVhZERpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRjb21waWxlJywgJyR0ZW1wbGF0ZUNhY2hlJywgJyRwYXJzZScsICckdGltZW91dCcsICdpc01vYmlsZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcHJpdmF0ZSAkY29tcGlsZTogYW5ndWxhci5JQ29tcGlsZVNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgJHRlbXBsYXRlQ2FjaGU6IGFuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlICRwYXJzZTogYW5ndWxhci5JUGFyc2VTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbmd1bGFyLklUaW1lb3V0U2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSBpc01vYmlsZTogYm9vbGVhblxyXG4gICAgICAgICkgeyB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ3R5cGVhaGVhZCcsICduZ01vZGVsJ107XHJcbiAgICAgICAgY29udHJvbGxlciA9IFR5cGVhaGVhZENvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3R5cGVhaGVhZFZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdHlwZWFoZWFkOiAnPScsXHJcbiAgICAgICAgICAgIHR5cGVhaGVhZFRlbXBsYXRlOiAnQCcsXHJcbiAgICAgICAgICAgIHR5cGVhaGVhZFRleHQ6ICdAJyxcclxuICAgICAgICAgICAgb25TZWFyY2g6ICcmJyxcclxuICAgICAgICAgICAgb25TZWxlY3Q6ICcmJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCBjdHJsczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgdmFyICRjdHJsOiBUeXBlYWhlYWRDb250cm9sbGVyID0gY3RybHNbMF0sXHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyID0gY3RybHNbMV0sXHJcbiAgICAgICAgICAgICAgICAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgZ2V0VGV4dEZyb21Nb2RlbCA9IHRoaXMuJHBhcnNlKCRhdHRyc1sndHlwZWFoZWFkVGV4dCddKSxcclxuICAgICAgICAgICAgICAgIGdldENvbnRlbnQ6ICgpID0+IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50LmF0dHIoXCJhdXRvY29tcGxldGVcIiwgXCJvZmZcIik7XHJcblxyXG4gICAgICAgICAgICAkYm9keS5vbihcImtleXVwLnR5cGVhaGVhZFwiLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0VzY2FwZShlKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwudXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZ2V0VGV4dEZyb21Nb2RlbCgkY3RybC50eXBlYWhlYWQpIHx8ICRjdHJsLnR5cGVhaGVhZDtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRWYWxpZGl0eSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2tleWRvd24udHlwZWFoZWFkIGNoYW5nZS50eXBlYWhlYWQnLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghJGN0cmwuaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRXNjYXBlKGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzS2V5VXAoZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3RQcmV2KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzS2V5RG93bihlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdE5leHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLmlzRW50ZXIoZSkgfHwgdGhpcy5pc1RhYihlKSkgJiYgJGN0cmwuaGFzU2VsZWN0aW9uKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2tleXVwLnR5cGVhaGVhZCcsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb250cm9sS2V5KGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3RlZElkeCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwudHlwZWFoZWFkID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWFyY2goJG5nTW9kZWxDdHJsLiRtb2RlbFZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygndHlwZWFoZWFkLXBsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gZ2V0Q29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQpIGNvbnRlbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAkYm9keS5vZmYoXCJrZXl1cC50eXBlYWhlYWQgY2xpY2sudHlwZWFoZWFkXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFZhbGlkaXR5KGlzVmFsaWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kc2V0VmFsaWRpdHkoJ3R5cGVhaGVhZCcsIGlzVmFsaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkY3RybC5yZXNldFZhbGlkaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0VmFsaWRpdHkodHJ1ZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoJGN0cmwudHlwZWFoZWFkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAkY3RybC51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRDb250ZW50ID0gdGhpcy5saW5rTW9iaWxlKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwsICRuZ01vZGVsQ3RybCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldENvbnRlbnQgPSB0aGlzLmxpbmtEZXNrdG9wKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwsICRuZ01vZGVsQ3RybCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlua01vYmlsZSA9ICgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsICRjdHJsOiBUeXBlYWhlYWRDb250cm9sbGVyLCAkbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgJGNvbnRlbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSxcclxuICAgICAgICAgICAgICAgICRwbGFjZWhvbGRlcjogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3R5cGVhaGVhZC1tb2JpbGUgdHlwZWFoZWFkLW1vYmlsZS0taW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFZhbGlkaXR5KGlzVmFsaWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kc2V0VmFsaWRpdHkoJ3R5cGVhaGVhZCcsIGlzVmFsaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5zdXJlUGxhY2Vob2xkZXJFeGlzdHMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHBsYWNlaG9sZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkcGxhY2Vob2xkZXIgPSBhbmd1bGFyLmVsZW1lbnQoXCI8ZGl2IGNsYXNzPSd0eXBlYWhlYWQtcGxhY2Vob2xkZXInPjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtb3ZlRWxlbWVudFRvQm9keSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0JvZHlFbGVtZW50KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGVuc3VyZVBsYWNlaG9sZGVyRXhpc3RzKCk7XHJcbiAgICAgICAgICAgICAgICAkcGxhY2Vob2xkZXIuaW5zZXJ0QmVmb3JlKCRlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICRib2R5LmFwcGVuZCgkZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3R5cGVhaGVhZC1tb2JpbGUtLWZvY3VzZWQnKTtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZW5zdXJlQ29udGVudEV4aXN0cygpO1xyXG4gICAgICAgICAgICAgICAgJGNvbnRlbnQuYWRkQ2xhc3MoJ3R5cGVhaGVhZC1tb2JpbGUtLWZvY3VzZWQnKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWFyY2goJG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG1vdmVFbGVtZW50QmFjayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNCb2R5RWxlbWVudCgpIHx8ICRwbGFjZWhvbGRlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygndHlwZWFoZWFkLW1vYmlsZS0tZm9jdXNlZCcpO1xyXG4gICAgICAgICAgICAgICAgJGNvbnRlbnQucmVtb3ZlQ2xhc3MoJ3R5cGVhaGVhZC1tb2JpbGUtLWZvY3VzZWQnKTtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lmluc2VydEJlZm9yZSgkcGxhY2Vob2xkZXIpO1xyXG4gICAgICAgICAgICAgICAgJHBsYWNlaG9sZGVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5zdXJlQ29udGVudEV4aXN0cyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgkY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJGNvbnRlbnQgPSB0aGlzLmNyZWF0ZUNvbnRlbnRGcm9tQXR0cigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpO1xyXG4gICAgICAgICAgICAgICAgJGNvbnRlbnQub24oJ2NsaWNrLnR5cGVhaGVhZCcsICgkZXZlbnQ6IGFuZ3VsYXIuSUFuZ3VsYXJFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVFbGVtZW50QmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICRjb250ZW50LmFkZENsYXNzKCd0eXBlYWhlYWQtbW9iaWxlIHR5cGVhaGVhZC1tb2JpbGUtLWRyb3Bkb3duJyk7XHJcbiAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmQoJGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGluaXRFbGVtZW50ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbW92ZUVsZW1lbnRUb0JvZHkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGlzQm9keUVsZW1lbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQucGFyZW50KCkuaXMoJGJvZHkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbignZm9jdXMudHlwZWFoZWFkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gJG5nTW9kZWxDdHJsLiRtb2RlbFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgIXZhbHVlLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICBzZXRWYWxpZGl0eSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCRhdHRyc1sndHlwZWFoZWFkU2VsZWN0aW9uUmVxdWlyZWQnXSAhPSBudWxsICYmICRjdHJsLnR5cGVhaGVhZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHNldFZhbGlkaXR5KGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtb3ZlRWxlbWVudFRvQm9keSgpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwucmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gJGNvbnRlbnQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlua0Rlc2t0b3AgPSAoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCAkY3RybDogVHlwZWFoZWFkQ29udHJvbGxlciwgJG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgJGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdmb2N1cy50eXBlYWhlYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IHRoaXMuY3JlYXRlQ29udGVudEZyb21BdHRyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycyk7XHJcbiAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmQoY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRldGhlciA9IG5ldyBUZXRoZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogJGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QXR0YWNobWVudDogJ2JvdHRvbSBsZWZ0JyxcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b3AgbGVmdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NQcmVmaXg6ICd0eXBlYWhlYWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldE9mZnNldDogJzZweCAwJyxcclxuICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50czogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG86ICd3aW5kb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50OiAndG9nZXRoZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaW46IFsndG9wJywgJ2xlZnQnLCAnYm90dG9tJywgJ3JpZ2h0J11cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGV0aGVyLnBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0VmFsaWRpdHkoaXNWYWxpZDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWYWxpZGl0eSgndHlwZWFoZWFkJywgaXNWYWxpZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBibHVyVGltZXI7XHJcblxyXG4gICAgICAgICAgICAkYm9keS5vbihcImNsaWNrLnR5cGVhaGVhZFwiLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudC5pcyhlLnRhcmdldCkgfHwgIWNvbnRlbnQgfHwgY29udGVudC5pcyhlLnRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0LmNhbmNlbChibHVyVGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbignYmx1ci50eXBlYWhlYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBBbGxvdyBhbnkgY2xpY2sgb24gdGhlIG1lbnUgdG8gY29tZSB0aHJvdWdoIGZpcnN0XHJcbiAgICAgICAgICAgICAgICBibHVyVGltZXIgPSB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSAkbmdNb2RlbEN0cmwuJG1vZGVsVmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8ICF2YWx1ZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbGlkaXR5KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCRhdHRyc1sndHlwZWFoZWFkU2VsZWN0aW9uUmVxdWlyZWQnXSAhPSBudWxsICYmICRjdHJsLnR5cGVhaGVhZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWxpZGl0eShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLnJlc3VsdHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiBjb250ZW50O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0VzY2FwZShlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSAyNztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzRW50ZXIoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS53aGljaCA9PT0gOTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzVGFiKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUud2hpY2ggPT09IDEzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNLZXlVcChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSAzODtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzS2V5RG93bihlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSA0MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzQ29udHJvbEtleShlKSB7XHJcbiAgICAgICAgICAgIHZhciBrID0gZS53aGljaDtcclxuICAgICAgICAgICAgcmV0dXJuIGsgPT09IDkgfHwgayA9PT0gMTMgfHwgKGsgPj0gMTYgJiYgayA8PSAyMCkgfHwgayA9PT0gMjcgfHwgKGsgPj0gMzMgJiYgayA8PSA0MCkgfHwgayA9PT0gNDUgfHwgKGsgPj0gOTEgJiYgayA8PSA5Myk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVDb250ZW50RnJvbUF0dHIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtVGV4dCA9ICRhdHRyc1sndHlwZWFoZWFkVGV4dCddID09IG51bGwgPyBcIml0ZW1cIiA6IGBpdGVtLiR7JGF0dHJzWyd0eXBlYWhlYWRUZXh0J119YCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmNyZWF0ZUNvbnRlbnQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzWyd0eXBlYWhlYWRUZW1wbGF0ZSddLCBpdGVtVGV4dCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ29udGVudChzY29wZSwgZWxlbWVudCwgdGVtcGxhdGVVcmwsIHRleHQpIHtcclxuICAgICAgICAgICAgdmFyIGh0bWwgPSB0ZW1wbGF0ZVVybCA/IHRoaXMuJHRlbXBsYXRlQ2FjaGUuZ2V0KHRlbXBsYXRlVXJsKSA6IGA8YSBocmVmPVwiI1wiIGNsYXNzPVwidHlwZWFoZWFkLWxpbmtcIj57eyR7dGV4dH19fTwvYT5gLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgPSBgPGRpdiBjbGFzcz1cInR5cGVhaGVhZFwiIG5nLWNsYXNzPVwieyd0eXBlYWhlYWQtLWhpZGRlbic6IXR5cGVhaGVhZFZtLmlzVmlzaWJsZX1cIj48dWwgY2xhc3M9XCJ0eXBlYWhlYWQtbWVudVwiPjxsaSBjbGFzcz1cInR5cGVhaGVhZC1pdGVtXCIgbmctcmVwZWF0PVwiaXRlbSBpbiB0eXBlYWhlYWRWbS5yZXN1bHRzXCIgbmctY2xhc3M9XCJ7J3R5cGVhaGVhZC1pdGVtLS1zZWxlY3RlZCc6IHR5cGVhaGVhZFZtLmlzU2VsZWN0ZWQoJGluZGV4KX1cIiBuZy1jbGljaz1cInR5cGVhaGVhZFZtLnNlbGVjdCgkaW5kZXgpXCI+JHtodG1sfTwvbGk+PC91bD48L2Rpdj5gLFxyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbXBpbGUoY29udGVudCkoc2NvcGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ1R5cGVhaGVhZFwiKS5kaXJlY3RpdmUoJ3R5cGVhaGVhZCcsIFR5cGVhaGVhZERpcmVjdGl2ZSk7XHJcbn0iXX0=