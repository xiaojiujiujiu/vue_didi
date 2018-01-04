
angular.module('starter.controllers', [])
  .controller('myselfCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,$window,customerHost,Util) {
    $scope.dropOut = function(){
      window.localStorage.removeItem('loginInfo');
      $state.go('login');
    };
    ///api/newPlant/getMyInfo.api
    HttpService.post({}, customerHost+'api/newPlant/getMyInfo.api').then(function(result){
      // console.log(result)
      $scope.result = result.data;
    });
    $scope.callPhone = function (mobilePhone) {
      console.log("拨打:" + mobilePhone);
      $window.location.href = "tel:" + mobilePhone;
    };
    $scope.versionNum = localStorage.versionNum;
  });
