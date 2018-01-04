angular.module('starter.controllers', [])
  .controller('loginCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,customerHost,Util) {
    $scope.loginInfo = {
        loginName: "",
        password: "",
        token : '',
        timeCheckValue:''
    };
    $scope.loginCheckBox = false;

    $scope.loginDel = false;
    $scope.passwordDel = false;

    $scope.login = function () {

      HttpService.post($scope.loginInfo, customerHost+'api/newPlant/login.api').then(function(result){
        if(result.status.code=='0000'){
          $scope.loginInfo.token = result.data.token;
          $scope.loginInfo.tokenCheckValue = hex_md5(result.data.token + hex_md5('time@qeegoo.com'));
          $scope.setLoginInfo($scope.loginInfo);
          saveUserInfo();
          $state.go('tab.index');
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
    // checkbox 点击事件
    $scope.savebtn = function(){
      $scope.loginCheckBox ? $scope.loginCheckBox = false : $scope.loginCheckBox = true;
    }
    // 保存用户名密码
    function saveUserInfo(){
      var savePassword = [];
      if($scope.loginCheckBox){
        if(localStorage.saveUser != undefined){
          var user = JSON.parse(localStorage.saveUser);
          var saveFlag = true;
          for( var i = 0; i < user.length; i++ ){
            if($scope.loginInfo.loginName == user[i].userName){
              saveFlag = false;
            }
          }
          if(saveFlag){
            user.push({userName: $scope.loginInfo.loginName, password: $scope.loginInfo.password});
            localStorage.setItem('saveUser', JSON.stringify(user));
          }
        }else{
          savePassword.push({userName: $scope.loginInfo.loginName, password: $scope.loginInfo.password});
          localStorage.setItem('saveUser', JSON.stringify(savePassword));
        }
      }
    }
    // 根据输入用户名匹配密码
    $scope.match = function(){
      $scope.loginDelStatus();
      $scope.passwordDelStatus();
      if(localStorage.saveUser != undefined){
        var user = JSON.parse(localStorage.saveUser);
        for( var i = 0; i < user.length; i++ ){
          var saveFlag = false;
          if($scope.loginInfo.loginName == user[i].userName){
            $scope.loginInfo.password = user[i].password;
            saveFlag = true;
            break;
          }
          if(!saveFlag){
            $scope.loginInfo.password = '';
          }
        }
      }
    }
    $scope.loginDelStatus = function (){
      if($scope.loginInfo.loginName != ''){
        $scope.loginDel = true;
      }
      if($scope.loginInfo.loginName == undefined){
        $scope.loginDel = false;
      }
    }
    $scope.passwordDelStatus = function(){
      if($scope.loginInfo.password != ''){
        $scope.passwordDel = true;
      }
      if($scope.loginInfo.password == undefined){
        $scope.passwordDel = false;
      }
    }
    $scope.delUsername = function(e){
      $scope.loginInfo.loginName = '';
      $scope.loginDel = false;
    }
    $scope.delPassword = function(){
      $scope.loginInfo.password = '';
      $scope.passwordDel = false;
    }
    // if()
  });
