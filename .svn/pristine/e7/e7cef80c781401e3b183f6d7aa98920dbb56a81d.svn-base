/**
 * Created by Administrator on 2017/7/19.
 */

angular.module('starter.controllers', [])
  .controller('customerCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,$stateParams,$window,customerHost,Util) {
    $scope.customerList = {
      carLicense:'',//车牌
      carModelName:'',//车系
      userName:'',
      userPhone:'',
    };
    $scope.isConsume = null;
    $scope.customerList = $stateParams.customerData;
    console.log($stateParams.customerData);
    $scope.pageModol = {};

    window.localStorage.removeItem('notFin');
    HttpService.post($scope.customerList, customerHost+'api/newPlant/getCarDetail.api').then(function(result){
      if(result.status='0000'){
        console.log(result.data);
        if(result.data.hasCustomerRepairDetail){
          $scope.isConsume = true;
          $scope.pageModol = result.data;
        }else{
          $scope.isConsume = false;
        }
      }
    });
    $scope.callPhone = function (mobilePhone) {
      $window.location.href = "tel:" + mobilePhone;
    };


  });

