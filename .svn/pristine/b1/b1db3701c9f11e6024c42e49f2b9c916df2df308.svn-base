angular.module('starter.controllers', [])
  .controller('orderDetailCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,$window, customerHost, $timeout, $stateParams, Util ) {
    var sendParam = {
      orderId: $stateParams.id
    };

    HttpService.post(sendParam, customerHost + 'api/newPlant/show/repairOrderDetail.api').then(function(result){
      // console.log(result)
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
      $scope.dataDetail = result.data;
    });


    $scope.goBack = function(){
      $state.go('orderList',{searchStatus: 100})
    };

    //提交审核
    $scope.audit = function(orderId){
      HttpService.post({orderId:orderId}, customerHost+'api/newPlant/submit/submitToFirstCheck.api').then(function(result){
        // console.log(result);
        if(result.status.code=='0000'){
            Util.showAlert('提示','提交成功',function(){
              $state.go('orderList',{searchStatus: 120})
            })
        }
      })
    };
    //提交总检
    $scope.submitToSecondCheck = function(orderId){
      HttpService.post({orderId:orderId}, customerHost+'api/newPlant/submit/submitToSecondCheck.api').then(function(result){
        // console.log(result);
        if(result.status.code=='0000'){
            Util.showAlert('提示','提交成功',function(){
              $state.go('orderList')
            })
        }
      })
    };
    // 完工
    $scope.finished = function(orderId){
      HttpService.post({orderId:orderId}, customerHost+'api/newPlant/submit/submitWorkOver.api').then(function(result){
        if(result.status.code=='0000'){
            Util.showAlert('提示','操作成功',function(){
              $state.go('orderList')
            })
        }
      });
    }
    // 撤回
    $scope.withdraw = function(status,orderId){
      var requestUrl;
      switch(status){
        case '002':
          requestUrl = 'api/newPlant/waitDiDiConfirmCancel.api';
          break;
        case '003':
          requestUrl = 'api/newPlant/cancelToReCreate.api';
          break;
        case '007':
          requestUrl = 'api/newPlant/confirmToReDispatch.api';
          break;
        case '008':
          requestUrl = 'api/newPlant/exceptionToReDispatch.api';
          break;
      };
      HttpService.post({orderId:orderId}, customerHost + requestUrl).then(function(result){
        if(result.status.code=='0000'){
          console.log(result);
          Util.showAlert('提示','撤回成功',function(){
            $state.go('orderList')
          })
        }
      });
    };
    // 修改
    $scope.alter = function(orderId){
      $state.go('editOrder', {
        getWork: {
          orderId: orderId,
          type: 0
        }
      })
    }
    $scope.PriceDetails = false;
    $scope.PriceDetailsClassName = 'icon ion-arrow-down-b';
    $scope.showPriceDetails = function(){
      $scope.PriceDetails = !$scope.PriceDetails;
      $scope.PriceDetails ? $scope.PriceDetailsClassName = 'icon ion-arrow-up-b' : $scope.PriceDetailsClassName = 'icon ion-arrow-down-b';
    }
    $scope.callPhone = function (mobilePhone) {
      $window.location.href = "tel:" + mobilePhone;
    };
  });
