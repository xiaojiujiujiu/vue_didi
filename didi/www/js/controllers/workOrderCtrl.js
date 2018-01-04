
angular.module('starter.controllers', [])
  .controller('workOrderCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,$stateParams,$ionicViewSwitcher,customerHost,Util) {
    $scope.workOrderList = {};
    HttpService.post({carLicense:$stateParams.carLicense}, customerHost+'api/didi/ddHistoryOrderList.api').then(function(result){
      console.log(result);
      $scope.workOrderList = result.data;
    });
    $scope.goBack = function(){
      $state.go('M_historySearch',{carLicense:$stateParams.carLicense})
    };
  });
