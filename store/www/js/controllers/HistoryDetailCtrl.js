
angular.module('starter.controllers', [])
  .controller('HistoryDetailCtrl', function($scope, $state,$window, HttpService, customerHost, $stateParams) {
    console.log($stateParams)
    var sendParam = {
      pageNo: 1,
      pageSize: 5,
      orderId: $stateParams.id
    }
    HttpService.post(sendParam, customerHost + 'api/newPlant/show/repairHistoryDetail.api').then(function(result){
      $scope.dataDetail = result.data;
      $scope.projectPrice = 0;
      $scope.goodsPrice = 0;
      if(result.data.goodsList.length > 0){
        for(var i = 0; i < result.data.goodsList.length; i ++ ){
          $scope.goodsPrice += parseFloat(result.data.goodsList[i].totalMoney);
        }
        $scope.goodsPrice = new Number($scope.goodsPrice).toFixed(2)
      }else{
        $scope.goodsPrice = 0;
      }
      if(result.data.projectList.length > 0){
        for(var i = 0; i < result.data.projectList.length; i ++ ){
          $scope.projectPrice += parseFloat(result.data.projectList[i].projectUnitTotalMoney);
        }
        $scope.projectPrice = new Number($scope.projectPrice).toFixed(2)
      }else{
        $scope.projectPrice = 0;
      }
     /* console.log($scope.dataDetail.orderBase)
      console.log(result)*/
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
    
    $scope.PriceDetails = false;
    $scope.PriceDetailsClassName = 'icon ion-arrow-down-b';
    $scope.showPriceDetails = function(){
      $scope.PriceDetails = !$scope.PriceDetails;
      $scope.PriceDetails ? $scope.PriceDetailsClassName = 'icon ion-arrow-up-b' : $scope.PriceDetailsClassName = 'icon ion-arrow-down-b';
    }
    
  });
