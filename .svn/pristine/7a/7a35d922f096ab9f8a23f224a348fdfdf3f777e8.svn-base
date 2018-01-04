
angular.module('starter.controllers', [])
  .controller('workOrderCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,$stateParams,customerHost,Util) {
    $scope.workOrderList = {};
    console.log($stateParams.carLicense);
    HttpService.post({carLicense:$stateParams.carLicense}, customerHost+'api/newPlant/ddHistoryOrderList.api').then(function(result){
      console.log(result);
      $scope.workOrderList = result.data;
    });
    $scope.goBack = function(){
      $state.go('tab.receiving',{seachVal:$stateParams.carLicense})
    };
  });
