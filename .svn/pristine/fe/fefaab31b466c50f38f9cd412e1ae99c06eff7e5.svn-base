
angular.module('starter.controllers', [])
  .controller('turnDownCtrl', function($scope, $state, HttpService,$stateParams, $ionicSlideBoxDelegate, $ionicTabsDelegate,customerHost,Util, $ionicHistory) {

    $scope.turnDownList = {
      orderId:'',
      code:'',
      carLicense:'',
      partyName:'',
      refuseNote:'',
      typeId:'',//根据跳转过来的页面返回状态
    };
    $scope.turnDownList.orderId = $stateParams['id'];
    $scope.turnDownList.code = $stateParams['code'];
    $scope.turnDownList.carLicense = $stateParams['carLicense'];
    $scope.turnDownList.createTime = $stateParams['partyName'];
    $scope.turnDownList.typeId = $stateParams['typeId'];
    console.log($scope.turnDownList.typeId);

    var loadUrl = 'api/didi/noPassConfirms1.api';
    if($stateParams.status == '2'){
      loadUrl = 'api/didi/noPassConfirms2.api';
    }
    $scope.saveTurn = function(){
      HttpService.post($scope.turnDownList, customerHost + loadUrl).then(function(result){
        // console.log();
        if(result.status.code=='0000'){
          Util.showAlert('提示', '驳回成功', function(){
            if($scope.turnDownList.typeId==001){
              $ionicHistory.goBack();
            }else{
              $ionicHistory.goBack(-2);
            }
          });
        }
      });
    };
    $scope.refuseNoteLen = $scope.turnDownList.refuseNote.length;
    $scope.strLength = function(){
      $scope.refuseNoteLen = $scope.turnDownList.refuseNote.length;
      if($scope.refuseNoteLen > 200){
        return false;
      }
    }
    document.getElementById('textArea').addEventListener('paste', function(){
      $scope.strLength();
    })


  });
