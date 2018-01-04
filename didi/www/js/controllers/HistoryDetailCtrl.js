
angular.module('starter.controllers', [])
  .controller('HistoryDetailCtrl', function($scope, $state,$window, HttpService, customerHost, $stateParams) {
    console.log($stateParams)
    if($stateParams.type == '1'){
      $scope.title = '工单详情'
    }else{
      $scope.title = '维保历史详情'
    }
    var sendParam = {
      pageNo: 1,
      pageSize: 5,
      orderId: $stateParams.id
    }
    HttpService.post(sendParam, customerHost + 'api/didi/detailRepairForHistory.api').then(function(result){
      $scope.dataDetail = result.data;
      console.log($scope.dataDetail.orderBase)
      console.log(result)
      /*if (result.data.list == 0) {
        $scope.isLoad = false;
        $scope.repairCar = true;
      } else {
        $scope.isLoad = true;
        $scope.repairCar = false;
        $scope.repairs = $scope.repairs.concat(result.data.list ? result.data.list : '');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        sendParam.pageNo ++;
      }*/
    });
    $scope.callPhone = function (mobilePhone) {
      console.log("拨打:" + mobilePhone);
      $window.location.href = "tel:" + mobilePhone;
    };
  });
