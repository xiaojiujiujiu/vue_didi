
angular.module('starter.controllers', [])
  .controller('MHistorySearchCtrl', function($scope, $state,$stateParams,Util,customerHost,HttpService) {
    $scope.searchTxt = {
      carLicense:''
    };
    $scope.searchHistoryList = false;
    var sendParam = {
      pageNo: 1,
      pageSize: 5
    };
    $scope.searchTxt.carLicense = $stateParams.carLicense;
    $scope.search = function(searchTxt){      //维保历史查询
      if(searchTxt == ''||searchTxt==null){
        Util.showAlert('提示', '请输入车牌')
      }else if(isVehicleNumber(searchTxt)){
        sendParam.didiKeyWord = searchTxt;
        HttpService.post(sendParam, customerHost+'api/didi/serchHistoryServiceList.api').then(function(result){
          if(result.status.code == "0000"){
            $state.go('M_history',{carVin: searchTxt, flag: "2"})
          }
        })
      }else{
        Util.showAlert('提示', '车牌格式错误')
      }
    };
    $scope.receivingSeach = function(){     //模糊查询
      HttpService.post($scope.searchTxt, customerHost+'api/didi/getCarLicenseList.api').then(function(result){
        if(result.data.length > 0){
          $scope.searchHistoryList = true;
          $scope.searchCarLicense = result.data;
        }
        console.log(result)
      })
    };
    $scope.receivingSeachVal = function(val){   //查询列表点击
      $scope.searchTxt.carLicense = val;
      $scope.searchHistoryList = false;
    };
    $scope.searchWork = function(searchTxt){   //导入工单详情
      if(searchTxt == ''||searchTxt==null){
        Util.showAlert('提示', '请输入车牌')
      }else if(isVehicleNumber(searchTxt)){
        $state.go('workOrder',{carLicense:searchTxt});
      }else{
        Util.showAlert('提示', '车牌格式错误')
      }
    };

    // 验证车牌
    function isVehicleNumber(vehicleNumber) {
      var result = false;
      if (vehicleNumber.length == 7){
        var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
        result = express.test(vehicleNumber);
      }
      return result;
    }

    $scope.goBack = function(){
      $state.go('index')
    };
  });
