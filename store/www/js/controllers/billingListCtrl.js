
angular.module('starter.controllers', [])
  .controller('billingListCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,$stateParams,customerHost,Util) {
    console.log();
    $scope.carPlate = {
      carLicense :'',
      jobType:'',
      jobTypeName:''
    };
    $scope.carPlateList = '';
    $scope.carPlate.carLicense = $stateParams['carPlate'];
    HttpService.post($scope.carPlate, customerHost+'api/newPlant/creat/choseJobType.api').then(function(result){
      if(result.status='0000'){
        console.log(result.data)
        $scope.carPlateList = result.data.jobTypeArray;
      }

    });
    $scope.addWorkOrder = function(jobType,jobTypeName){
      $scope.carPlate.jobType = jobType;
      $scope.carPlate.jobTypeName = jobTypeName;
      window.localStorage.setItem('notFin', true);
      $state.go('billing', { getWork: $scope.carPlate });
    };
    $scope.goBack = function(){
      $state.go('tab.receiving',{seachVal:$scope.carPlate.carLicense});
    };

  });
