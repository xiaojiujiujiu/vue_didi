
angular.module('starter.controllers', [])
  .controller('indexCtrl', function($scope, $state, HttpService,customerHost,Util) {

    //跳转链接
    if (window.cordova && window.cordova.InAppBrowser) {
        window.ref = cordova.InAppBrowser.open;
    } else {
        window.ref = function (url, type, option) {
            window.open(url, "_blank")
        }
    }
    $scope.goBack = function(){
      window.localStorage.removeItem('loginInfo');
      $state.go('login');
    };
    $scope.loginInfo = JSON.parse(window.localStorage.getItem('loginInfo'));
    HttpService.post({}, customerHost+'api/newPlant/index.api').then(function(result){
      // console.log(result)
      $scope.indexNum = result.data;
       /*
       * 检查更新
       **/
      // 简单的 GET 请求，可以改为 POST
      var ua = navigator.userAgent.toLowerCase();
       if(localStorage.versionNum == undefined){
          localStorage.versionNum = $scope.indexNum.versionNum;
        }else if(localStorage.versionNum != $scope.indexNum.versionNum){
          Util.showConfirm('版本信息', '发现新版本,点击确认下载最新版本!', function () {
            localStorage.versionNum = $scope.indexNum.versionNum;
            if (/iphone|ipad|ipod/.test(ua)) {
              window.ref('http://app.autozi.com/servlet/appqrcode.do?platformType=ios&appType=didiStore','_system', '');
            } else if (/android/.test(ua)) {
              window.ref('http://app.autozi.com/servlet/appqrcode.do?platformType=android&appType=didiStore','_system', '');
            }
          }, function () {
            return;
          })
        }


    });
    $scope.toTab = function(page){
    	$state.go('tab.' + page)
    };
    $scope.searchStatus = '';
    $scope.goOrder = function(num){
      $scope.searchStatus = num;
      $state.go('orderList',{searchStatus:$scope.searchStatus})
    }
    $scope.hrefList = function(status){
      $state.go('orderList',{searchStatus: status})
    }


  });
