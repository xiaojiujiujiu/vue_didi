
angular.module('starter.controllers', [])
  .controller('receivingCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,$stateParams,customerHost,Util) {
    $scope.searchHistoryList = false;
    $scope.carDetailsContent = false;
    $scope.searchTxt = {
      carLicense:''
    };
    $scope.searchTxt.carLicense = $stateParams.seachVal;
    $scope.receivingSeach = function(){
      HttpService.post($scope.searchTxt, customerHost+'api/newPlant/getCarLicenseList.api').then(function(result){
        if(result.data.length > 0){
          $scope.searchHistoryList = true;
          $scope.searchCarLicense = result.data;
        }
        console.log(result)
      })
    };
    $scope.receivingSeachVal = function(val){
      $scope.searchTxt.carLicense = val;
      $scope.searchHistoryList = false;
      HttpService.post($scope.searchTxt, customerHost+'api/newPlant/getOrderInfoByCarLicense.api').then(function(result){
        if(result.data.carLicense != undefined){
          $scope.carDetailsContent = true;
          $scope.carDetails = result.data;
        }else{
          $scope.carDetailsContent = false;
        }
      })

    }
    if($stateParams.seachVal){
      $scope.receivingSeachVal($stateParams.seachVal);
    }
    //开单操作
    $scope.billing = function(carLicense){
      if(carLicense == ''||carLicense==null){
        Util.showAlert('提示', '请输入车牌')
      }else if(isVehicleNumber(carLicense)){
        HttpService.post({carLicense:carLicense}, customerHost+'api/newPlant/check/checkCarLicense.api').then(function(result){
          if(result.status.code == '0000'){
            $state.go('billingList',{carPlate:carLicense});
          }
        })
      }else{
        Util.showAlert('提示', '车牌格式错误')
      }
    }
    var sendParam = {
      pageNo: 1,
      pageSize: 5
    }
    // 维保历史
    $scope.search = function(searchTxt){
      if(searchTxt == ''||searchTxt==null){
        Util.showAlert('提示', '请输入车牌')
      }else if(isVehicleNumber(searchTxt)){
        HttpService.post({carLicense:searchTxt}, customerHost+'api/newPlant/check/checkCarLicense.api').then(function(result){
          if(result.status.code == '0000'){
            $state.go('M_history',{carVin:searchTxt});
          }
        })
      }else{
        Util.showAlert('提示', '车牌格式错误')
      }

    }
    $scope.goWorkOrder = function(searchTxt){
      if(searchTxt == ''||searchTxt==null){
        Util.showAlert('提示', '请输入车牌')
      }else if(isVehicleNumber(searchTxt)){
        $state.go('workOrder',{carLicense:searchTxt});
      }else{
        Util.showAlert('提示', '车牌格式错误')
      }

    }

    // 验证车牌
    function isVehicleNumber(vehicleNumber) {
      var result = false;
      if (vehicleNumber.length == 7){
        var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
        result = express.test(vehicleNumber);
      }
      return result;
    }

  });
