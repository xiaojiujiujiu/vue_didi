
angular.module('starter.controllers', [])
  .controller('MHistorySearchCtrl', function($scope, $state,Util,customerHost,HttpService) {
    $scope.searchTxt = '';
    $scope.searchHistoryList = false;
    $scope.sendParam = {
      pageNo: 1,
      pageSize: 5
    }
    $scope.search = function(searchTxt){
      var _thatTxt = searchTxt;
      if($scope.searchTxt != ''){
        _thatTxt = $scope.searchTxt
      }
      // console.log($scope.searchTxt)
      if(_thatTxt == ''){
        Util.showAlert('提示', '请输入车牌');
        return;
      }else if(isVehicleNumber(_thatTxt)){
        $scope.sendParam.carLicense = _thatTxt;
        HttpService.post($scope.sendParam, customerHost+'api/newPlant/list/listSingleRepairHistory.api').then(function(result){
          if(result.status.code == "0000"){
            if(result.data.commonData != undefined){
              $state.go('M_history',{carVin: _thatTxt})
            }else{
              Util.showAlert('提示', '暂无该车辆信息')
            }
          }
        })
      }else{
        Util.showAlert('提示', '车牌格式错误')
      }
    }
    $scope.fuzzyQuery = function(txt){
      HttpService.post({carLicense: txt}, customerHost+'/api/newPlant/getCarLicenseList.api').then(function(result){
        if(result.data.length > 0){
          $scope.searchHistoryList = true;
          $scope.searchCarLicense = result.data;
        }
        console.log(result)
      })
    }
    
    $scope.searchCarLicenseEvent = function(carLicense){
      document.getElementById('searchTxt').value = carLicense;
      $scope.searchTxt = carLicense;
      $scope.searchHistoryList = false;
    }
    $scope.goBack = function(){
      $state.go('tab.index')
    }
    var content = document.getElementById('content');
    content.onclick = function(e){
      if(e.target.tagName == 'ION-CONTENT'){
        if($scope.searchHistoryList){
          $scope.searchHistoryList = false;
        }
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
