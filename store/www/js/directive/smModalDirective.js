
angular.module('autozi.directive', [])
    .directive('smModal', ['smModal', function (smModal) {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                modalId: '@',//id
                typeSet: '@', //内容排版位置
                title: '@',
                confirm: '@',
                close: '@',
                tyClose : '=tyClose',
                closeLogo: '=closeLogo',
                showSubmit: '=',
                classIfy :'=',
                closeArr: '&',

            },
            template: '<div class="sm-modal" id="{{modalId}}">' +
            '<div class="sm-modal-bg" ng-click="smClose($event)"></div>' +
            '<div class="sm-modal-content">' +
            '<div class="sm-modal-header"><i class="positive onbank" ng-click="smBack($event)" ng-if="tyClose" ng-class="typeSet==\'left\'?\'header-right\':\'header-left\'"><span class="modelClose ion-ios-arrow-left"></span></i><i class="positive onbank"  ng-show="!tyClose" ng-class="typeSet==\'left\'?\'header-right\':\'header-left\'"><span class="modelClose ion-ios-close-empty"></span></i><span>{{title}}</span><i ng-if="showSubmit" class="positive btnok" ng-class="typeSet==\'left\'?\'header-left\':\'header-right\'" >确定</i></div>' +
            '<div ng-transclude class="sm-model-ion-content"></div></div></div>',
            link: function (scope, ele, attr) {
              /*console.log("aa:"+(scope.tyClose==undefined));
              console.log(scope.classIfy);*/
                var headerBar = document.getElementsByTagName('ion-header-bar')[0],
                    footerBar = document.querySelector('.tab-nav');
                ele.css('height', window.screen.height + 'px');
                if (ele[0].querySelector('.itemList') && ele[0].querySelector(".itemList") != null) {
                    (ele[0].querySelector('.itemList')).style.height = (window.screen.height - 72) + 'px';
                }
                scope.smConfirm = function () {
                    if (scope.confirm != '') {
                        scope.$parent.$eval(scope.confirm);
                    } else {
                        smModal.hide('#' + scope.modalId);
                    }

                };

                var $header = ele[0].querySelector('.sm-modal-header');
                //var closeBtn = $header.children[0];

                var closeBtn = ele[0].querySelector('.onbank');
                closeBtn.addEventListener('touchend', function (e) {
                    e.preventDefault();
                    //e.stopPropagation();
                    scope.smClose();
                });
                var confirm$watch = scope.$watch('showSubmit', function (newval) {
                    if (newval) {
                        // confirm$watch();
                        var confirmBtn = ele[0].querySelector('.btnok');
                        confirmBtn.addEventListener('touchend', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            scope.smConfirm();
                        });
                    }
                });
              //默认关闭事件
              scope.smClose = function () {
                    if(scope.closeLogo){
                      scope.$parent.$eval(scope.close);
                      scope.closeLogo = false;
                      scope.tyClose = false;
                    }else{
                      smModal.hide('#' + scope.modalId);
                      scope.$parent.$eval(scope.close);
                    }
              };
              //车系选择关闭事件
              scope.smBack = function () {
                    scope.$parent.$eval(scope.close);
                    scope.closeLogo = false;
                    scope.tyClose = false;
              }
            }
        }
    }]);
