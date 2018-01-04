
angular.module('starter.controllers', [])
  .controller('indexCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,customerHost,Util) {
    $scope.goBack = function(){
      window.localStorage.removeItem('loginInfo');
      $state.go('login');
    };
    $scope.loginInfo = JSON.parse(window.localStorage.getItem('loginInfo'));
    HttpService.post({}, customerHost+'api/didi/index.api').then(function(result){
      $scope.indexNum = result.data;
      console.log(result)
      var ua = navigator.userAgent.toLowerCase();
       if(localStorage.versionNum == undefined){
          localStorage.versionNum = $scope.indexNum.versionNum;
        }else if(localStorage.versionNum != $scope.indexNum.versionNum){
          Util.showConfirm('版本信息', '发现新版本,点击确认下载最新版本!', function () {
            localStorage.versionNum = $scope.indexNum.versionNum;
            if (/iphone|ipad|ipod/.test(ua)) {
              window.ref('http://app.autozi.com/servlet/appqrcode.do?platformType=ios&appType=didi','_system', '');
            } else if (/android/.test(ua)) {
              window.ref('http://app.autozi.com/servlet/appqrcode.do?platformType=android&appType=didi','_system', '');
            }
          }, function () {
            return;
          })
        }
    });
    $scope.goOrder = function(num){
      $scope.searchStatus = num;
      $state.go('orderList',{searchStatus:$scope.searchStatus})
    }
  });
