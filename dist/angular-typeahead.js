Angular.module("ngTypeahead", []);
var AngularTypeaheadModule;
(function (AngularTypeaheadModule) {
    var MobileConfig = /** @class */ (function () {
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
    }());
    Angular.module("ngTypeahead").constant('isMobile', MobileConfig.isMobile());
})(AngularTypeaheadModule || (AngularTypeaheadModule = {}));
var AngularTypeaheadModule;
(function (AngularTypeaheadModule) {
    var TypeaheadController = /** @class */ (function () {
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
                var value = this.results[this.selectedIdx];
                this.typeahead = value;
            }
            this.selectedIdx = -1;
            this.update();
            if (this.typeahead != undefined)
                this.onSelect({ value: this.typeahead });
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
                    defer.resolve();
                });
            }, this.searchDelay);
            return defer.promise;
        };
        TypeaheadController.$inject = ['$timeout', '$q', 'isMobile'];
        return TypeaheadController;
    }());
    var TypeaheadDirective = /** @class */ (function () {
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
                typeahead: '=?',
                typeaheadTemplate: '@',
                typeaheadText: '@',
                typeaheadName: '@',
                onSearch: '&',
                onSelect: '&'
            };
            this.link = function ($scope, $element, $attrs, ctrls) {
                var $ctrl = ctrls[0], $ngModelCtrl = ctrls[1], $body = angular.element('body'), getTextFromModel = _this.$parse($attrs['typeaheadText']), getContent;
                $element.attr("autocomplete", "off");
                $ctrl.update = function () {
                    var value = getTextFromModel($ctrl.typeahead) || $ctrl.typeahead;
                    // $ngModelCtrl.$setViewValue(value); // dont do this...
                    $ngModelCtrl.$viewValue = value; // do this, because of ng-disabled
                    $ngModelCtrl.$render();
                    setValidity(true);
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
                    $content = _this.createContentFromAttr($scope, $element, $attrs, $ctrl);
                    $body.append($content);
                    $input = $content.find(".typeahead-mobile-input");
                    $input.on('keyup.typeahead', function (e) {
                        if (_this.isControlKey(e))
                            return;
                        $ctrl.selectedIdx = -1;
                        $ctrl.typeahead = null;
                        $ngModelCtrl.$setViewValue($input.val());
                        $scope.$apply();
                    });
                    $input.on('blur.typeahead', function (e) {
                        _this.$timeout(function () {
                            stopBodyScrolling(false);
                            $content.removeClass('typeahead-mobile-dropdown');
                            var value = $ngModelCtrl.$modelValue;
                            if (value == null || !value.length)
                                setValidity(true);
                            else if ($attrs['typeaheadSelectionRequired'] != null && $ctrl.typeahead == null)
                                setValidity(false);
                            $ctrl.isVisible = false;
                            $scope.$apply();
                        }, 300);
                    });
                    $close = $content.find(".typeahead-mobile-close");
                };
                $element.on('focus.typeahead', function () {
                    ensureContentExists();
                    $content.addClass('typeahead-mobile-dropdown');
                    $input.val($ngModelCtrl.$viewValue);
                    stopBodyScrolling(true);
                    $ctrl.results = [];
                    $ctrl.isVisible = true;
                    $scope.$apply();
                    $input.focus();
                });
                $ngModelCtrl.$viewChangeListeners.push(function () {
                    $ctrl.search($ngModelCtrl.$viewValue);
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
                    $ctrl.search($ngModelCtrl.$modelValue).then(function () {
                        $ctrl.isVisible = $ctrl.results.length > 0;
                    });
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
                    content = _this.createContentFromAttr($scope, $element, $attrs, $ctrl);
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
                    var target = e.target;
                    if ($element.is(target) || !content || content.is(target)) {
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
        TypeaheadDirective.prototype.createContentFromAttr = function ($scope, $element, $attrs, $ctrl) {
            var itemText = $attrs['typeaheadText'] == null ? "item" : "item." + $attrs['typeaheadText'], name = $ctrl.typeaheadName || $scope.$id, content = this.createContent($scope, $element, $attrs['typeaheadTemplate'], name, itemText);
            return content;
        };
        TypeaheadDirective.prototype.createContent = function (scope, element, templateUrl, name, text) {
            var html = templateUrl ? this.$templateCache.get(templateUrl) : "<a href=\"#\" class=\"typeahead-link\">{{" + text + "}}</a>", template = "\n                <div class=\"typeahead typeahead-" + name + "\" ng-class=\"{'typeahead--hidden':!typeaheadVm.isVisible}\">\n                    <div class=\"typeahead-mobile-top\">\n                        <input class=\"typeahead-mobile-input\" type=\"text\"><i class=\"typeahead-mobile-close\">&times;</i>\n                    </div>\n                    <div class=\"typeahead-mobile-bottom\">\n                        <ul class=\"typeahead-menu\">\n                            <li class=\"typeahead-item\" ng-repeat=\"item in typeaheadVm.results\" ng-class=\"{'typeahead-item--selected': typeaheadVm.isSelected($index)}\"\n                                ng-click=\"typeaheadVm.select($index)\">" + html + "</li>\n                        </ul>\n                    </div>\n                </div>\n                ", content = angular.element(template);
            this.$compile(content)(scope);
            return content;
        };
        TypeaheadDirective.$inject = ['$compile', '$templateCache', '$parse', '$timeout', 'isMobile'];
        return TypeaheadDirective;
    }());
    Angular.module("ngTypeahead").directive('typeahead', TypeaheadDirective);
})(AngularTypeaheadModule || (AngularTypeaheadModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10eXBlYWhlYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwLnRzIiwiLi4vc3JjL21vYmlsZS50cyIsIi4uL3NyYy90eXBlYWhlYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7QUNGbEMsSUFBTyxzQkFBc0IsQ0FlNUI7QUFmRCxXQUFPLHNCQUFzQjtJQUV6QjtRQUFBO1FBVUEsQ0FBQztRQVRVLHFCQUFRLEdBQWY7WUFDSSxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZFLElBQUksS0FBSyxHQUFHLDBUQUEwVCxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVuVixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLEtBQUssR0FBRyx5a0RBQXlrRCxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUV4bUQsTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7UUFDMUIsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FBQyxBQVZELElBVUM7SUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDaEYsQ0FBQyxFQWZNLHNCQUFzQixLQUF0QixzQkFBc0IsUUFlNUI7QUNmRCxJQUFPLHNCQUFzQixDQXFjNUI7QUFyY0QsV0FBTyxzQkFBc0I7SUFFekI7UUFHSSw2QkFBb0IsUUFBUSxFQUFVLEVBQXFCO1lBQXZDLGFBQVEsR0FBUixRQUFRLENBQUE7WUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtZQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQzNCLENBQUM7UUFlRCxzQkFBSSwwQ0FBUztpQkFNYjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDO2lCQVJELFVBQWMsS0FBVTtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7b0JBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM3QixDQUFDOzs7V0FBQTtRQVFELHNCQUFJLDBDQUFTO2lCQUFiO2dCQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7aUJBRUQsVUFBYyxLQUFjO2dCQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDNUIsQ0FBQzs7O1dBTkE7UUFRRCwwQ0FBWSxHQUFaO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBRUQsd0NBQVUsR0FBVjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsSUFBSTtnQkFBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQsd0NBQVUsR0FBVjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsSUFBSTtnQkFBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQsb0NBQU0sR0FBTixVQUFPLE1BQU87WUFDVixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO2dCQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDM0IsQ0FBQztZQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRWQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUVELHdDQUFVLEdBQVYsVUFBVyxNQUFNO1lBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFDO1FBQ3ZDLENBQUM7UUFFRCwwQ0FBWSxHQUFaO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELG9DQUFNLEdBQU4sVUFBTyxJQUFJO1lBQVgsaUJBK0JDO1lBOUJHLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFPLENBQUM7WUFFakMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRXBCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBRXZCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDekIsQ0FBQztZQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDeEIsSUFBSSxPQUFPLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUU1QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNoQixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFDdkIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNoQixNQUFNLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztvQkFDaEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBRXZCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLENBQUM7WUFFUCxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXJCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3pCLENBQUM7UUFqSE0sMkJBQU8sR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFrSHBELDBCQUFDO0tBQUEsQUFuSEQsSUFtSEM7SUFFRDtRQUdJLDRCQUNZLFFBQWlDLEVBQ2pDLGNBQTZDLEVBQzdDLE1BQTZCLEVBQzdCLFFBQWlDLEVBQ2pDLFFBQWlCO1lBTDdCLGlCQU1LO1lBTE8sYUFBUSxHQUFSLFFBQVEsQ0FBeUI7WUFDakMsbUJBQWMsR0FBZCxjQUFjLENBQStCO1lBQzdDLFdBQU0sR0FBTixNQUFNLENBQXVCO1lBQzdCLGFBQVEsR0FBUixRQUFRLENBQXlCO1lBQ2pDLGFBQVEsR0FBUixRQUFRLENBQVM7WUFHN0IsYUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNmLFlBQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNuQyxlQUFVLEdBQUcsbUJBQW1CLENBQUM7WUFDakMsaUJBQVksR0FBRyxhQUFhLENBQUM7WUFDN0IscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLFVBQUssR0FBRztnQkFDSixTQUFTLEVBQUUsSUFBSTtnQkFDZixpQkFBaUIsRUFBRSxHQUFHO2dCQUN0QixhQUFhLEVBQUUsR0FBRztnQkFDbEIsYUFBYSxFQUFFLEdBQUc7Z0JBQ2xCLFFBQVEsRUFBRSxHQUFHO2dCQUNiLFFBQVEsRUFBRSxHQUFHO2FBQ2hCLENBQUM7WUFFRixTQUFJLEdBQUcsVUFBQyxNQUFzQixFQUFFLFFBQWtDLEVBQUUsTUFBMkIsRUFBRSxLQUFZO2dCQUN6RyxJQUFJLEtBQUssR0FBd0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNyQyxZQUFZLEdBQStCLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDbkQsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQy9CLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQ3ZELFVBQTBDLENBQUM7Z0JBRS9DLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUVyQyxLQUFLLENBQUMsTUFBTSxHQUFHO29CQUNYLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDO29CQUNqRSx3REFBd0Q7b0JBQ3hELFlBQVksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsa0NBQWtDO29CQUNuRSxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBRXZCLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO2dCQUVGLFFBQVEsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFFM0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7b0JBQ25CLElBQUksT0FBTyxHQUFHLFVBQVUsRUFBRSxDQUFDO29CQUMzQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUM5QixLQUFLLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7Z0JBQ2pELENBQUMsQ0FBQyxDQUFDO2dCQUVILHFCQUFxQixPQUFnQjtvQkFDakMsWUFBWSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3BELENBQUM7Z0JBRUQsS0FBSyxDQUFDLGFBQWEsR0FBRztvQkFDbEIsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUM7Z0JBRUYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUM7b0JBQ3hCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFbkIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLFVBQVUsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDNUUsTUFBTSxDQUFDO2dCQUNYLENBQUM7Z0JBRUQsVUFBVSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ2pGLENBQUMsQ0FBQztZQUVGLGVBQVUsR0FBRyxVQUFDLE1BQXNCLEVBQUUsUUFBa0MsRUFBRSxNQUEyQixFQUFFLEtBQTBCLEVBQUUsWUFBd0M7Z0JBQ3ZLLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQy9CLFFBQWtDLEVBQ2xDLE1BQWdDLEVBQ2hDLE1BQWdDLEVBQ2hDLFlBQXNDLEVBQ3RDLFNBQVMsQ0FBQztnQkFFZCxxQkFBcUIsT0FBZ0I7b0JBQ2pDLFlBQVksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQUVELElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQztvQkFDdEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixDQUFDLENBQUM7Z0JBRUYsMkJBQTJCLFVBQVU7b0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQ2IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQ2hDLEtBQUssQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFDNUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFDakMsS0FBSyxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO29CQUMvQyxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsSUFBSSxtQkFBbUIsR0FBRztvQkFDdEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO3dCQUNULE1BQU0sQ0FBQztvQkFFWCxRQUFRLEdBQUcsS0FBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN2RSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUV2QixNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO29CQUVsRCxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFVBQUEsQ0FBQzt3QkFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDckIsTUFBTSxDQUFDO3dCQUVYLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO3dCQUV2QixZQUFZLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUN6QyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxDQUFDO29CQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxDQUFDO3dCQUMxQixLQUFJLENBQUMsUUFBUSxDQUFDOzRCQUNWLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUN6QixRQUFRLENBQUMsV0FBVyxDQUFDLDJCQUEyQixDQUFDLENBQUM7NEJBRWxELElBQUksS0FBSyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUM7NEJBRXJDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2dDQUMvQixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsNEJBQTRCLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUM7Z0NBQzdFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFFdkIsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7NEJBQ3hCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDcEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNaLENBQUMsQ0FBQyxDQUFDO29CQUVILE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQztnQkFFRixRQUFRLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFO29CQUMzQixtQkFBbUIsRUFBRSxDQUFDO29CQUN0QixRQUFRLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUM7b0JBQy9DLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUVwQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFeEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7b0JBQ25CLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUN2QixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBRWhCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsWUFBWSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQztvQkFDbkMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFDLENBQUMsQ0FBQyxDQUFDO2dCQUVILE1BQU0sQ0FBQyxjQUFNLE9BQUEsUUFBUSxFQUFSLENBQVEsQ0FBQztZQUMxQixDQUFDLENBQUM7WUFFRixnQkFBVyxHQUFHLFVBQUMsTUFBc0IsRUFBRSxRQUFrQyxFQUFFLE1BQTJCLEVBQUUsS0FBMEIsRUFBRSxZQUF3QztnQkFDeEssSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFDL0IsT0FBaUMsQ0FBQztnQkFFdEMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFBLENBQUM7b0JBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEIsTUFBTSxDQUFDO29CQUVYLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN4QixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsVUFBQSxDQUFDO29CQUM1QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixNQUFNLENBQUM7b0JBRVgsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBRXZCLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDeEMsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQy9DLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsb0NBQW9DLEVBQUUsVUFBQSxDQUFDO29CQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7d0JBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBRWhCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzt3QkFDeEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNoQixNQUFNLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUNuQixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ2hCLE1BQU0sQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxDQUFDO29CQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQ25CLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDaEIsTUFBTSxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLENBQUM7b0JBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUM3RCxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ2YsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7d0JBQ3hCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDaEIsTUFBTSxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLENBQUM7b0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRTtvQkFDM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUNSLE1BQU0sQ0FBQztvQkFFWCxPQUFPLEdBQUcsS0FBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN0RSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUV0QixJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQzt3QkFDcEIsTUFBTSxFQUFFLFFBQVE7d0JBQ2hCLGdCQUFnQixFQUFFLGFBQWE7d0JBQy9CLE9BQU8sRUFBRSxPQUFPO3dCQUNoQixVQUFVLEVBQUUsVUFBVTt3QkFDdEIsV0FBVyxFQUFFLFdBQVc7d0JBQ3hCLFlBQVksRUFBRSxPQUFPO3dCQUNyQixXQUFXLEVBQUUsQ0FBQztnQ0FDVixFQUFFLEVBQUUsUUFBUTtnQ0FDWixVQUFVLEVBQUUsVUFBVTtnQ0FDdEIsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDOzZCQUMxQyxDQUFDO3FCQUNMLENBQUMsQ0FBQztvQkFFSCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2xCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLENBQUM7Z0JBRUgscUJBQXFCLE9BQWdCO29CQUNqQyxZQUFZLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDcEQsQ0FBQztnQkFFRCxJQUFJLFNBQVMsQ0FBQztnQkFFZCxLQUFLLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsQ0FBZTtvQkFDeEMsSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQWlCLENBQUM7b0JBQ25DLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hELEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNLENBQUM7b0JBQ1gsQ0FBQztvQkFFRCxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDeEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNwQixDQUFDLENBQUMsQ0FBQztnQkFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFO29CQUMxQixvREFBb0Q7b0JBQ3BELFNBQVMsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDO3dCQUN0QixJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDO3dCQUVyQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs0QkFDL0IsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDOzRCQUM3RSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBRXZCLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO3dCQUN4QixLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzt3QkFDbkIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNwQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ1osQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxDQUFDLGNBQU0sT0FBQSxPQUFPLEVBQVAsQ0FBTyxDQUFDO1lBQ3pCLENBQUMsQ0FBQztRQXZRRSxDQUFDO1FBeVFMLDJDQUFjLEdBQWQsVUFBZSxDQUFDO1lBQ1osQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxxQ0FBUSxHQUFSLFVBQVMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBRUQsb0NBQU8sR0FBUCxVQUFRLENBQUM7WUFDTCxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUVELGtDQUFLLEdBQUwsVUFBTSxDQUFDO1lBQ0gsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFRCxvQ0FBTyxHQUFQLFVBQVEsQ0FBQztZQUNMLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBRUQsc0NBQVMsR0FBVCxVQUFVLENBQUM7WUFDUCxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUVELHlDQUFZLEdBQVosVUFBYSxDQUFDO1lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNoQixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvSCxDQUFDO1FBRUQsa0RBQXFCLEdBQXJCLFVBQXNCLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQTBCO1lBQ3RFLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBUSxNQUFNLENBQUMsZUFBZSxDQUFHLEVBQ3ZGLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQ3hDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2hHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUVELDBDQUFhLEdBQWIsVUFBYyxLQUFxQixFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUk7WUFDakUsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsOENBQXdDLElBQUksV0FBUSxFQUNoSCxRQUFRLEdBQUcsd0RBQ3VCLElBQUksc29CQU9rQixJQUFJLCtHQUkzRCxFQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBelVNLDBCQUFPLEdBQUcsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQTBVdEYseUJBQUM7S0FBQSxBQTNVRCxJQTJVQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQzdFLENBQUMsRUFyY00sc0JBQXNCLEtBQXRCLHNCQUFzQixRQXFjNUIiLCJzb3VyY2VzQ29udGVudCI6WyJkZWNsYXJlIHZhciBUZXRoZXI6IGFueTtcclxuXHJcbkFuZ3VsYXIubW9kdWxlKFwibmdUeXBlYWhlYWRcIiwgW10pOyIsIm1vZHVsZSBBbmd1bGFyVHlwZWFoZWFkTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBNb2JpbGVDb25maWcge1xyXG4gICAgICAgIHN0YXRpYyBpc01vYmlsZSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvd1tcIm9wZXJhXCJdO1xyXG4gICAgICAgICAgICB2YXIgdGVzdDEgPSAvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2kudGVzdChhZ2VudCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWdlbnRQcmVmaXggPSBhZ2VudC5zdWJzdHIoMCwgNCk7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0MiA9IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYWdlbnRQcmVmaXgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRlc3QxIHx8IHRlc3QyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nVHlwZWFoZWFkXCIpLmNvbnN0YW50KCdpc01vYmlsZScsIE1vYmlsZUNvbmZpZy5pc01vYmlsZSgpKTtcclxufSIsIm1vZHVsZSBBbmd1bGFyVHlwZWFoZWFkTW9kdWxlIHtcclxuXHJcbiAgICBjbGFzcyBUeXBlYWhlYWRDb250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFsnJHRpbWVvdXQnLCAnJHEnLCAnaXNNb2JpbGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkdGltZW91dCwgcHJpdmF0ZSAkcTogYW5ndWxhci5JUVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZElkeCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLl9pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hEZWxheSA9IDE1MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uU2VhcmNoO1xyXG4gICAgICAgIHRpY2tldDtcclxuICAgICAgICBzZWFyY2hEZWxheTogbnVtYmVyO1xyXG4gICAgICAgIHJlc3VsdHM7XHJcbiAgICAgICAgc2VsZWN0ZWRJZHg6IG51bWJlcjtcclxuICAgICAgICBfdHlwZWFoZWFkOiBhbnk7XHJcbiAgICAgICAgdHlwZWFoZWFkVGV4dDtcclxuICAgICAgICBuZ01vZGVsO1xyXG4gICAgICAgIHVwZGF0ZTtcclxuICAgICAgICByZXNldFZhbGlkaXR5O1xyXG4gICAgICAgIG9uU2VsZWN0OiBhbnk7XHJcbiAgICAgICAgdHlwZWFoZWFkTmFtZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBzZXQgdHlwZWFoZWFkKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHlwZWFoZWFkID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc2V0VmFsaWRpdHkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0VmFsaWRpdHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB0eXBlYWhlYWQoKTogYW55IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGVhaGVhZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2lzVmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgZ2V0IGlzVmlzaWJsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzVmlzaWJsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBpc1Zpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5faXNWaXNpYmxlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxTZWFyY2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbmNlbFNlYXJjaCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGlja2V0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0LmNhbmNlbCh0aGlzLnRpY2tldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3RQcmV2KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZElkeCA+IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSWR4LS07XHJcbiAgICAgICAgICAgIGVsc2UgdGhpcy5zZWxlY3RlZElkeCA9IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZWN0TmV4dCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJZHggPCB0aGlzLnJlc3VsdHMubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJZHgrKztcclxuICAgICAgICAgICAgZWxzZSB0aGlzLnNlbGVjdGVkSWR4ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdCgkaW5kZXg/KSB7XHJcbiAgICAgICAgICAgIGlmICgkaW5kZXggIT0gbnVsbCkgLy8gc2luZ2xlIGVxdWFsaXR5ICg9KSB0byBzbmFnIHVuZGVmaW5lZCBhbHNvXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSWR4ID0gJGluZGV4O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZElkeCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnJlc3VsdHNbdGhpcy5zZWxlY3RlZElkeF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJZHggPSAtMTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMudHlwZWFoZWFkICE9IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3Qoe3ZhbHVlOnRoaXMudHlwZWFoZWFkfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1NlbGVjdGVkKCRpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZElkeCA9PT0gJGluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGFzU2VsZWN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZElkeCA+IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VhcmNoKHRleHQpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVyID0gdGhpcy4kcS5kZWZlcjxhbnk+KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbFNlYXJjaCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRleHQgPT0gbnVsbCB8fCB0ZXh0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpY2tldCA9IHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLm9uU2VhcmNoKHsgdGV4dDogdGV4dCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXByb21pc2UudGhlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IHByb21pc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4ocmVzdWx0cyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0cztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9LCB0aGlzLnNlYXJjaERlbGF5KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBUeXBlYWhlYWREaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckY29tcGlsZScsICckdGVtcGxhdGVDYWNoZScsICckcGFyc2UnLCAnJHRpbWVvdXQnLCAnaXNNb2JpbGUnXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIHByaXZhdGUgJGNvbXBpbGU6IGFuZ3VsYXIuSUNvbXBpbGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlICR0ZW1wbGF0ZUNhY2hlOiBhbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkcGFyc2U6IGFuZ3VsYXIuSVBhcnNlU2VydmljZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW5ndWxhci5JVGltZW91dFNlcnZpY2UsXHJcbiAgICAgICAgICAgIHByaXZhdGUgaXNNb2JpbGU6IGJvb2xlYW5cclxuICAgICAgICApIHsgfVxyXG5cclxuICAgICAgICByZXN0cmljdCA9ICdBJztcclxuICAgICAgICByZXF1aXJlID0gWyd0eXBlYWhlYWQnLCAnbmdNb2RlbCddO1xyXG4gICAgICAgIGNvbnRyb2xsZXIgPSBUeXBlYWhlYWRDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICd0eXBlYWhlYWRWbSc7XHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUgPSB7XHJcbiAgICAgICAgICAgIHR5cGVhaGVhZDogJz0/JyxcclxuICAgICAgICAgICAgdHlwZWFoZWFkVGVtcGxhdGU6ICdAJyxcclxuICAgICAgICAgICAgdHlwZWFoZWFkVGV4dDogJ0AnLFxyXG4gICAgICAgICAgICB0eXBlYWhlYWROYW1lOiAnQCcsXHJcbiAgICAgICAgICAgIG9uU2VhcmNoOiAnJicsXHJcbiAgICAgICAgICAgIG9uU2VsZWN0OiAnJidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZTogYW5ndWxhci5JU2NvcGUsICRlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksICRhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcywgY3RybHM6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciAkY3RybDogVHlwZWFoZWFkQ29udHJvbGxlciA9IGN0cmxzWzBdLFxyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlciA9IGN0cmxzWzFdLFxyXG4gICAgICAgICAgICAgICAgJGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgIGdldFRleHRGcm9tTW9kZWwgPSB0aGlzLiRwYXJzZSgkYXR0cnNbJ3R5cGVhaGVhZFRleHQnXSksXHJcbiAgICAgICAgICAgICAgICBnZXRDb250ZW50OiAoKSA9PiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnk7XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5hdHRyKFwiYXV0b2NvbXBsZXRlXCIsIFwib2ZmXCIpO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwudXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZ2V0VGV4dEZyb21Nb2RlbCgkY3RybC50eXBlYWhlYWQpIHx8ICRjdHJsLnR5cGVhaGVhZDtcclxuICAgICAgICAgICAgICAgIC8vICRuZ01vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHZhbHVlKTsgLy8gZG9udCBkbyB0aGlzLi4uXHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSA9IHZhbHVlOyAvLyBkbyB0aGlzLCBiZWNhdXNlIG9mIG5nLWRpc2FibGVkXHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFZhbGlkaXR5KHRydWUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ3R5cGVhaGVhZC1wbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGdldENvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50KSBjb250ZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgJGJvZHkub2ZmKFwia2V5dXAudHlwZWFoZWFkIGNsaWNrLnR5cGVhaGVhZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRWYWxpZGl0eShpc1ZhbGlkOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHNldFZhbGlkaXR5KCd0eXBlYWhlYWQnLCBpc1ZhbGlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGN0cmwucmVzZXRWYWxpZGl0eSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldFZhbGlkaXR5KHRydWUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKCRjdHJsLnR5cGVhaGVhZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgJGN0cmwudXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgZ2V0Q29udGVudCA9IHRoaXMubGlua01vYmlsZSgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsLCAkbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRDb250ZW50ID0gdGhpcy5saW5rRGVza3RvcCgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsLCAkbmdNb2RlbEN0cmwpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmtNb2JpbGUgPSAoJHNjb3BlOiBhbmd1bGFyLklTY29wZSwgJGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgJGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLCAkY3RybDogVHlwZWFoZWFkQ29udHJvbGxlciwgJG5nTW9kZWxDdHJsOiBhbmd1bGFyLklOZ01vZGVsQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgJGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKSxcclxuICAgICAgICAgICAgICAgICRjb250ZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICAgICAgICAgICAgICAkaW5wdXQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSxcclxuICAgICAgICAgICAgICAgICRjbG9zZTogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LFxyXG4gICAgICAgICAgICAgICAgJHBsYWNlaG9sZGVyOiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksXHJcbiAgICAgICAgICAgICAgICBibHVyVGltZXI7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRWYWxpZGl0eShpc1ZhbGlkOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHNldFZhbGlkaXR5KCd0eXBlYWhlYWQnLCBpc1ZhbGlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGZyZWV6ZVZwID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHN0b3BCb2R5U2Nyb2xsaW5nKHN0b3BTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdG9wU2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkub24oXCJ0b3VjaG1vdmVcIiwgZnJlZXplVnApO1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5LmFkZENsYXNzKFwidHlwZWFoZWFkLW1vYmlsZS1ib2R5XCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkYm9keS5vZmYoXCJ0b3VjaG1vdmVcIiwgZnJlZXplVnApO1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5LnJlbW92ZUNsYXNzKFwidHlwZWFoZWFkLW1vYmlsZS1ib2R5XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5zdXJlQ29udGVudEV4aXN0cyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgkY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJGNvbnRlbnQgPSB0aGlzLmNyZWF0ZUNvbnRlbnRGcm9tQXR0cigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjdHJsKTtcclxuICAgICAgICAgICAgICAgICRib2R5LmFwcGVuZCgkY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGlucHV0ID0gJGNvbnRlbnQuZmluZChcIi50eXBlYWhlYWQtbW9iaWxlLWlucHV0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dC5vbigna2V5dXAudHlwZWFoZWFkJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb250cm9sS2V5KGUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdGVkSWR4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwudHlwZWFoZWFkID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUoJGlucHV0LnZhbCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkaW5wdXQub24oJ2JsdXIudHlwZWFoZWFkJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcEJvZHlTY3JvbGxpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY29udGVudC5yZW1vdmVDbGFzcygndHlwZWFoZWFkLW1vYmlsZS1kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gJG5nTW9kZWxDdHJsLiRtb2RlbFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgIXZhbHVlLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbGlkaXR5KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgkYXR0cnNbJ3R5cGVhaGVhZFNlbGVjdGlvblJlcXVpcmVkJ10gIT0gbnVsbCAmJiAkY3RybC50eXBlYWhlYWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbGlkaXR5KGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRjbG9zZSA9ICRjb250ZW50LmZpbmQoXCIudHlwZWFoZWFkLW1vYmlsZS1jbG9zZVwiKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdmb2N1cy50eXBlYWhlYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbnN1cmVDb250ZW50RXhpc3RzKCk7XHJcbiAgICAgICAgICAgICAgICAkY29udGVudC5hZGRDbGFzcygndHlwZWFoZWFkLW1vYmlsZS1kcm9wZG93bicpO1xyXG4gICAgICAgICAgICAgICAgJGlucHV0LnZhbCgkbmdNb2RlbEN0cmwuJHZpZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3RvcEJvZHlTY3JvbGxpbmcodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGN0cmwucmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkaW5wdXQuZm9jdXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkbmdNb2RlbEN0cmwuJHZpZXdDaGFuZ2VMaXN0ZW5lcnMucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC5zZWFyY2goJG5nTW9kZWxDdHJsLiR2aWV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiAkY29udGVudDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rRGVza3RvcCA9ICgkc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCAkZWxlbWVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5LCAkYXR0cnM6IGFuZ3VsYXIuSUF0dHJpYnV0ZXMsICRjdHJsOiBUeXBlYWhlYWRDb250cm9sbGVyLCAkbmdNb2RlbEN0cmw6IGFuZ3VsYXIuSU5nTW9kZWxDb250cm9sbGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogYW5ndWxhci5JQXVnbWVudGVkSlF1ZXJ5O1xyXG5cclxuICAgICAgICAgICAgJGJvZHkub24oXCJrZXl1cC50eXBlYWhlYWRcIiwgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNFc2NhcGUoZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICRjdHJsLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdrZXl1cC50eXBlYWhlYWQnLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29udHJvbEtleShlKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2VsZWN0ZWRJZHggPSAtMTtcclxuICAgICAgICAgICAgICAgICRjdHJsLnR5cGVhaGVhZCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgJGN0cmwuc2VhcmNoKCRuZ01vZGVsQ3RybC4kbW9kZWxWYWx1ZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gJGN0cmwucmVzdWx0cy5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2tleWRvd24udHlwZWFoZWFkIGNoYW5nZS50eXBlYWhlYWQnLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghJGN0cmwuaXNWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRXNjYXBlKGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzS2V5VXAoZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3RQcmV2KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnREZWZhdWx0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzS2V5RG93bihlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdHJsLnNlbGVjdE5leHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLmlzRW50ZXIoZSkgfHwgdGhpcy5pc1RhYihlKSkgJiYgJGN0cmwuaGFzU2VsZWN0aW9uKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudERlZmF1bHQoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2ZvY3VzLnR5cGVhaGVhZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5jcmVhdGVDb250ZW50RnJvbUF0dHIoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY3RybCk7XHJcbiAgICAgICAgICAgICAgICAkYm9keS5hcHBlbmQoY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRldGhlciA9IG5ldyBUZXRoZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogJGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QXR0YWNobWVudDogJ2JvdHRvbSBsZWZ0JyxcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6ICd0b3AgbGVmdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NQcmVmaXg6ICd0eXBlYWhlYWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldE9mZnNldDogJzZweCAwJyxcclxuICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50czogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG86ICd3aW5kb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50OiAndG9nZXRoZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaW46IFsndG9wJywgJ2xlZnQnLCAnYm90dG9tJywgJ3JpZ2h0J11cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGV0aGVyLnBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0VmFsaWRpdHkoaXNWYWxpZDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgJG5nTW9kZWxDdHJsLiRzZXRWYWxpZGl0eSgndHlwZWFoZWFkJywgaXNWYWxpZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBibHVyVGltZXI7XHJcblxyXG4gICAgICAgICAgICAkYm9keS5vbihcImNsaWNrLnR5cGVhaGVhZFwiLCAoZTogSlF1ZXJ5LkV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgaWYgKCRlbGVtZW50LmlzKHRhcmdldCkgfHwgIWNvbnRlbnQgfHwgY29udGVudC5pcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dC5jYW5jZWwoYmx1clRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJGN0cmwuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ2JsdXIudHlwZWFoZWFkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gQWxsb3cgYW55IGNsaWNrIG9uIHRoZSBtZW51IHRvIGNvbWUgdGhyb3VnaCBmaXJzdFxyXG4gICAgICAgICAgICAgICAgYmx1clRpbWVyID0gdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gJG5nTW9kZWxDdHJsLiRtb2RlbFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAhdmFsdWUubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWxpZGl0eSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgkYXR0cnNbJ3R5cGVhaGVhZFNlbGVjdGlvblJlcXVpcmVkJ10gIT0gbnVsbCAmJiAkY3RybC50eXBlYWhlYWQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFsaWRpdHkoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAkY3RybC5yZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gY29udGVudDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNFc2NhcGUoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS53aGljaCA9PT0gMjc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0VudGVyKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUud2hpY2ggPT09IDk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1RhYihlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlLndoaWNoID09PSAxMztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzS2V5VXAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS53aGljaCA9PT0gMzg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0tleURvd24oZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZS53aGljaCA9PT0gNDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc0NvbnRyb2xLZXkoZSkge1xyXG4gICAgICAgICAgICB2YXIgayA9IGUud2hpY2g7XHJcbiAgICAgICAgICAgIHJldHVybiBrID09PSA5IHx8IGsgPT09IDEzIHx8IChrID49IDE2ICYmIGsgPD0gMjApIHx8IGsgPT09IDI3IHx8IChrID49IDMzICYmIGsgPD0gNDApIHx8IGsgPT09IDQ1IHx8IChrID49IDkxICYmIGsgPD0gOTMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ29udGVudEZyb21BdHRyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmw6IFR5cGVhaGVhZENvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW1UZXh0ID0gJGF0dHJzWyd0eXBlYWhlYWRUZXh0J10gPT0gbnVsbCA/IFwiaXRlbVwiIDogYGl0ZW0uJHskYXR0cnNbJ3R5cGVhaGVhZFRleHQnXX1gLFxyXG4gICAgICAgICAgICAgICAgbmFtZSA9ICRjdHJsLnR5cGVhaGVhZE5hbWUgfHwgJHNjb3BlLiRpZCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmNyZWF0ZUNvbnRlbnQoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzWyd0eXBlYWhlYWRUZW1wbGF0ZSddLCBuYW1lLCBpdGVtVGV4dCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ29udGVudChzY29wZTogYW5ndWxhci5JU2NvcGUsIGVsZW1lbnQsIHRlbXBsYXRlVXJsLCBuYW1lLCB0ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBodG1sID0gdGVtcGxhdGVVcmwgPyB0aGlzLiR0ZW1wbGF0ZUNhY2hlLmdldCh0ZW1wbGF0ZVVybCkgOiBgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInR5cGVhaGVhZC1saW5rXCI+e3ske3RleHR9fX08L2E+YCxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR5cGVhaGVhZCB0eXBlYWhlYWQtJHtuYW1lfVwiIG5nLWNsYXNzPVwieyd0eXBlYWhlYWQtLWhpZGRlbic6IXR5cGVhaGVhZFZtLmlzVmlzaWJsZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHlwZWFoZWFkLW1vYmlsZS10b3BcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwidHlwZWFoZWFkLW1vYmlsZS1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCI+PGkgY2xhc3M9XCJ0eXBlYWhlYWQtbW9iaWxlLWNsb3NlXCI+JnRpbWVzOzwvaT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHlwZWFoZWFkLW1vYmlsZS1ib3R0b21cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwidHlwZWFoZWFkLW1lbnVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInR5cGVhaGVhZC1pdGVtXCIgbmctcmVwZWF0PVwiaXRlbSBpbiB0eXBlYWhlYWRWbS5yZXN1bHRzXCIgbmctY2xhc3M9XCJ7J3R5cGVhaGVhZC1pdGVtLS1zZWxlY3RlZCc6IHR5cGVhaGVhZFZtLmlzU2VsZWN0ZWQoJGluZGV4KX1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNsaWNrPVwidHlwZWFoZWFkVm0uc2VsZWN0KCRpbmRleClcIj4ke2h0bWx9PC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgYCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLiRjb21waWxlKGNvbnRlbnQpKHNjb3BlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdUeXBlYWhlYWRcIikuZGlyZWN0aXZlKCd0eXBlYWhlYWQnLCBUeXBlYWhlYWREaXJlY3RpdmUpO1xyXG59Il19