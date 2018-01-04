/**
 * Created by Administrator on 2017/5/25.
 */
angular.module('starter.controllers', [])
  .controller('orderDetailCtrl', function($scope, $state, HttpService,$window, $ionicSlideBoxDelegate,$ionicPopup, $ionicTabsDelegate,$stateParams,customerHost,Util,$ionicHistory) {
    $scope.flag = $stateParams.flag;
    $scope.orderList = {
      orderId:'',
    };
    $scope.orderBase = {};
    $scope.imageList = [];
    $scope.goodsList = [];
    $scope.projectList = [];

    $scope.orderList.orderId = $stateParams['orderId'];
    HttpService.post($scope.orderList, customerHost+'api/didi/detailRepairForConfirms.api').then(function(result){
     // console.log(result);
      if(result.status.code=='0000'){
        $scope.orderBase = result.data.orderBase;
        $scope.projectList = result.data.projectList;
        $scope.goodsList = result.data.goodsList;
        $scope.imageList = result.data.imageList;
      }
    });
    if($scope.flag == '1'){
      $scope.requsetUrl = 'api/didi/passConfirms1.api'
    }else{
      $scope.requsetUrl = 'api/didi/passConfirms2.api'
    }
    $scope.confirm = function(orderId){
      HttpService.post({
        orderId: orderId
      }, customerHost + $scope.requsetUrl).then(function(result){
        if(result.status.code=='0000'){
          Util.showAlert('提示', '审核通过！', function(){
            $ionicHistory.goBack(-2);
          });
        }
      })
    };
    $scope.callPhone = function (mobilePhone) {
      //console.log("拨打:" + mobilePhone);
      $window.location.href = "tel:" + mobilePhone;
    };

    $scope.projectEvent = function(serviceProjectId){
      HttpService.post({
        repairOrderId: $scope.orderBase.orderId,
        serviceProjectId: serviceProjectId
      }, customerHost+'api/didi/ checkServiceProject.api').then(function(result){
        $scope.projectSuggest = {
          name                  : result.data.name,
          realKilometer         : result.data.realKilometer,
          adviceKilometer       : result.data.adviceKilometer,
          isAdviceMaintenanceCN : result.data.isAdviceMaintenanceCN,
          isSuperMaintenanceCN  : result.data.isSuperMaintenanceCN,
          lastServiceTime       : result.data.lastServiceTime,
          lastServiceMileage    : result.data.lastServiceMileage,
          mileage               : result.data.mileage,
          hasServiceRule        : result.data.hasServiceRule,
          hasServiceHistory     : result.data.hasServiceHistory
        }

      });
      // console.log($scope.projectSuggest)
      var myPopup = $ionicPopup.show({
         template: '<div ng-if="projectSuggest.hasServiceRule == 1">'+
                       '<p>服务项目名称：{{projectSuggest.name}}</p>'+
                       '<p>建议里程：{{projectSuggest.adviceKilometer}}</p>'+
                       '<p ng-if="projectSuggest.hasServiceHistory==1">上次服务时间：{{projectSuggest.lastServiceTime}}</p>'+
                       '<p ng-if="projectSuggest.hasServiceHistory!=1">上次服务时间：/ </p>'+
                       '<p ng-if="projectSuggest.hasServiceHistory==1">上次服务里程：{{projectSuggest.lastServiceMileage}}</p>'+
                       '<p ng-if="projectSuggest.hasServiceHistory!=1">上次服务里程：/ </p>'+
                       '<p>本次服务里程：{{projectSuggest.mileage}}</p>'+
                       '<p ng-if="projectSuggest.hasServiceHistory==1">实际间隔里程：{{projectSuggest.realKilometer}}</p>'+
                       '<p ng-if="projectSuggest.hasServiceHistory!=1">实际间隔里程：/ </p>'+
                       '<p>建议保养：{{projectSuggest.isAdviceMaintenanceCN}}</p>'+
                       '<p>是否超保：{{projectSuggest.isSuperMaintenanceCN}}</p>'+
                   '</div>'+
                   '<div ng-if="projectSuggest.hasServiceHistory == 1 && projectSuggest.hasServiceRule != 1">'+
                      '<p>服务项目名称：{{projectSuggest.name}}</p>'+
                      '<p>上次服务时间：{{projectSuggest.lastServiceTime}}</p>'+
                      '<p>上次服务里程：{{projectSuggest.lastServiceMileage}}</p>'+
                      '<p>本次服务里程：{{projectSuggest.mileage}}</p>'+
                      '<p>实际间隔里程：{{projectSuggest.realKilometer}}</p>'+
                    '</div>'+
                    '<div ng-if="projectSuggest.hasServiceHistory != 1 && projectSuggest.hasServiceRule != 1">'+
                      '<p style="text-align: center; padding-top: 20px;">暂时没有服务历史数据!</p>'+
                    '</div>',
         title: '审核参考',
         scope: $scope,
         buttons: [
           { text: '确定' }
         ]
       });
      //

    }

  });
