/**
 * Created by Administrator on 2017/5/25.
 */
angular.module('starter.controllers', [])
  .controller('operationCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,$stateParams,customerHost,Util) {

    $scope.operationList = {
      orderId:'',
      code:'',
      carLicense:'',
      carModelName:'',
      statusName: ''
    };
    $scope.causeList = [];
    $scope.isAct = 1;
    $scope.operationList.orderId = $stateParams['orderId'];

    HttpService.post($scope.operationList, customerHost+'api/newPlant/logList.api').then(function(result){
      console.log(result);
      if(result.status.code=='0000'){
        $scope.operationList.orderId = result.data.orderId;
        $scope.operationList.code = result.data.code;
        $scope.operationList.carLicense = result.data.carLicense;
        $scope.operationList.carModelName = result.data.carModelName;
        $scope.operationList.statusName = result.data.statusName;
        $scope.causeList = result.data.list;
      }
    });

  });
