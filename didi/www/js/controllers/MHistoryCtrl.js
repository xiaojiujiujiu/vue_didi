angular.module('starter.controllers', [])
  .controller('MHistoryCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate, customerHost, $timeout, $stateParams ) {
    var sendParam = {
      pageNo: 1,
      pageSize: 5
    }

    if($stateParams.flag == "1"){
      sendParam.carVin = $stateParams.carVin;
      var listUrl = customerHost + 'api/didi/historyServiceList.api';
    }else if($stateParams.flag == "2"){
      sendParam.didiKeyWord = $stateParams.carVin;
      var listUrl = customerHost + 'api/didi/serchHistoryServiceList.api';
    }
    // $scope.goBack = function(){
    //   $state.go('M_historySearch',{carLicense:$scope.MHistoryResult.carLicense});
    // };
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
    // $scope.goBack = function(){
    //   $state.go('M_historySearch',{carLicense:$stateParams.carVin})
    // };
  });
