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
            console.log('select', $index);
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
                $ctrl.update = function () {
                    var value = getTextFromModel($ctrl.typeahead) || $ctrl.typeahead;
                    $ngModelCtrl.$setViewValue(value);
                    setValidity(true);
                    $ngModelCtrl.$render();
                };
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
                var $body = angular.element('body'), $content, $input, $close, $placeholder, blurTimer;
                function setValidity(isValid) {
                    $ngModelCtrl.$setValidity('typeahead', isValid);
                }
                var freezeVp = function (e) {
                    e.preventDefault();
                };
                function stopBodyScrolling(stopScroll) {
                    if (stopScroll) {
                        $body.on("touchmove", freezeVp);
                        $body.addClass("typeahead-mobile-body");
                    }
                    else {
                        $body.off("touchmove", freezeVp);
                        $body.removeClass("typeahead-mobile-body");
                    }
                }
                var ensureContentExists = function () {
                    if ($content)
                        return;
                    $content = _this.createContentFromAttr($scope, $element, $attrs);
                    $input = $content.find(".typeahead-mobile-input");
                    $input.on('blur.typeahead', function () {
                        _this.$timeout(function () {
                            stopBodyScrolling(false);
                            $content.removeClass('typeahead-mobile-dropdown');
                            $ctrl.isVisible = false;
                            $scope.$apply();
                        }, 100);
                    });
                    $input.on('keyup.typeahead', function (e) {
                        if (_this.isControlKey(e))
                            return;
                        $ctrl.selectedIdx = -1;
                        $ctrl.typeahead = null;
                        $ctrl.search($input.val());
                    });
                    $close = $content.find(".typeahead-mobile-close");
                    $body.append($content);
                };
                // var _update = $ctrl.update;
                // $ctrl.update = () => {
                //     _update();
                //     $ctrl.isVisible = true;
                // };
                $element.on('focus.typeahead', function () {
                    ensureContentExists();
                    $content.addClass('typeahead-mobile-dropdown');
                    $input.val('');
                    stopBodyScrolling(true);
                    _this.$timeout(function () {
                        $input.focus();
                    }, 100);
                    $ctrl.results = [];
                    $ctrl.isVisible = true;
                    $scope.$apply();
                });
                return function () { return $content; };
            };
            this.linkDesktop = function ($scope, $element, $attrs, $ctrl, $ngModelCtrl) {
                var $body = angular.element('body'), content;
                $body.on("keyup.typeahead", function (e) {
                    if (!_this.isEscape(e))
                        return;
                    $ctrl.isVisible = false;
                    $scope.$apply();
                });
                $element.on('keyup.typeahead', function (e) {
                    if (_this.isControlKey(e))
                        return;
                    $ctrl.selectedIdx = -1;
                    $ctrl.typeahead = null;
                    $ctrl.search($ngModelCtrl.$modelValue);
                });
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
            var html = templateUrl ? this.$templateCache.get(templateUrl) : "<a href=\"#\" class=\"typeahead-link\">{{" + text + "}}</a>", template = "\n                <div class=\"typeahead\" ng-class=\"{'typeahead--hidden':!typeaheadVm.isVisible}\">\n                    <div class=\"typeahead-mobile-top\">\n                        <input class=\"typeahead-mobile-input\" type=\"text\"><i class=\"typeahead-mobile-close\">&times;</i>\n                    </div>\n                    <div class=\"typeahead-mobile-bottom\">\n                        <ul class=\"typeahead-menu\">\n                            <li class=\"typeahead-item\" ng-repeat=\"item in typeaheadVm.results\" ng-class=\"{'typeahead-item--selected': typeaheadVm.isSelected($index)}\"\n                                ng-click=\"typeaheadVm.select($index)\">" + html + "</li>\n                        </ul>\n                    </div>\n                </div>\n                ", content = angular.element(template);
            this.$compile(content)(scope);
            return content;
        };
        TypeaheadDirective.$inject = ['$compile', '$templateCache', '$parse', '$timeout', 'isMobile'];
        return TypeaheadDirective;
    })();
    Angular.module("ngTypeahead").directive('typeahead', TypeaheadDirective);
})(AngularTypeaheadModule || (AngularTypeaheadModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10eXBlYWhlYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL21vYmlsZS50cyIsIi4uL3NyYy90eXBlYWhlYWQudHMiXSwibmFtZXMiOlsiQW5ndWxhclR5cGVhaGVhZE1vZHVsZSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuTW9iaWxlQ29uZmlnIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5Nb2JpbGVDb25maWcuY29uc3RydWN0b3IiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLk1vYmlsZUNvbmZpZy5pc01vYmlsZSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlciIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlci50eXBlYWhlYWQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZENvbnRyb2xsZXIuaXNWaXNpYmxlIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLmNhbmNlbFNlYXJjaCIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkQ29udHJvbGxlci5zZWxlY3RQcmV2IiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLnNlbGVjdE5leHQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZENvbnRyb2xsZXIuc2VsZWN0IiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLmlzU2VsZWN0ZWQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZENvbnRyb2xsZXIuaGFzU2VsZWN0aW9uIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWRDb250cm9sbGVyLnNlYXJjaCIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkRGlyZWN0aXZlIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUuY29uc3RydWN0b3IiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5jb25zdHJ1Y3Rvci5zZXRWYWxpZGl0eSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkRGlyZWN0aXZlLmNvbnN0cnVjdG9yLnN0b3BCb2R5U2Nyb2xsaW5nIiwiQW5ndWxhclR5cGVhaGVhZE1vZHVsZS5UeXBlYWhlYWREaXJlY3RpdmUucHJldmVudERlZmF1bHQiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5pc0VzY2FwZSIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkRGlyZWN0aXZlLmlzRW50ZXIiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5pc1RhYiIsIkFuZ3VsYXJUeXBlYWhlYWRNb2R1bGUuVHlwZWFoZWFkRGlyZWN0aXZlLmlzS2V5VXAiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5pc0tleURvd24iLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5pc0NvbnRyb2xLZXkiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5jcmVhdGVDb250ZW50RnJvbUF0dHIiLCJBbmd1bGFyVHlwZWFoZWFkTW9kdWxlLlR5cGVhaGVhZERpcmVjdGl2ZS5jcmVhdGVDb250ZW50Il0sIm1hcHBpbmdzIjoiQUFBQSwyQ0FBMkM7QUFDM0MseUdBQXlHO0FBR3pHLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FDSmxDLElBQU8sc0JBQXNCLENBZTVCO0FBZkQsV0FBTyxzQkFBc0IsRUFBQyxDQUFDO0lBRTNCQTtRQUFBQztRQVVBQyxD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QUFXQSxFQUFFQSxrQkFBa0JBLENBQUNBLENBQUNBO0FBQzdFQSxDQUFDQSxFQXhiTSxzQkFBc0IsS0FBdEIsc0JBQXNCLFFBd2I1QiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL3RzZC5kLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYm93ZXJfY29tcG9uZW50cy9hbmd1bGFyLXR5cGVzY3JpcHQtbW9kdWxlL2Rpc3QvYW5ndWxhci10eXBlc2NyaXB0LW1vZHVsZS5kLnRzXCIvPlxyXG5kZWNsYXJlIHZhciBUZXRoZXI6IGFueTtcclxuXHJcbkFuZ3VsYXIubW9kdWxlKFwibmdUeXBlYWhlYWRcIiwgW10pOyIsIm1vZHVsZSBBbmd1bGFyVHlwZWFoZWFkTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBNb2JpbGVDb25maWcge1xyXG4gICAgICAgIHN0YXRpYyBpc01vYmlsZSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvd1tcIm9wZXJhXCJdO1xyXG4gICAgICAgICAgICB2YXIgdGVzdDEgPSAvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2kudGVzdChhZ2VudCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWdlbnRQcmVmaXggPSBhZ2VudC5zdWJzdHIoMCwgNCk7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0MiA9IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYWdlbnRQcmVmaXgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRlc3QxIHx8IHRlc3QyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nVHlwZWFoZWFkXCIpLmNvbnN0YW50KCdpc01vYmlsZScsIE1vYmlsZUNvbmZpZy5pc01vYmlsZSgpKTtcclxufSIsIm1vZHVsZSBBbmd1bGFyVHlwZWFoZWFkTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBUeXBlYWhlYWRDb250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJHRpbWVvdXQnLCAnJHEnLCAnaXNNb2JpbGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkdGltZW91dCwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZElkeCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLl9pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hEZWxheSA9IDE1MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uU2VhcmNoO1xyXG4gICAgICAgIHRpY2tldDtcclxuICAgICAgICBzZWFyY2hEZWxheTogbnVtYmVyO1xyXG4gICAgICAgIHJlc3VsdHM7XHJcbiAgICAgICAgc2VsZWN0ZWRJZHg6IG51bWJlcjtcclxuICAgICAgICBfdHlwZWFoZWFkOiBhbnk7XHJcbiAgICAgICAgdHlwZWFoZWFkVGV4dDtcclxuICAgICAgICBuZ01vZGVsO1xyXG4gICAgICAgIHVwZGF0ZTtcclxuICAgICAgICByZXNldFZhbGlkaXR5O1xyXG4gICAgICAgIG9uU2VsZWN0OiBhbnk7XHJcblxyXG4gICAgICAgIHNldCB0eXBlYWhlYWQodmFsdWU6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLl90eXBlYWhlYWQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVzZXRWYWxpZGl0eSlcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRWYWxpZGl0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHR5cGVhaGVhZCgpOiBhbnkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHlwZWFoZWFkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfaXNWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBnZXQgaXNWaXNpYmxlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNWaXNpYmxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGlzVmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1Zpc2libGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbFNlYXJjaCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FuY2VsU2VhcmNoKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50aWNrZXQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQuY2FuY2VsKHRoaXMudGlja2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdFByZXYoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSWR4ID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJZHgtLTtcclxuICAgICAgICAgICAgZWxzZSB0aGlzLnNlbGVjdGVkSWR4ID0gdGhpcy5yZXN1bHRzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3ROZXh0KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZElkeCA8IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZElkeCsrO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMuc2VsZWN0ZWRJZHggPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0KCRpbmRleD8pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlbGVjdCcsICRpbmRleCk7XHJcbiAgICAgICAgICAgIGlmICgkaW5kZXggIT0gbnVsbCkgLy8gc2luZ2xlIGVxdWFsaXR5ICg9KSB0byBzbmFnIHVuZGVmaW5lZCBhbHNvXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSWR4ID0gJGluZGV4O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZElkeCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZCA9IHRoaXMucmVzdWx0c1t0aGlzLnNlbGVjdGVkSWR4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSWR4ID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1NlbGVjdGVkKCRpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZElkeCA9PT0gJGluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGFzU2VsZWN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZElkeCA+IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VhcmNoKHRleHQpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVyID0gdGhpcy4kcS5kZWZlcjxhbnk+KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbFNlYXJjaCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRleHQgPT0gbnVsbCB8fCB0ZXh0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpY2tldCA9IHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLm9uU2VhcmNoKHsgdGV4dDogdGV4dCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXByb21pc2UudGhlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IHByb21pc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0cyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0cztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRoaXMucmVzdWx0cy5sZW5ndGggPiAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0sIHRoaXMuc2VhcmNoRGVsYXkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFR5cGVhaGVhZERpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbJyRjb21waWxlJywgJyR0ZW1wbGF0ZUNhY2hlJywgJyRwYXJzZScsICckdGltZW91dCcsICdpc01vYmlsZSddO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcHJpdmF0ZSAkY29tcGlsZTogYW5ndWxhci5JQ29tcGlsZVNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgJHRlbXBsYXRlQ2FjaGU6IGFuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlICRwYXJzZTogYW5ndWxhci5JUGFyc2VTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbmd1bGFyLklUaW1lb3V0U2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSBpc01vYmlsZTogYm9vbGVhblxyXG4gICAgICAgICkgeyB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSBbJ3R5cGVhaGVhZCcsICduZ01vZGVsJ107XHJcbiAgICAgICAgY29udHJvbGxlciA9IFR5cGVhaGVhZENvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ3R5cGVhaGVhZFZtJztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdHlwZWFoZWFkOiAnPScsXHJcbiAgICAgICAgICAgIHR5cGVhaGVhZFRlbXBsYXRlOiAnQCcsXHJcbiAgICAgICAgICAgIHR5cGVhaGVhZFRleHQ6ICdAJyxcclxuICAgICAgICAgICAgb25TZWFyY2g6ICcmJyxcclxuICAgICAgICAgICAgb25TZWxlY3Q6ICcmJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCBjdHJsczogYW55W10pID0+IHtcclxuICAgICAgICAgICAgdmFyICRjdHJsOiBUeXBlYWhlYWRDb250cm9sbGVyID0gY3RybHNbMF0sXHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyID0gY3RybHNbMV0sXHJcbiAgICAgICAgICAgICAgICAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgZ2V0VGV4dEZyb21Nb2RlbCA9IHRoaXMuJHBhcnNlKCRhdHRyc1sndHlwZWFoZWFkVGV4dCddKSxcclxuICAgICAgICAgICAgICAgIGdldENvbnRlbnQ6ICgpID0+IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50LmF0dHIoXCJhdXRvY29tcGxldGVcIiwgXCJvZmZcIik7XHJcblxyXG4gICAgICAgICAgICAkY3RybC51cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBnZXRUZXh0RnJvbU1vZGVsKCRjdHJsLnR5cGVhaGVhZCkgfHwgJGN0cmwudHlwZWFoZWFkO1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFZhbGlkaXR5KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygndHlwZWFoZWFkLXBsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gZ2V0Q29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQpIGNvbnRlbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAkYm9keS5vZmYoXCJrZXl1cC50eXBlYWhlYWQgY2xpY2sudHlwZWFoZWFkXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFZhbGlkaXR5KGlzVmFsaWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kc2V0VmFsaWRpdHkoJ3R5cGVhaGVhZCcsIGlzVmFsaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkY3RybC5yZXNldFZhbGlkaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0VmFsaWRpdHkodHJ1ZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoJGN0cmwudHlwZWFoZWFkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAkY3RybC51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRDb250ZW50ID0gdGhpcy5saW5rTW9iaWxlKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwsICRuZ01vZGVsQ3RybCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldENvbnRlbnQgPSB0aGlzLmxpbmtEZXNrdG9wKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmwsICRuZ01vZGVsQ3RybCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlua01vYmlsZSA9ICgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsICRjdHJsOiBUeXBlYWhlYWRDb250cm9sbGVyLCAkbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgJGNvbnRlbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSxcclxuICAgICAgICAgICAgICAgICRpbnB1dDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LFxyXG4gICAgICAgICAgICAgICAgJGNsb3NlOiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICAgICAgICAgICAgICAkcGxhY2Vob2xkZXI6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSxcclxuICAgICAgICAgICAgICAgIGJsdXJUaW1lcjtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFZhbGlkaXR5KGlzVmFsaWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgICRuZ01vZGVsQ3RybC4kc2V0VmFsaWRpdHkoJ3R5cGVhaGVhZCcsIGlzVmFsaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZnJlZXplVnAgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc3RvcEJvZHlTY3JvbGxpbmcoc3RvcFNjcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0b3BTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAkYm9keS5vbihcInRvdWNobW92ZVwiLCBmcmVlemVWcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkuYWRkQ2xhc3MoXCJ0eXBlYWhlYWQtbW9iaWxlLWJvZHlcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5Lm9mZihcInRvdWNobW92ZVwiLCBmcmVlemVWcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkucmVtb3ZlQ2xhc3MoXCJ0eXBlYWhlYWQtbW9iaWxlLWJvZHlcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBlbnN1cmVDb250ZW50RXhpc3RzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkY29udGVudCA9IHRoaXMuY3JlYXRlQ29udGVudEZyb21BdHRyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGlucHV0ID0gJGNvbnRlbnQuZmluZChcIi50eXBlYWhlYWQtbW9iaWxlLWlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgJGlucHV0Lm9uKCdibHVyLnR5cGVhaGVhZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcEJvZHlTY3JvbGxpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY29udGVudC5yZW1vdmVDbGFzcygndHlwZWFoZWFkLW1vYmlsZS1kcm9wZG93bicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICRpbnB1dC5vbigna2V5dXAudHlwZWFoZWFkJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb250cm9sS2V5KGUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdGVkSWR4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwudHlwZWFoZWFkID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2VhcmNoKCRpbnB1dC52YWwoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkY2xvc2UgPSAkY29udGVudC5maW5kKFwiLnR5cGVhaGVhZC1tb2JpbGUtY2xvc2VcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJvZHkuYXBwZW5kKCRjb250ZW50KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBfdXBkYXRlID0gJGN0cmwudXBkYXRlO1xyXG4gICAgICAgICAgICAvLyAkY3RybC51cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICBfdXBkYXRlKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAkY3RybC5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2ZvY3VzLnR5cGVhaGVhZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGVuc3VyZUNvbnRlbnRFeGlzdHMoKTtcclxuICAgICAgICAgICAgICAgICRjb250ZW50LmFkZENsYXNzKCd0eXBlYWhlYWQtbW9iaWxlLWRyb3Bkb3duJyk7XHJcbiAgICAgICAgICAgICAgICAkaW5wdXQudmFsKCcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdG9wQm9keVNjcm9sbGluZyh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGN0cmwucmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gJGNvbnRlbnQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGlua0Rlc2t0b3AgPSAoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCAkY3RybDogVHlwZWFoZWFkQ29udHJvbGxlciwgJG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgJGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeTtcclxuXHJcbiAgICAgICAgICAgICRib2R5Lm9uKFwia2V5dXAudHlwZWFoZWFkXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzRXNjYXBlKGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbigna2V5dXAudHlwZWFoZWFkJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbnRyb2xLZXkoZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdGVkSWR4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAkY3RybC50eXBlYWhlYWQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICRjdHJsLnNlYXJjaCgkbmdNb2RlbEN0cmwuJG1vZGVsVmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdrZXlkb3duLnR5cGVhaGVhZCBjaGFuZ2UudHlwZWFoZWFkJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISRjdHJsLmlzVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0VzY2FwZShlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0tleVVwKGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0UHJldigpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50RGVmYXVsdChlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0tleURvd24oZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3ROZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgodGhpcy5pc0VudGVyKGUpIHx8IHRoaXMuaXNUYWIoZSkpICYmICRjdHJsLmhhc1NlbGVjdGlvbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdmb2N1cy50eXBlYWhlYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IHRoaXMuY3JlYXRlQ29udGVudEZyb21BdHRyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycyk7XHJcbiAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmQoY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRldGhlciA9IG5ldyBUZXRoZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogJGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QXR0YWNobWVudDogJ2JvdHRvbSBsZWZ0JyxcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b3AgbGVmdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NQcmVmaXg6ICd0eXBlYWhlYWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldE9mZnNldDogJzZweCAwJyxcclxuICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50czogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG86ICd3aW5kb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50OiAndG9nZXRoZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaW46IFsndG9wJywgJ2xlZnQnLCAnYm90dG9tJywgJ3JpZ2h0J11cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGV0aGVyLnBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0VmFsaWRpdHkoaXNWYWxpZDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWYWxpZGl0eSgndHlwZWFoZWFkJywgaXNWYWxpZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBibHVyVGltZXI7XHJcblxyXG4gICAgICAgICAgICAkYm9keS5vbihcImNsaWNrLnR5cGVhaGVhZFwiLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudC5pcyhlLnRhcmdldCkgfHwgIWNvbnRlbnQgfHwgY29udGVudC5pcyhlLnRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0LmNhbmNlbChibHVyVGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbignYmx1ci50eXBlYWhlYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBBbGxvdyBhbnkgY2xpY2sgb24gdGhlIG1lbnUgdG8gY29tZSB0aHJvdWdoIGZpcnN0XHJcbiAgICAgICAgICAgICAgICBibHVyVGltZXIgPSB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSAkbmdNb2RlbEN0cmwuJG1vZGVsVmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8ICF2YWx1ZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbGlkaXR5KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCRhdHRyc1sndHlwZWFoZWFkU2VsZWN0aW9uUmVxdWlyZWQnXSAhPSBudWxsICYmICRjdHJsLnR5cGVhaGVhZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWxpZGl0eShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLnJlc3VsdHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiBjb250ZW50O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0VzY2FwZShlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSAyNztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzRW50ZXIoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS53aGljaCA9PT0gOTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzVGFiKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUud2hpY2ggPT09IDEzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNLZXlVcChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSAzODtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzS2V5RG93bihlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSA0MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzQ29udHJvbEtleShlKSB7XHJcbiAgICAgICAgICAgIHZhciBrID0gZS53aGljaDtcclxuICAgICAgICAgICAgcmV0dXJuIGsgPT09IDkgfHwgayA9PT0gMTMgfHwgKGsgPj0gMTYgJiYgayA8PSAyMCkgfHwgayA9PT0gMjcgfHwgKGsgPj0gMzMgJiYgayA8PSA0MCkgfHwgayA9PT0gNDUgfHwgKGsgPj0gOTEgJiYgayA8PSA5Myk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVDb250ZW50RnJvbUF0dHIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtVGV4dCA9ICRhdHRyc1sndHlwZWFoZWFkVGV4dCddID09IG51bGwgPyBcIml0ZW1cIiA6IGBpdGVtLiR7JGF0dHJzWyd0eXBlYWhlYWRUZXh0J119YCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmNyZWF0ZUNvbnRlbnQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzWyd0eXBlYWhlYWRUZW1wbGF0ZSddLCBpdGVtVGV4dCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ29udGVudChzY29wZSwgZWxlbWVudCwgdGVtcGxhdGVVcmwsIHRleHQpIHtcclxuICAgICAgICAgICAgdmFyIGh0bWwgPSB0ZW1wbGF0ZVVybCA/IHRoaXMuJHRlbXBsYXRlQ2FjaGUuZ2V0KHRlbXBsYXRlVXJsKSA6IGA8YSBocmVmPVwiI1wiIGNsYXNzPVwidHlwZWFoZWFkLWxpbmtcIj57eyR7dGV4dH19fTwvYT5gLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHlwZWFoZWFkXCIgbmctY2xhc3M9XCJ7J3R5cGVhaGVhZC0taGlkZGVuJzohdHlwZWFoZWFkVm0uaXNWaXNpYmxlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0eXBlYWhlYWQtbW9iaWxlLXRvcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJ0eXBlYWhlYWQtbW9iaWxlLWlucHV0XCIgdHlwZT1cInRleHRcIj48aSBjbGFzcz1cInR5cGVhaGVhZC1tb2JpbGUtY2xvc2VcIj4mdGltZXM7PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0eXBlYWhlYWQtbW9iaWxlLWJvdHRvbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJ0eXBlYWhlYWQtbWVudVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidHlwZWFoZWFkLWl0ZW1cIiBuZy1yZXBlYXQ9XCJpdGVtIGluIHR5cGVhaGVhZFZtLnJlc3VsdHNcIiBuZy1jbGFzcz1cInsndHlwZWFoZWFkLWl0ZW0tLXNlbGVjdGVkJzogdHlwZWFoZWFkVm0uaXNTZWxlY3RlZCgkaW5kZXgpfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2xpY2s9XCJ0eXBlYWhlYWRWbS5zZWxlY3QoJGluZGV4KVwiPiR7aHRtbH08L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBgLFxyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbXBpbGUoY29udGVudCkoc2NvcGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQW5ndWxhci5tb2R1bGUoXCJuZ1R5cGVhaGVhZFwiKS5kaXJlY3RpdmUoJ3R5cGVhaGVhZCcsIFR5cGVhaGVhZERpcmVjdGl2ZSk7XHJcbn0iXX0=