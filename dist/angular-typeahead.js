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
                    $content.on('click.typeahead', function (e) {
                        moveElementBack();
                        $ctrl.isVisible = false;
                        $scope.$apply();
                        console.log('click.typeahead', e.target, $ctrl.isVisible);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10eXBlYWhlYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL21vYmlsZS50cyIsIi4uL3NyYy90eXBlYWhlYWQudHMiXSwibmFtZXMiOlsiQW5ndWxhclR5cGVhaGVhZE1vZHVsZSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuTW9iaWxlQ29uZmlnIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5Nb2JpbGVDb25maWcuY29uc3RydWN0b3IiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLk1vYmlsZUNvbmZpZy5pc01vYmlsZSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlciIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlci50eXBlYWhlYWQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZENvbnRyb2xsZXIuaXNWaXNpYmxlIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLmNhbmNlbFNlYXJjaCIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlci5zZWxlY3RQcmV2IiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLnNlbGVjdE5leHQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZENvbnRyb2xsZXIuc2VsZWN0IiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLmlzU2VsZWN0ZWQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZENvbnRyb2xsZXIuaGFzU2VsZWN0aW9uIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLnNlYXJjaCIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkRGlyZWN0aXZlIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuY29uc3RydWN0b3IiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5jb25zdHJ1Y3Rvci5zZXRWYWxpZGl0eSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkRGlyZWN0aXZlLnByZXZlbnREZWZhdWx0IiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuaXNFc2NhcGUiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5pc0VudGVyIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuaXNUYWIiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5pc0tleVVwIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuaXNLZXlEb3duIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuaXNDb250cm9sS2V5IiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuY3JlYXRlQ29udGVudEZyb21BdHRyIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuY3JlYXRlQ29udGVudCJdLCJtYXBwaW5ncyI6IkFBQUEsMkNBQTJDO0FBQzNDLHlHQUF5RztBQUd6RyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQ0psQyxJQUFPLHNCQUFzQixDQWU1QjtBQWZELFdBQU8sc0JBQXNCLEVBQUMsQ0FBQztJQUUzQkE7UUFBQUM7UUFVQUMsQ0FBQ0E7UUFUVUQscUJBQVFBLEdBQWZBO1lBQ0lFLElBQUlBLEtBQUtBLEdBQUdBLFNBQVNBLENBQUNBLFNBQVNBLElBQUlBLFNB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TUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7b0JBRWhCQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDbkJBLEtBQUtBLENBQUNBLFNBQVNBLEdBQUdBLEtBQUtBLENBQUNBO3dCQUN4QkEsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7d0JBQ2hCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDbENBLENBQUNBO29CQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDbEJBLEtBQUtBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBO3dCQUNuQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7d0JBQ2hCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDbENBLENBQUNBO29CQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDcEJBLEtBQUtBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBO3dCQUNuQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7d0JBQ2hCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDbENBLENBQUNBO29CQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDN0RBLEtBQUtBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO3dCQUNmQSxLQUFLQSxDQUFDQSxTQUFTQSxHQUFHQSxLQUFLQSxDQUFDQTt3QkFDeEJBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO3dCQUNoQkEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xDQSxDQUFDQTtvQkFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2hCQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFSEEsUUFBUUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxVQUFBQSxDQUFDQTtvQkFDNUJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUNyQkEsTUFBTUEsQ0FBQ0E7b0JBRVhBLEtBQUtBLENBQUNBLFdBQVdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUN2QkEsS0FBS0EsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7b0JBRXZCQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtnQkFDM0NBLENBQUNBLENBQUNBLENBQUNBO2dCQUVIQSxRQUFRQSxDQUFDQSxRQUFRQSxDQUFDQSx1QkFBdUJBLENBQUNBLENBQUNBO2dCQUUzQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsRUFBRUE7b0JBQ25CQSxJQUFJQSxPQUFPQSxHQUFHQSxVQUFVQSxFQUFFQSxDQUFDQTtvQkFDM0JBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBO3dCQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtvQkFDOUJBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLGlDQUFpQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pEQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFSEEscUJBQXFCQSxPQUFnQkE7b0JBQ2pDQyxZQUFZQSxDQUFDQSxZQUFZQSxDQUFDQSxXQUFXQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtnQkFDcERBLENBQUNBO2dCQUVERCxLQUFLQSxDQUFDQSxhQUFhQSxHQUFHQTtvQkFDbEJBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUN0QkEsQ0FBQ0EsQ0FBQ0E7Z0JBRUZBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLFNBQVNBLElBQUlBLElBQUlBLENBQUNBO29CQUN4QkEsS0FBS0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBRW5CQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDaEJBLFVBQVVBLEdBQUdBLEtBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLE1BQU1BLEVBQUVBLEtBQUtBLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBO29CQUM1RUEsTUFBTUEsQ0FBQ0E7Z0JBQ1hBLENBQUNBO2dCQUVEQSxVQUFVQSxHQUFHQSxLQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxFQUFFQSxRQUFRQSxFQUFFQSxNQUFNQSxFQUFFQSxLQUFLQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQTtZQUNqRkEsQ0FBQ0EsQ0FBQ0E7WUFFRkEsZUFBVUEsR0FBR0EsVUFBQ0EsTUFBc0JBLEVBQUVBLFFBQWtDQSxFQUFFQSxNQUEyQkEsRUFBRUEsS0FBMEJBLEVBQUVBLFlBQXdDQTtnQkFDdktBLElBQUlBLEtBQUtBLEdBQUdBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLEVBQy9CQSxRQUFrQ0EsRUFDbENBLFlBQXNDQSxDQUFDQTtnQkFFM0NBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBLDBDQUEwQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRTlEQSxxQkFBcUJBLE9BQWdCQTtvQkFDakNDLFlBQVlBLENBQUNBLFlBQVlBLENBQUNBLFdBQVdBLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBO2dCQUNwREEsQ0FBQ0E7Z0JBRURELElBQUlBLHVCQUF1QkEsR0FBR0E7b0JBQzFCQSxFQUFFQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFDQTt3QkFDYkEsTUFBTUEsQ0FBQ0E7b0JBRVhBLFlBQVlBLEdBQUdBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLDJDQUEyQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hGQSxDQUFDQSxDQUFDQTtnQkFFRkEsSUFBSUEsaUJBQWlCQSxHQUFHQTtvQkFDcEJBLEVBQUVBLENBQUNBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBO3dCQUNoQkEsTUFBTUEsQ0FBQ0E7b0JBRVhBLHVCQUF1QkEsRUFBRUEsQ0FBQ0E7b0JBQzFCQSxZQUFZQSxDQUFDQSxZQUFZQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtvQkFDcENBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO29CQUV2QkEsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsMkJBQTJCQSxDQUFDQSxDQUFDQTtvQkFDL0NBLFFBQVFBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO29CQUVqQkEsbUJBQW1CQSxFQUFFQSxDQUFDQTtvQkFDdEJBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBLDJCQUEyQkEsQ0FBQ0EsQ0FBQ0E7b0JBQy9DQSxLQUFLQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQTtvQkFDdkJBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO2dCQUMxQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRUZBLElBQUlBLGVBQWVBLEdBQUdBO29CQUNsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsYUFBYUEsRUFBRUEsSUFBSUEsWUFBWUEsSUFBSUEsSUFBSUEsQ0FBQ0E7d0JBQ3pDQSxNQUFNQSxDQUFDQTtvQkFFWEEsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsMkJBQTJCQSxDQUFDQSxDQUFDQTtvQkFDbERBLFFBQVFBLENBQUNBLFdBQVdBLENBQUNBLDJCQUEyQkEsQ0FBQ0EsQ0FBQ0E7b0JBQ2xEQSxRQUFRQSxDQUFDQSxZQUFZQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtvQkFDcENBLFlBQVlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO29CQUN0QkEsS0FBS0EsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQzVCQSxDQUFDQSxDQUFDQTtnQkFFRkEsSUFBSUEsbUJBQW1CQSxHQUFHQTtvQkFDdEJBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBO3dCQUNUQSxNQUFNQSxDQUFDQTtvQkFFWEEsUUFBUUEsR0FBR0EsS0FBSUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxNQUFNQSxFQUFFQSxRQUFRQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtvQkFDaEVBLFFBQVFBLENBQUNBLEVBQUVBLENBQUNBLGlCQUFpQkEsRUFBRUEsVUFBQ0EsQ0FBQ0E7d0JBQzdCQSxlQUFlQSxFQUFFQSxDQUFDQTt3QkFDbEJBLEtBQUtBLENBQUNBLFNBQVNBLEdBQUdBLEtBQUtBLENBQUNBO3dCQUN4QkEsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7d0JBQ2hCQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxpQkFBaUJBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLEVBQUVBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO29CQUM5REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ0hBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBLDZDQUE2Q0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2pFQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtnQkFDM0JBLENBQUNBLENBQUNBO2dCQUVGQSxJQUFJQSxXQUFXQSxHQUFHQTtvQkFDZEEsaUJBQWlCQSxFQUFFQSxDQUFDQTtnQkFDeEJBLENBQUNBLENBQUFBO2dCQUVEQSxJQUFJQSxhQUFhQSxHQUFHQTtvQkFDaEJBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUN2Q0EsQ0FBQ0EsQ0FBQUE7Z0JBRURBLFFBQVFBLENBQUNBLEVBQUVBLENBQUNBLGlCQUFpQkEsRUFBRUE7b0JBQzNCQSxJQUFJQSxLQUFLQSxHQUFHQSxZQUFZQSxDQUFDQSxXQUFXQSxDQUFDQTtvQkFDckNBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBO3dCQUMvQkEsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ3RCQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSw0QkFBNEJBLENBQUNBLElBQUlBLElBQUlBLElBQUlBLEtBQUtBLENBQUNBLFNBQVNBLElBQUlBLElBQUlBLENBQUNBO3dCQUM3RUEsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7b0JBRXZCQSxpQkFBaUJBLEVBQUVBLENBQUNBO29CQUNwQkEsS0FBS0EsQ0FBQ0EsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQ25CQSxLQUFLQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQTtvQkFDdkJBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRUhBLE1BQU1BLENBQUNBLGNBQU1BLE9BQUFBLFFBQVFBLEVBQVJBLENBQVFBLENBQUNBO1lBQzFCQSxDQUFDQSxDQUFDQTtZQUVGQSxnQkFBV0EsR0FBR0EsVUFBQ0EsTUFBc0JBLEVBQUVBLFFBQWtDQSxFQUFFQSxNQUEyQkEsRUFBRUEsS0FBMEJBLEVBQUVBLFlBQXdDQTtnQkFDeEtBLElBQUlBLEtBQUtBLEdBQUdBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLEVBQy9CQSxPQUFpQ0EsQ0FBQ0E7Z0JBRXRDQSxRQUFRQSxDQUFDQSxFQUFFQSxDQUFDQSxpQkFBaUJBLEVBQUVBO29CQUMzQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7d0JBQ1JBLE1BQU1BLENBQUNBO29CQUVYQSxPQUFPQSxHQUFHQSxLQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO29CQUMvREEsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7b0JBRXRCQSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxNQUFNQSxDQUFDQTt3QkFDcEJBLE1BQU1BLEVBQUVBLFFBQVFBO3dCQUNoQkEsZ0JBQWdCQSxFQUFFQSxhQUFhQTt3QkFDL0JBLE9BQU9BLEVBQUVBLE9BQU9BO3dCQUNoQkEsVUFBVUEsRUFBRUEsVUFBVUE7d0JBQ3RCQSxXQUFXQSxFQUFFQSxXQUFXQTt3QkFDeEJBLFlBQVlBLEVBQUVBLE9BQU9BO3dCQUNyQkEsV0FBV0EsRUFBRUEsQ0FBQ0E7Z0NBQ1ZBLEVBQUVBLEVBQUVBLFFBQVFBO2dDQUNaQSxVQUFVQSxFQUFFQSxVQUFVQTtnQ0FDdEJBLEdBQUdBLEVBQUVBLENBQUNBLEtBQUtBLEVBQUVBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLE9BQU9BLENBQUNBOzZCQUMxQ0EsQ0FBQ0E7cUJBQ0xBLENBQUNBLENBQUNBO29CQUVIQSxNQUFNQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtvQkFDbEJBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRUhBLHFCQUFxQkEsT0FBZ0JBO29CQUNqQ0MsWUFBWUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsV0FBV0EsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BEQSxDQUFDQTtnQkFFREQsSUFBSUEsU0FBU0EsQ0FBQ0E7Z0JBRWRBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLGlCQUFpQkEsRUFBRUEsVUFBQUEsQ0FBQ0E7b0JBQ3pCQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxJQUFJQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDNURBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO3dCQUNoQ0EsTUFBTUEsQ0FBQ0E7b0JBQ1hBLENBQUNBO29CQUVEQSxLQUFLQSxDQUFDQSxTQUFTQSxHQUFHQSxLQUFLQSxDQUFDQTtvQkFDeEJBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRUhBLFFBQVFBLENBQUNBLEVBQUVBLENBQUNBLGdCQUFnQkEsRUFBRUE7b0JBQzFCQSxvREFBb0RBO29CQUNwREEsU0FBU0EsR0FBR0EsS0FBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7d0JBQ3RCQSxJQUFJQSxLQUFLQSxHQUFHQSxZQUFZQSxDQUFDQSxXQUFXQSxDQUFDQTt3QkFFckNBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBOzRCQUMvQkEsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3RCQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSw0QkFBNEJBLENBQUNBLElBQUlBLElBQUlBLElBQUlBLEtBQUtBLENBQUNBLFNBQVNBLElBQUlBLElBQUlBLENBQUNBOzRCQUM3RUEsV0FBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7d0JBRXZCQSxLQUFLQSxDQUFDQSxTQUFTQSxHQUFHQSxLQUFLQSxDQUFDQTt3QkFDeEJBLEtBQUtBLENBQUNBLE9BQU9BLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNuQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7b0JBQ3BCQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDWkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRUhBLE1BQU1BLENBQUNBLGNBQU1BLE9BQUFBLE9BQU9BLEVBQVBBLENBQU9BLENBQUNBO1lBQ3pCQSxDQUFDQSxDQUFDQTtRQWpRRUEsQ0FBQ0E7UUFtUUxELDJDQUFjQSxHQUFkQSxVQUFlQSxDQUFDQTtZQUNaRyxDQUFDQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtZQUNuQkEsQ0FBQ0EsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7WUFDcEJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1FBQ2pCQSxDQUFDQTtRQUVESCxxQ0FBUUEsR0FBUkEsVUFBU0EsQ0FBQ0E7WUFDTkksTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsS0FBS0EsRUFBRUEsQ0FBQ0E7UUFDMUJBLENBQUNBO1FBRURKLG9DQUFPQSxHQUFQQSxVQUFRQSxDQUFDQTtZQUNMSyxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7UUFFREwsa0NBQUtBLEdBQUxBLFVBQU1BLENBQUNBO1lBQ0hNLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEtBQUtBLEVBQUVBLENBQUNBO1FBQzFCQSxDQUFDQTtRQUVETixvQ0FBT0EsR0FBUEEsVUFBUUEsQ0FBQ0E7WUFDTE8sTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsS0FBS0EsRUFBRUEsQ0FBQ0E7UUFDMUJBLENBQUNBO1FBRURQLHNDQUFTQSxHQUFUQSxVQUFVQSxDQUFDQTtZQUNQUSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxFQUFFQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7UUFFRFIseUNBQVlBLEdBQVpBLFVBQWFBLENBQUNBO1lBQ1ZTLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBO1lBQ2hCQSxNQUFNQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUMvSEEsQ0FBQ0E7UUFFRFQsa0RBQXFCQSxHQUFyQkEsVUFBc0JBLE1BQU1BLEVBQUVBLFFBQVFBLEVBQUVBLE1BQU1BO1lBQzFDVSxJQUFJQSxRQUFRQSxHQUFHQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxJQUFJQSxHQUFHQSxNQUFNQSxHQUFHQSxVQUFRQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFHQSxFQUN2RkEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsRUFBRUEsUUFBUUEsRUFBRUEsTUFBTUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUMxRkEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDbkJBLENBQUNBO1FBRURWLDBDQUFhQSxHQUFiQSxVQUFjQSxLQUFLQSxFQUFFQSxPQUFPQSxFQUFFQSxXQUFXQSxFQUFFQSxJQUFJQTtZQUMzQ1csSUFBSUEsSUFBSUEsR0FBR0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsOENBQXdDQSxJQUFJQSxXQUFRQSxFQUNoSEEsUUFBUUEsR0FBR0EsOFNBQThSQSxJQUFJQSxxQkFBa0JBLEVBQy9UQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUN4Q0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBO1FBQ25CQSxDQUFDQTtRQXRUTVgsMEJBQU9BLEdBQUdBLENBQUNBLFVBQVVBLEVBQUVBLGdCQUFnQkEsRUFBRUEsUUFBUUEsRUFBRUEsVUFBVUEsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUF1VHRGQSx5QkFBQ0E7SUFBREEsQ0FBQ0EsQUF4VERmLElBd1RDQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxXQUFXQSxFQUFFQSxrQkFBa0JBLENBQUNBLENBQUNBO0FBQzdFQSxDQUFDQSxFQS9hTSxzQkFBc0IsS0FBdEIsc0JBQXNCLFFBK2E1QiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL3RzZC5kLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYm93ZXJfY29tcG9uZW50cy9hbmd1bGFyLXR5cGVzY3JpcHQtbW9kdWxlL2Rpc3QvYW5ndWxhci10eXBlc2NyaXB0LW1vZHVsZS5kLnRzXCIvPlxyXG5kZWNsYXJlIHZhciBUZXRoZXI6IGFueTtcclxuXHJcbkFuZ3VsYXIubW9kdWxlKFwibmdUeXBlYWhlYWRcIiwgW10pOyIsIm1vZHVsZSBBbmd1bGFyVHlwZWFoZWFkTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBNb2JpbGVDb25maWcge1xyXG4gICAgICAgIHN0YXRpYyBpc01vYmlsZSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvd1tcIm9wZXJhXCJdO1xyXG4gICAgICAgICAgICB2YXIgdGVzdDEgPSAvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2kudGVzdChhZ2VudCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWdlbnRQcmVmaXggPSBhZ2VudC5zdWJzdHIoMCwgNCk7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0MiA9IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYWdlbnRQcmVmaXgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRlc3QxIHx8IHRlc3QyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nVHlwZWFoZWFkXCIpLmNvbnN0YW50KCdpc01vYmlsZScsIE1vYmlsZUNvbmZpZy5pc01vYmlsZSgpKTtcclxufSIsIm1vZHVsZSBBbmd1bGFyVHlwZWFoZWFkTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBUeXBlYWhlYWRDb250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJHRpbWVvdXQnLCAnJHEnLCAnaXNNb2JpbGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkdGltZW91dCwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZElkeCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLl9pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hEZWxheSA9IDE1MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uU2VhcmNoO1xyXG4gICAgICAgIHRpY2tldDtcclxuICAgICAgICBzZWFyY2hEZWxheTogbnVtYmVyO1xyXG4gICAgICAgIHJlc3VsdHM7XHJcbiAgICAgICAgc2VsZWN0ZWRJZHg6IG51bWJlcjtcclxuICAgICAgICBfdHlwZWFoZWFkOiBhbnk7XHJcbiAgICAgICAgdHlwZWFoZWFkVGV4dDtcclxuICAgICAgICBuZ01vZGVsO1xyXG4gICAgICAgIHVwZGF0ZTtcclxuICAgICAgICByZXNldFZhbGlkaXR5O1xyXG4gICAgICAgIG9uU2VsZWN0OiBhbnk7XHJcblxyXG4gICAgICAgIHNldCB0eXBlYWhlYWQodmFsdWU6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLl90eXBlYWhlYWQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVzZXRWYWxpZGl0eSlcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRWYWxpZGl0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHR5cGVhaGVhZCgpOiBhbnkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHlwZWFoZWFkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfaXNWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBnZXQgaXNWaXNpYmxlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNWaXNpYmxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGlzVmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1Zpc2libGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbFNlYXJjaCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FuY2VsU2VhcmNoKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50aWNrZXQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQuY2FuY2VsKHRoaXMudGlja2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFByZXYoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSWR4ID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJZHgtLTtcclxuICAgICAgICAgICAgZWxzZSB0aGlzLnNlbGVjdGVkSWR4ID0gdGhpcy5yZXN1bHRzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3ROZXh0KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZElkeCA8IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZElkeCsrO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMuc2VsZWN0ZWRJZHggPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0KCRpbmRleD8pIHtcclxuICAgICAgICAgICAgaWYgKCRpbmRleCAhPSBudWxsKSAvLyBzaW5nbGUgZXF1YWxpdHkgKD0pIHRvIHNuYWcgdW5kZWZpbmVkIGFsc29cclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAkaW5kZXg7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSWR4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkID0gdGhpcy5yZXN1bHRzW3RoaXMuc2VsZWN0ZWRJZHhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAtMTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzU2VsZWN0ZWQoJGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSWR4ID09PSAkaW5kZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoYXNTZWxlY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSWR4ID4gLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWFyY2godGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXIgPSB0aGlzLiRxLmRlZmVyPGFueT4oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsU2VhcmNoKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGV4dCA9PSBudWxsIHx8IHRleHQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudGlja2V0ID0gdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMub25TZWFyY2goeyB0ZXh0OiB0ZXh0IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghcHJvbWlzZS50aGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gcHJvbWlzZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihyZXN1bHRzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdGhpcy5yZXN1bHRzLmxlbmd0aCA+IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSwgdGhpcy5zZWFyY2hEZWxheSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVHlwZWFoZWFkRGlyZWN0aXZlIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJGNvbXBpbGUnLCAnJHRlbXBsYXRlQ2FjaGUnLCAnJHBhcnNlJywgJyR0aW1lb3V0JywgJ2lzTW9iaWxlJ107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBwcml2YXRlICRjb21waWxlOiBhbmd1bGFyLklDb21waWxlU2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkdGVtcGxhdGVDYWNoZTogYW5ndWxhci5JVGVtcGxhdGVDYWNoZVNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgJHBhcnNlOiBhbmd1bGFyLklQYXJzZVNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFuZ3VsYXIuSVRpbWVvdXRTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlIGlzTW9iaWxlOiBib29sZWFuXHJcbiAgICAgICAgKSB7IH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICAgICAgcmVxdWlyZSA9IFsndHlwZWFoZWFkJywgJ25nTW9kZWwnXTtcclxuICAgICAgICBjb250cm9sbGVyID0gVHlwZWFoZWFkQ29udHJvbGxlcjtcclxuICAgICAgICBjb250cm9sbGVyQXMgPSAndHlwZWFoZWFkVm0nO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB0eXBlYWhlYWQ6ICc9JyxcclxuICAgICAgICAgICAgdHlwZWFoZWFkVGVtcGxhdGU6ICdAJyxcclxuICAgICAgICAgICAgdHlwZWFoZWFkVGV4dDogJ0AnLFxyXG4gICAgICAgICAgICBvblNlYXJjaDogJyYnLFxyXG4gICAgICAgICAgICBvblNlbGVjdDogJyYnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGluayA9ICgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsIGN0cmxzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgJGN0cmw6IFR5cGVhaGVhZENvbnRyb2xsZXIgPSBjdHJsc1swXSxcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIgPSBjdHJsc1sxXSxcclxuICAgICAgICAgICAgICAgICRib2R5ID0gYW5ndWxhci5lbGVtZW50KCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICBnZXRUZXh0RnJvbU1vZGVsID0gdGhpcy4kcGFyc2UoJGF0dHJzWyd0eXBlYWhlYWRUZXh0J10pLFxyXG4gICAgICAgICAgICAgICAgZ2V0Q29udGVudDogKCkgPT4gYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQuYXR0cihcImF1dG9jb21wbGV0ZVwiLCBcIm9mZlwiKTtcclxuXHJcbiAgICAgICAgICAgICRib2R5Lm9uKFwia2V5dXAudHlwZWFoZWFkXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzRXNjYXBlKGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC51cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBnZXRUZXh0RnJvbU1vZGVsKCRjdHJsLnR5cGVhaGVhZCkgfHwgJGN0cmwudHlwZWFoZWFkO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFZhbGlkaXR5KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbigna2V5ZG93bi50eXBlYWhlYWQgY2hhbmdlLnR5cGVhaGVhZCcsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkY3RybC5pc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFc2NhcGUoZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNLZXlVcChlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdFByZXYoKTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNLZXlEb3duKGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0TmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuaXNFbnRlcihlKSB8fCB0aGlzLmlzVGFiKGUpKSAmJiAkY3RybC5oYXNTZWxlY3Rpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbigna2V5dXAudHlwZWFoZWFkJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbnRyb2xLZXkoZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdGVkSWR4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAkY3RybC50eXBlYWhlYWQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICRjdHJsLnNlYXJjaCgkbmdNb2RlbEN0cmwuJG1vZGVsVmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCd0eXBlYWhlYWQtcGxhY2Vob2xkZXInKTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBnZXRDb250ZW50KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudCkgY29udGVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICRib2R5Lm9mZihcImtleXVwLnR5cGVhaGVhZCBjbGljay50eXBlYWhlYWRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0VmFsaWRpdHkoaXNWYWxpZDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWYWxpZGl0eSgndHlwZWFoZWFkJywgaXNWYWxpZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRjdHJsLnJlc2V0VmFsaWRpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXRWYWxpZGl0eSh0cnVlKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkY3RybC50eXBlYWhlYWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICRjdHJsLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgICAgIGdldENvbnRlbnQgPSB0aGlzLmxpbmtNb2JpbGUoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCwgJG5nTW9kZWxDdHJsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0Q29udGVudCA9IHRoaXMubGlua0Rlc2t0b3AoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCwgJG5nTW9kZWxDdHJsKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rTW9iaWxlID0gKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgJGN0cmw6IFR5cGVhaGVhZENvbnRyb2xsZXIsICRuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyICRib2R5ID0gYW5ndWxhci5lbGVtZW50KCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICAkY29udGVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LFxyXG4gICAgICAgICAgICAgICAgJHBsYWNlaG9sZGVyOiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygndHlwZWFoZWFkLW1vYmlsZSB0eXBlYWhlYWQtbW9iaWxlLS1pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0VmFsaWRpdHkoaXNWYWxpZDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWYWxpZGl0eSgndHlwZWFoZWFkJywgaXNWYWxpZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBlbnN1cmVQbGFjZWhvbGRlckV4aXN0cyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgkcGxhY2Vob2xkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICRwbGFjZWhvbGRlciA9IGFuZ3VsYXIuZWxlbWVudChcIjxkaXYgY2xhc3M9J3R5cGVhaGVhZC1wbGFjZWhvbGRlcic+PC9kaXY+XCIpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG1vdmVFbGVtZW50VG9Cb2R5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQm9keUVsZW1lbnQoKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgZW5zdXJlUGxhY2Vob2xkZXJFeGlzdHMoKTtcclxuICAgICAgICAgICAgICAgICRwbGFjZWhvbGRlci5pbnNlcnRCZWZvcmUoJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgJGJvZHkuYXBwZW5kKCRlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygndHlwZWFoZWFkLW1vYmlsZS0tZm9jdXNlZCcpO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlbnN1cmVDb250ZW50RXhpc3RzKCk7XHJcbiAgICAgICAgICAgICAgICAkY29udGVudC5hZGRDbGFzcygndHlwZWFoZWFkLW1vYmlsZS0tZm9jdXNlZCcpO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRjdHJsLnNlYXJjaCgkbmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgbW92ZUVsZW1lbnRCYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0JvZHlFbGVtZW50KCkgfHwgJHBsYWNlaG9sZGVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCd0eXBlYWhlYWQtbW9iaWxlLS1mb2N1c2VkJyk7XHJcbiAgICAgICAgICAgICAgICAkY29udGVudC5yZW1vdmVDbGFzcygndHlwZWFoZWFkLW1vYmlsZS0tZm9jdXNlZCcpO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuaW5zZXJ0QmVmb3JlKCRwbGFjZWhvbGRlcik7XHJcbiAgICAgICAgICAgICAgICAkcGxhY2Vob2xkZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlbnN1cmVDb250ZW50RXhpc3RzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkY29udGVudCA9IHRoaXMuY3JlYXRlQ29udGVudEZyb21BdHRyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycyk7XHJcbiAgICAgICAgICAgICAgICAkY29udGVudC5vbignY2xpY2sudHlwZWFoZWFkJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlRWxlbWVudEJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrLnR5cGVhaGVhZCcsIGUudGFyZ2V0LCAkY3RybC5pc1Zpc2libGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkY29udGVudC5hZGRDbGFzcygndHlwZWFoZWFkLW1vYmlsZSB0eXBlYWhlYWQtbW9iaWxlLS1kcm9wZG93bicpO1xyXG4gICAgICAgICAgICAgICAgJGJvZHkuYXBwZW5kKCRjb250ZW50KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBpbml0RWxlbWVudCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG1vdmVFbGVtZW50VG9Cb2R5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBpc0JvZHlFbGVtZW50ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnBhcmVudCgpLmlzKCRib2R5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2ZvY3VzLnR5cGVhaGVhZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRuZ01vZGVsQ3RybC4kbW9kZWxWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8ICF2YWx1ZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VmFsaWRpdHkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICgkYXR0cnNbJ3R5cGVhaGVhZFNlbGVjdGlvblJlcXVpcmVkJ10gIT0gbnVsbCAmJiAkY3RybC50eXBlYWhlYWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBzZXRWYWxpZGl0eShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbW92ZUVsZW1lbnRUb0JvZHkoKTtcclxuICAgICAgICAgICAgICAgICRjdHJsLnJlc3VsdHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICgpID0+ICRjb250ZW50O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmtEZXNrdG9wID0gKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgJGN0cmw6IFR5cGVhaGVhZENvbnRyb2xsZXIsICRuZ01vZGVsQ3RybDogYW5ndWxhci5JTmdNb2RlbENvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyICRib2R5ID0gYW5ndWxhci5lbGVtZW50KCdib2R5JyksXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbignZm9jdXMudHlwZWFoZWFkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmNyZWF0ZUNvbnRlbnRGcm9tQXR0cigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpO1xyXG4gICAgICAgICAgICAgICAgJGJvZHkuYXBwZW5kKGNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0ZXRoZXIgPSBuZXcgVGV0aGVyKHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICRlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEF0dGFjaG1lbnQ6ICdib3R0b20gbGVmdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50OiAndG9wIGxlZnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzUHJlZml4OiAndHlwZWFoZWFkJyxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRPZmZzZXQ6ICc2cHggMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvOiAnd2luZG93JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudDogJ3RvZ2V0aGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGluOiBbJ3RvcCcsICdsZWZ0JywgJ2JvdHRvbScsICdyaWdodCddXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRldGhlci5wb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFZhbGlkaXR5KGlzVmFsaWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kc2V0VmFsaWRpdHkoJ3R5cGVhaGVhZCcsIGlzVmFsaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgYmx1clRpbWVyO1xyXG5cclxuICAgICAgICAgICAgJGJvZHkub24oXCJjbGljay50eXBlYWhlYWRcIiwgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGVsZW1lbnQuaXMoZS50YXJnZXQpIHx8ICFjb250ZW50IHx8IGNvbnRlbnQuaXMoZS50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dC5jYW5jZWwoYmx1clRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2JsdXIudHlwZWFoZWFkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gQWxsb3cgYW55IGNsaWNrIG9uIHRoZSBtZW51IHRvIGNvbWUgdGhyb3VnaCBmaXJzdFxyXG4gICAgICAgICAgICAgICAgYmx1clRpbWVyID0gdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gJG5nTW9kZWxDdHJsLiRtb2RlbFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAhdmFsdWUubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWxpZGl0eSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgkYXR0cnNbJ3R5cGVhaGVhZFNlbGVjdGlvblJlcXVpcmVkJ10gIT0gbnVsbCAmJiAkY3RybC50eXBlYWhlYWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFsaWRpdHkoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5yZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gY29udGVudDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNFc2NhcGUoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS53aGljaCA9PT0gMjc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0VudGVyKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUud2hpY2ggPT09IDk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1RhYihlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSAxMztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzS2V5VXAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS53aGljaCA9PT0gMzg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0tleURvd24oZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS53aGljaCA9PT0gNDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0NvbnRyb2xLZXkoZSkge1xyXG4gICAgICAgICAgICB2YXIgayA9IGUud2hpY2g7XHJcbiAgICAgICAgICAgIHJldHVybiBrID09PSA5IHx8IGsgPT09IDEzIHx8IChrID49IDE2ICYmIGsgPD0gMjApIHx8IGsgPT09IDI3IHx8IChrID49IDMzICYmIGsgPD0gNDApIHx8IGsgPT09IDQ1IHx8IChrID49IDkxICYmIGsgPD0gOTMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ29udGVudEZyb21BdHRyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbVRleHQgPSAkYXR0cnNbJ3R5cGVhaGVhZFRleHQnXSA9PSBudWxsID8gXCJpdGVtXCIgOiBgaXRlbS4keyRhdHRyc1sndHlwZWFoZWFkVGV4dCddfWAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5jcmVhdGVDb250ZW50KCRzY29wZSwgJGVsZW1lbnQsICRhdHRyc1sndHlwZWFoZWFkVGVtcGxhdGUnXSwgaXRlbVRleHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbnRlbnQoc2NvcGUsIGVsZW1lbnQsIHRlbXBsYXRlVXJsLCB0ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBodG1sID0gdGVtcGxhdGVVcmwgPyB0aGlzLiR0ZW1wbGF0ZUNhY2hlLmdldCh0ZW1wbGF0ZVVybCkgOiBgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInR5cGVhaGVhZC1saW5rXCI+e3ske3RleHR9fX08L2E+YCxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gYDxkaXYgY2xhc3M9XCJ0eXBlYWhlYWRcIiBuZy1jbGFzcz1cInsndHlwZWFoZWFkLS1oaWRkZW4nOiF0eXBlYWhlYWRWbS5pc1Zpc2libGV9XCI+PHVsIGNsYXNzPVwidHlwZWFoZWFkLW1lbnVcIj48bGkgY2xhc3M9XCJ0eXBlYWhlYWQtaXRlbVwiIG5nLXJlcGVhdD1cIml0ZW0gaW4gdHlwZWFoZWFkVm0ucmVzdWx0c1wiIG5nLWNsYXNzPVwieyd0eXBlYWhlYWQtaXRlbS0tc2VsZWN0ZWQnOiB0eXBlYWhlYWRWbS5pc1NlbGVjdGVkKCRpbmRleCl9XCIgbmctY2xpY2s9XCJ0eXBlYWhlYWRWbS5zZWxlY3QoJGluZGV4KVwiPiR7aHRtbH08L2xpPjwvdWw+PC9kaXY+YCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLiRjb21waWxlKGNvbnRlbnQpKHNjb3BlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdUeXBlYWhlYWRcIikuZGlyZWN0aXZlKCd0eXBlYWhlYWQnLCBUeXBlYWhlYWREaXJlY3RpdmUpO1xyXG59Il19