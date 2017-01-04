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
                    stopBodyScrolling(true);
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
                    stopBodyScrolling(false);
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
                var bodyPos;
                function stopBodyScrolling(bool) {
                    if (bool === true) {
                        $body.off("touchmove", freezeVp);
                        $body.css("position", bodyPos);
                    }
                    else {
                        $body.on("touchmove", freezeVp);
                        bodyPos = $body.css("position");
                        $body.css("position", "fixed");
                    }
                }
                var freezeVp = function (e) {
                    e.preventDefault();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10eXBlYWhlYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL21vYmlsZS50cyIsIi4uL3NyYy90eXBlYWhlYWQudHMiXSwibmFtZXMiOlsiQW5ndWxhclR5cGVhaGVhZE1vZHVsZSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuTW9iaWxlQ29uZmlnIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5Nb2JpbGVDb25maWcuY29uc3RydWN0b3IiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLk1vYmlsZUNvbmZpZy5pc01vYmlsZSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlciIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlci50eXBlYWhlYWQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZENvbnRyb2xsZXIuaXNWaXNpYmxlIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLmNhbmNlbFNlYXJjaCIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlci5zZWxlY3RQcmV2IiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLnNlbGVjdE5leHQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZENvbnRyb2xsZXIuc2VsZWN0IiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLmlzU2VsZWN0ZWQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZENvbnRyb2xsZXIuaGFzU2VsZWN0aW9uIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLnNlYXJjaCIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkRGlyZWN0aXZlIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuY29uc3RydWN0b3IiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5jb25zdHJ1Y3Rvci5zZXRWYWxpZGl0eSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkRGlyZWN0aXZlLmNvbnN0cnVjdG9yLnN0b3BCb2R5U2Nyb2xsaW5nIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUucHJldmVudERlZmF1bHQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5pc0VzY2FwZSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkRGlyZWN0aXZlLmlzRW50ZXIiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5pc1RhYiIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkRGlyZWN0aXZlLmlzS2V5VXAiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5pc0tleURvd24iLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5pc0NvbnRyb2xLZXkiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5jcmVhdGVDb250ZW50RnJvbUF0dHIiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5jcmVhdGVDb250ZW50Il0sIm1hcHBpbmdzIjoiQUFBQSwyQ0FBMkM7QUFDM0MseUdBQXlHO0FBR3pHLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FDSmxDLElBQU8sc0JBQXNCLENBZTVCO0FBZkQsV0FBTyxzQkFBc0IsRUFBQyxDQUFDO0lBRTNCQTtRQUFBQztRQVVBQyxD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QUFBLENBQUNBO29CQUMvQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0E7d0JBQ2pCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtvQkFFaEJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUNuQkEsS0FBS0EsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7d0JBQ3hCQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTt3QkFDaEJBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNsQ0EsQ0FBQ0E7b0JBRURBLEVBQUVBLENBQUNBLENBQUNBLEtBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUNsQkEsS0FBS0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7d0JBQ25CQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTt3QkFDaEJBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNsQ0EsQ0FBQ0E7b0JBRURBLEVBQUVBLENBQUNBLENBQUNBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUNwQkEsS0FBS0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7d0JBQ25CQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTt3QkFDaEJBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNsQ0EsQ0FBQ0E7b0JBRURBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEtBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLElBQUlBLEtBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNB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LENBQUNBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFdBQVdBLEVBQUVBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7QUFDN0VBLENBQUNBLEVBcGNNLHNCQUFzQixLQUF0QixzQkFBc0IsUUFvYzVCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvdHNkLmQudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ib3dlcl9jb21wb25lbnRzL2FuZ3VsYXItdHlwZXNjcmlwdC1tb2R1bGUvZGlzdC9hbmd1bGFyLXR5cGVzY3JpcHQtbW9kdWxlLmQudHNcIi8+XHJcbmRlY2xhcmUgdmFyIFRldGhlcjogYW55O1xyXG5cclxuQW5ndWxhci5tb2R1bGUoXCJuZ1R5cGVhaGVhZFwiLCBbXSk7IiwibW9kdWxlIEFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIE1vYmlsZUNvbmZpZyB7XHJcbiAgICAgICAgc3RhdGljIGlzTW9iaWxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgYWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93W1wib3BlcmFcIl07XHJcbiAgICAgICAgICAgIHZhciB0ZXN0MSA9IC8oYW5kcm9pZHxiYlxcZCt8bWVlZ28pLittb2JpbGV8YXZhbnRnb3xiYWRhXFwvfGJsYWNrYmVycnl8YmxhemVyfGNvbXBhbHxlbGFpbmV8ZmVubmVjfGhpcHRvcHxpZW1vYmlsZXxpcChob25lfG9kKXxpcmlzfGtpbmRsZXxsZ2UgfG1hZW1vfG1pZHB8bW1wfG1vYmlsZS4rZmlyZWZveHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyBjZXx4ZGF8eGlpbm8vaS50ZXN0KGFnZW50KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhZ2VudFByZWZpeCA9IGFnZW50LnN1YnN0cigwLCA0KTtcclxuICAgICAgICAgICAgdmFyIHRlc3QyID0gLzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhZ2VudFByZWZpeCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGVzdDEgfHwgdGVzdDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdUeXBlYWhlYWRcIikuY29uc3RhbnQoJ2lzTW9iaWxlJywgTW9iaWxlQ29uZmlnLmlzTW9iaWxlKCkpO1xyXG59IiwibW9kdWxlIEFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUge1xyXG5cclxuICAgIGNsYXNzIFR5cGVhaGVhZENvbnRyb2xsZXIge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckdGltZW91dCcsICckcScsICdpc01vYmlsZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICR0aW1lb3V0LCBwcml2YXRlICRxOiBhbmd1bGFyLklRU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSWR4ID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaERlbGF5ID0gMTUwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25TZWFyY2g7XHJcbiAgICAgICAgdGlja2V0O1xyXG4gICAgICAgIHNlYXJjaERlbGF5OiBudW1iZXI7XHJcbiAgICAgICAgcmVzdWx0cztcclxuICAgICAgICBzZWxlY3RlZElkeDogbnVtYmVyO1xyXG4gICAgICAgIF90eXBlYWhlYWQ6IGFueTtcclxuICAgICAgICB0eXBlYWhlYWRUZXh0O1xyXG4gICAgICAgIG5nTW9kZWw7XHJcbiAgICAgICAgdXBkYXRlO1xyXG4gICAgICAgIHJlc2V0VmFsaWRpdHk7XHJcbiAgICAgICAgb25TZWxlY3Q6IGFueTtcclxuXHJcbiAgICAgICAgc2V0IHR5cGVhaGVhZCh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3R5cGVhaGVhZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZXNldFZhbGlkaXR5KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFZhbGlkaXR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdHlwZWFoZWFkKCk6IGFueSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90eXBlYWhlYWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9pc1Zpc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGdldCBpc1Zpc2libGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1Zpc2libGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgaXNWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzVmlzaWJsZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsU2VhcmNoKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW5jZWxTZWFyY2goKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpY2tldCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dC5jYW5jZWwodGhpcy50aWNrZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0UHJldigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJZHggPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZElkeC0tO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMuc2VsZWN0ZWRJZHggPSB0aGlzLnJlc3VsdHMubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdE5leHQoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSWR4IDwgdGhpcy5yZXN1bHRzLmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSWR4Kys7XHJcbiAgICAgICAgICAgIGVsc2UgdGhpcy5zZWxlY3RlZElkeCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3QoJGluZGV4Pykge1xyXG4gICAgICAgICAgICBpZiAoJGluZGV4ICE9IG51bGwpIC8vIHNpbmdsZSBlcXVhbGl0eSAoPSkgdG8gc25hZyB1bmRlZmluZWQgYWxzb1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZElkeCA9ICRpbmRleDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJZHggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQgPSB0aGlzLnJlc3VsdHNbdGhpcy5zZWxlY3RlZElkeF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZElkeCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNTZWxlY3RlZCgkaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJZHggPT09ICRpbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhhc1NlbGVjdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJZHggPiAtMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlYXJjaCh0ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBkZWZlciA9IHRoaXMuJHEuZGVmZXI8YW55PigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxTZWFyY2goKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZXh0ID09IG51bGwgfHwgdGV4dC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50aWNrZXQgPSB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5vblNlYXJjaCh7IHRleHQ6IHRleHQgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFwcm9taXNlLnRoZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdHMgPSBwcm9taXNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKHJlc3VsdHMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0aGlzLnJlc3VsdHMubGVuZ3RoID4gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9LCB0aGlzLnNlYXJjaERlbGF5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUeXBlYWhlYWREaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckY29tcGlsZScsICckdGVtcGxhdGVDYWNoZScsICckcGFyc2UnLCAnJHRpbWVvdXQnLCAnaXNNb2JpbGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIHByaXZhdGUgJGNvbXBpbGU6IGFuZ3VsYXIuSUNvbXBpbGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlICR0ZW1wbGF0ZUNhY2hlOiBhbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkcGFyc2U6IGFuZ3VsYXIuSVBhcnNlU2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW5ndWxhci5JVGltZW91dFNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgaXNNb2JpbGU6IGJvb2xlYW5cclxuICAgICAgICApIHsgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdBJztcclxuICAgICAgICByZXF1aXJlID0gWyd0eXBlYWhlYWQnLCAnbmdNb2RlbCddO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBUeXBlYWhlYWRDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd0eXBlYWhlYWRWbSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHR5cGVhaGVhZDogJz0nLFxyXG4gICAgICAgICAgICB0eXBlYWhlYWRUZW1wbGF0ZTogJ0AnLFxyXG4gICAgICAgICAgICB0eXBlYWhlYWRUZXh0OiAnQCcsXHJcbiAgICAgICAgICAgIG9uU2VhcmNoOiAnJicsXHJcbiAgICAgICAgICAgIG9uU2VsZWN0OiAnJidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgY3RybHM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciAkY3RybDogVHlwZWFoZWFkQ29udHJvbGxlciA9IGN0cmxzWzBdLFxyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciA9IGN0cmxzWzFdLFxyXG4gICAgICAgICAgICAgICAgJGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIGdldFRleHRGcm9tTW9kZWwgPSB0aGlzLiRwYXJzZSgkYXR0cnNbJ3R5cGVhaGVhZFRleHQnXSksXHJcbiAgICAgICAgICAgICAgICBnZXRDb250ZW50OiAoKSA9PiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5hdHRyKFwiYXV0b2NvbXBsZXRlXCIsIFwib2ZmXCIpO1xyXG5cclxuICAgICAgICAgICAgJGJvZHkub24oXCJrZXl1cC50eXBlYWhlYWRcIiwgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNFc2NhcGUoZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRjdHJsLnVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGdldFRleHRGcm9tTW9kZWwoJGN0cmwudHlwZWFoZWFkKSB8fCAkY3RybC50eXBlYWhlYWQ7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VmFsaWRpdHkodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdrZXlkb3duLnR5cGVhaGVhZCBjaGFuZ2UudHlwZWFoZWFkJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISRjdHJsLmlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0VzY2FwZShlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0tleVVwKGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0UHJldigpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0tleURvd24oZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3ROZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgodGhpcy5pc0VudGVyKGUpIHx8IHRoaXMuaXNUYWIoZSkpICYmICRjdHJsLmhhc1NlbGVjdGlvbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdrZXl1cC50eXBlYWhlYWQnLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29udHJvbEtleShlKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0ZWRJZHggPSAtMTtcclxuICAgICAgICAgICAgICAgICRjdHJsLnR5cGVhaGVhZCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2VhcmNoKCRuZ01vZGVsQ3RybC4kbW9kZWxWYWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3R5cGVhaGVhZC1wbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGdldENvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50KSBjb250ZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgJGJvZHkub2ZmKFwia2V5dXAudHlwZWFoZWFkIGNsaWNrLnR5cGVhaGVhZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRWYWxpZGl0eShpc1ZhbGlkOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHNldFZhbGlkaXR5KCd0eXBlYWhlYWQnLCBpc1ZhbGlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGN0cmwucmVzZXRWYWxpZGl0eSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldFZhbGlkaXR5KHRydWUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKCRjdHJsLnR5cGVhaGVhZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgJGN0cmwudXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0Q29udGVudCA9IHRoaXMubGlua01vYmlsZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsLCAkbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRDb250ZW50ID0gdGhpcy5saW5rRGVza3RvcCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsLCAkbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmtNb2JpbGUgPSAoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCAkY3RybDogVHlwZWFoZWFkQ29udHJvbGxlciwgJG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgJGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgICRjb250ZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICAgICAgICAgICAgICAkcGxhY2Vob2xkZXI6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCd0eXBlYWhlYWQtbW9iaWxlIHR5cGVhaGVhZC1tb2JpbGUtLWlucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRWYWxpZGl0eShpc1ZhbGlkOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHNldFZhbGlkaXR5KCd0eXBlYWhlYWQnLCBpc1ZhbGlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGVuc3VyZVBsYWNlaG9sZGVyRXhpc3RzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRwbGFjZWhvbGRlcilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJHBsYWNlaG9sZGVyID0gYW5ndWxhci5lbGVtZW50KFwiPGRpdiBjbGFzcz0ndHlwZWFoZWFkLXBsYWNlaG9sZGVyJz48L2Rpdj5cIik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgbW92ZUVsZW1lbnRUb0JvZHkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNCb2R5RWxlbWVudCgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBzdG9wQm9keVNjcm9sbGluZyh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlbnN1cmVQbGFjZWhvbGRlckV4aXN0cygpO1xyXG4gICAgICAgICAgICAgICAgJHBsYWNlaG9sZGVyLmluc2VydEJlZm9yZSgkZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmQoJGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmFkZENsYXNzKCd0eXBlYWhlYWQtbW9iaWxlLS1mb2N1c2VkJyk7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGVuc3VyZUNvbnRlbnRFeGlzdHMoKTtcclxuICAgICAgICAgICAgICAgICRjb250ZW50LmFkZENsYXNzKCd0eXBlYWhlYWQtbW9iaWxlLS1mb2N1c2VkJyk7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2VhcmNoKCRuZ01vZGVsQ3RybC4kdmlld1ZhbHVlKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtb3ZlRWxlbWVudEJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzQm9keUVsZW1lbnQoKSB8fCAkcGxhY2Vob2xkZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgc3RvcEJvZHlTY3JvbGxpbmcoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKCd0eXBlYWhlYWQtbW9iaWxlLS1mb2N1c2VkJyk7XHJcbiAgICAgICAgICAgICAgICAkY29udGVudC5yZW1vdmVDbGFzcygndHlwZWFoZWFkLW1vYmlsZS0tZm9jdXNlZCcpO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuaW5zZXJ0QmVmb3JlKCRwbGFjZWhvbGRlcik7XHJcbiAgICAgICAgICAgICAgICAkcGxhY2Vob2xkZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlbnN1cmVDb250ZW50RXhpc3RzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkY29udGVudCA9IHRoaXMuY3JlYXRlQ29udGVudEZyb21BdHRyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycyk7XHJcbiAgICAgICAgICAgICAgICAkY29udGVudC5vbignY2xpY2sudHlwZWFoZWFkJywgKCRldmVudDogYW5ndWxhci5JQW5ndWxhckV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZUVsZW1lbnRCYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJGNvbnRlbnQuYWRkQ2xhc3MoJ3R5cGVhaGVhZC1tb2JpbGUgdHlwZWFoZWFkLW1vYmlsZS0tZHJvcGRvd24nKTtcclxuICAgICAgICAgICAgICAgICRib2R5LmFwcGVuZCgkY29udGVudCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5pdEVsZW1lbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb3ZlRWxlbWVudFRvQm9keSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgaXNCb2R5RWxlbWVudCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5wYXJlbnQoKS5pcygkYm9keSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBib2R5UG9zO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBzdG9wQm9keVNjcm9sbGluZyhib29sKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9vbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5Lm9mZihcInRvdWNobW92ZVwiLCBmcmVlemVWcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkuY3NzKFwicG9zaXRpb25cIiwgYm9keVBvcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5Lm9uKFwidG91Y2htb3ZlXCIsIGZyZWV6ZVZwKTtcclxuICAgICAgICAgICAgICAgICAgICBib2R5UG9zID0gJGJvZHkuY3NzKFwicG9zaXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkuY3NzKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGZyZWV6ZVZwID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdmb2N1cy50eXBlYWhlYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSAkbmdNb2RlbEN0cmwuJG1vZGVsVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAhdmFsdWUubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIHNldFZhbGlkaXR5KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJGF0dHJzWyd0eXBlYWhlYWRTZWxlY3Rpb25SZXF1aXJlZCddICE9IG51bGwgJiYgJGN0cmwudHlwZWFoZWFkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VmFsaWRpdHkoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIG1vdmVFbGVtZW50VG9Cb2R5KCk7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5yZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiAkY29udGVudDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rRGVza3RvcCA9ICgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsICRjdHJsOiBUeXBlYWhlYWRDb250cm9sbGVyLCAkbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2ZvY3VzLnR5cGVhaGVhZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5jcmVhdGVDb250ZW50RnJvbUF0dHIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKTtcclxuICAgICAgICAgICAgICAgICRib2R5LmFwcGVuZChjb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGV0aGVyID0gbmV3IFRldGhlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiAkZWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRBdHRhY2htZW50OiAnYm90dG9tIGxlZnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudDogJ3RvcCBsZWZ0JyxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc1ByZWZpeDogJ3R5cGVhaGVhZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0T2Zmc2V0OiAnNnB4IDAnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0cmFpbnRzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bzogJ3dpbmRvdycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b2dldGhlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpbjogWyd0b3AnLCAnbGVmdCcsICdib3R0b20nLCAncmlnaHQnXVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZXRoZXIucG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRWYWxpZGl0eShpc1ZhbGlkOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHNldFZhbGlkaXR5KCd0eXBlYWhlYWQnLCBpc1ZhbGlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGJsdXJUaW1lcjtcclxuXHJcbiAgICAgICAgICAgICRib2R5Lm9uKFwiY2xpY2sudHlwZWFoZWFkXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRlbGVtZW50LmlzKGUudGFyZ2V0KSB8fCAhY29udGVudCB8fCBjb250ZW50LmlzKGUudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQuY2FuY2VsKGJsdXJUaW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdibHVyLnR5cGVhaGVhZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIEFsbG93IGFueSBjbGljayBvbiB0aGUgbWVudSB0byBjb21lIHRocm91Z2ggZmlyc3RcclxuICAgICAgICAgICAgICAgIGJsdXJUaW1lciA9IHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRuZ01vZGVsQ3RybC4kbW9kZWxWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgIXZhbHVlLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFsaWRpdHkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoJGF0dHJzWyd0eXBlYWhlYWRTZWxlY3Rpb25SZXF1aXJlZCddICE9IG51bGwgJiYgJGN0cmwudHlwZWFoZWFkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbGlkaXR5KGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwucmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICgpID0+IGNvbnRlbnQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJldmVudERlZmF1bHQoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzRXNjYXBlKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUud2hpY2ggPT09IDI3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNFbnRlcihlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSA5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNUYWIoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS53aGljaCA9PT0gMTM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0tleVVwKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUud2hpY2ggPT09IDM4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNLZXlEb3duKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUud2hpY2ggPT09IDQwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNDb250cm9sS2V5KGUpIHtcclxuICAgICAgICAgICAgdmFyIGsgPSBlLndoaWNoO1xyXG4gICAgICAgICAgICByZXR1cm4gayA9PT0gOSB8fCBrID09PSAxMyB8fCAoayA+PSAxNiAmJiBrIDw9IDIwKSB8fCBrID09PSAyNyB8fCAoayA+PSAzMyAmJiBrIDw9IDQwKSB8fCBrID09PSA0NSB8fCAoayA+PSA5MSAmJiBrIDw9IDkzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbnRlbnRGcm9tQXR0cigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW1UZXh0ID0gJGF0dHJzWyd0eXBlYWhlYWRUZXh0J10gPT0gbnVsbCA/IFwiaXRlbVwiIDogYGl0ZW0uJHskYXR0cnNbJ3R5cGVhaGVhZFRleHQnXX1gLFxyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IHRoaXMuY3JlYXRlQ29udGVudCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnNbJ3R5cGVhaGVhZFRlbXBsYXRlJ10sIGl0ZW1UZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVDb250ZW50KHNjb3BlLCBlbGVtZW50LCB0ZW1wbGF0ZVVybCwgdGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgaHRtbCA9IHRlbXBsYXRlVXJsID8gdGhpcy4kdGVtcGxhdGVDYWNoZS5nZXQodGVtcGxhdGVVcmwpIDogYDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJ0eXBlYWhlYWQtbGlua1wiPnt7JHt0ZXh0fX19PC9hPmAsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGA8ZGl2IGNsYXNzPVwidHlwZWFoZWFkXCIgbmctY2xhc3M9XCJ7J3R5cGVhaGVhZC0taGlkZGVuJzohdHlwZWFoZWFkVm0uaXNWaXNpYmxlfVwiPjx1bCBjbGFzcz1cInR5cGVhaGVhZC1tZW51XCI+PGxpIGNsYXNzPVwidHlwZWFoZWFkLWl0ZW1cIiBuZy1yZXBlYXQ9XCJpdGVtIGluIHR5cGVhaGVhZFZtLnJlc3VsdHNcIiBuZy1jbGFzcz1cInsndHlwZWFoZWFkLWl0ZW0tLXNlbGVjdGVkJzogdHlwZWFoZWFkVm0uaXNTZWxlY3RlZCgkaW5kZXgpfVwiIG5nLWNsaWNrPVwidHlwZWFoZWFkVm0uc2VsZWN0KCRpbmRleClcIj4ke2h0bWx9PC9saT48L3VsPjwvZGl2PmAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgdGhpcy4kY29tcGlsZShjb250ZW50KShzY29wZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nVHlwZWFoZWFkXCIpLmRpcmVjdGl2ZSgndHlwZWFoZWFkJywgVHlwZWFoZWFkRGlyZWN0aXZlKTtcclxufSJdfQ==