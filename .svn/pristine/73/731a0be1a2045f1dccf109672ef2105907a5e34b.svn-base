angular.module('starter.controllers', [])
  .controller('loginCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,customerHost,Util) {
    $scope.isShow = false;
    $scope.isShowText = '';
    $scope.loginInfo = {
        loginName: "",
        password: "",
        token : '',
        timeCheckValue:'',
        userName : ''
    };

    $scope.login = function () {
      HttpService.post($scope.loginInfo, customerHost+'api/didi/login.api').then(function(result){
        if(result.status.code=='0000'){
          // console.log(result);
          $scope.loginInfo.token = result.data.token;
          $scope.loginInfo.userName = result.data.userName;
          $scope.loginInfo.tokenCheckValue = hex_md5(result.data.token + hex_md5('time@qeegoo.com'));
          // console.log($scope.loginInfo.tokenCheckValue);
          $scope.setLoginInfo($scope.loginInfo);
          $state.go('index');
        }else{
          $scope.isShowText = result.status.msg;
          $scope.isShow = true;
        }
      });

    };
    $scope.setLoginInfo = function(){
      var expiresDate = new Date();
      expiresDate.setMonth(expiresDate.getMonth() + 1);
      if (window.localStorage) {
        if (window.localStorage.getItem('loginInfo')) {
          window.localStorage.removeItem('loginInfo');
        }
        window.localStorage.setItem('loginInfo', JSON.stringify($scope.loginInfo));
      } else {
        alert('不支持本地存储！');
      }
    }


  });
