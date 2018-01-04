/**
 */
angular.module('autozi.directive', [])
    .directive('setStyle', function () {

        return {
            restrict: 'A',
            replace: true,
            scope: {
                baseh: '@',
                basew: '@',
                decreaseh: '@',
                decreasew: '@'
            },
            link: function (scope, element, attr) {
                var baseH = scope.baseh ? (parseInt(scope.baseh) > 0 ? scope.baseh : window.screen.availHeight) : window.screen.availHeight;
                var baseW = scope.basew ? (parseInt(scope.basew) > 0 ? scope.basew : window.screen.availHeight) : window.screen.availHeight;
                if (scope.decreaseh) {
                    element.attr('style', 'height:' + (baseH - scope.decreaseh) + 'px');
                }
                if (scope.decreasew) {
                    element.css('style', 'width:' + (baseW - scope.decreasew) + 'px');
                }

            }
        };
    });