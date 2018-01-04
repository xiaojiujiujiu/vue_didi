angular.module('starter.controllers', [])
  .controller('inspectionCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate, customerHost, $timeout, Util,$stateParams) {
    
    $scope.sendParam = {
      pageNo: 1,
      pageSize: 5,
      didiKeyWord:'',
      searchStatus: $stateParams.searchStatus
    }
    /*搜索*/
    $scope.seachList = function(event){
      var keycode = event.keyCode;
      if(keycode=='13') {
        event.preventDefault();
        $scope.sendParam.pageNo = 1;
        $scope.repairs = [];
        $scope.isLoad = true;
        $scope.loadMore();
      }
    };
    
    $scope.repairs = [];
    $scope.isLoad = true;
    var flag = false;
    $scope.loadMore = function () {
      if(!flag){
        flag = true;
        HttpService.post($scope.sendParam, customerHost+'api/didi/listRepairOrder.api').then(function(result){
          flag = false;
          if (result.data.list == 0) {
            $scope.isLoad = false;
            $scope.repairCar = true;
          } else {
            $scope.isLoad = true;
            $scope.repairCar = false;
            $scope.repairs = $scope.repairs.concat(result.data.list ? result.data.list : '');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.sendParam.pageNo ++;
          }
        })
      };
    };
    $scope.confirm = function(orderId){
      HttpService.post({
        orderId: orderId
      }, customerHost+'api/didi/passConfirms2.api').then(function(result){
        if(result.status.code=='0000'){
          Util.showAlert('提示', '审核通过！', function(){
            $state.reload();
          });
        }
      })
    }
  });
