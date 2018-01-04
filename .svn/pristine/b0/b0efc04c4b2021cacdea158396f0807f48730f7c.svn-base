angular.module('starter.controllers', [])
  .controller('MHistoryCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate, customerHost, $timeout, $stateParams,$ionicHistory ) {
    var sendParam = {
      pageNo: 1,
      pageSize: 5
    }

    sendParam.carLicense = $stateParams.carVin;
    var listUrl = customerHost + 'api/newPlant/list/listSingleRepairHistory.api';

    $scope.repairs = [];
    $scope.isLoad = true;
    $scope.loadMore = function () {
      HttpService.post(sendParam, listUrl).then(function(result){

        $scope.MHistoryResult = result.data;
        if (result.data.list == 0) {
          $scope.isLoad = false;
          $scope.repairCar = true;
        } else {
          $scope.isLoad = true;
          $scope.repairCar = false;
          $scope.repairs = $scope.repairs.concat(result.data.list ? result.data.list : '');
          $scope.$broadcast('scroll.infiniteScrollComplete');
          sendParam.pageNo ++;
        }
      });
    };
    $scope.comeAgain = function(orderId){
      $state.go('billing', {
        getWork: {
          orderId: orderId,
          type: 1
        }
      })
    }
    $scope.goBack = function(){
      //$ionicHistory.goBack();
      $state.go('tab.receiving',{seachVal:$stateParams.carVin});
    }
  });
