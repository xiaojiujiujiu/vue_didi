/**
 * Created by Administrator on 2017/5/25.
 */
angular.module('starter.controllers', [])
  .controller('reviewCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,customerHost,Util,$stateParams) {

    $scope.reviewList = {
      pageNo:1,
      pageSize:5,
      didiKeyWord:'',
      searchStatus: $stateParams.searchStatus
    };

    /*搜索*/
    $scope.seachList = function(event){
      var keycode = event.keyCode;
      if(keycode=='13') {
        event.preventDefault();
        $scope.repairs = [];
        $scope.isLoad = true;
        $scope.reviewList.pageNo = '1';
        //HttpService.post($scope.reviewList, customerHost+'api/didi/listConfirms1.api').then(function(result){
        //  console.log(result);
        //  if (result.data.list == 0) {
        //    $scope.isLoad = false;
        //    $scope.repairCar = true;
        //  }else{
        //    $scope.repairs = result.data.list;
        //    $scope.reviewList.pageNo = ++$scope.reviewList.pageNo;
        //  }
        //})
        $scope.loadMore();
      }
    };
    $scope.confirm = function(orderId){
      HttpService.post({
        orderId: orderId
      }, customerHost+'api/didi/passConfirms1.api').then(function(result){
        if(result.status.code=='0000'){
          Util.showAlert('提示', '审核通过！', function(){
            $state.reload();
          });
        }
      })
    };


    var flag = false;
    $scope.repairs = [];
    $scope.isLoad = true;
    $scope.loadMore = function () {
      if(!flag){
        flag = true;
        HttpService.post($scope.reviewList, customerHost+'api/didi/listRepairOrder.api').then(function(result){
          flag = false;
          if (result.data.list == 0) {
            $scope.isLoad = false;
            $scope.repairCar = true;
          } else {
            $scope.isLoad = true;
            $scope.repairCar = false;
            $scope.repairs = $scope.repairs.concat(result.data.list ? result.data.list : '');
            console.log($scope.repairs);
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.reviewList.pageNo = ++result.data.curPageNo;
          }
        });
      }
    };
    $scope.$on('$stateChangeSuccess', function () {
      //alert('changeOk');
      //$scope.loadMore();
    });

  });
