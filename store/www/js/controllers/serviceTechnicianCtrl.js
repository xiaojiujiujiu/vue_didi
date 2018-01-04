angular.module('starter.controllers', [])
  .controller('serviceTechnicianCtrl', function($scope, $state, HttpService, customerHost, $timeout, $stateParams, Util, $ionicHistory ) {
    $scope.selectedCheckbox = [];
    
    $scope.sendParam = {
      orderId: $stateParams.orderId,
      projectId: $stateParams.projectId
    }
    HttpService.post($scope.sendParam, customerHost + 'api/newPlant/chose/choseWorkerDispatch.api').then(function(result){
      $scope.result = result;
    });
    $scope.confirm = function(){
      var itemList = $scope.result.data.list; 
        if(localStorage.technician == undefined || localStorage.technician == "[]"){
          var technician = [{
            projectId: $stateParams.projectId,
            user: []
          }];
          for (var i = 0; i < itemList.length; i ++){
            for (var j = 0; j < itemList[i].list.length; j ++){
              if(itemList[i].list[j].userChecked){
                technician[0].user.push(itemList[i].list[j]);
              }
            }
          }
        }else{
          var technician = JSON.parse(localStorage.technician);
          var users = [];
          for (var i = 0; i < itemList.length; i ++){
            for (var j = 0; j < itemList[i].list.length; j ++){
              if(itemList[i].list[j].userChecked){
                users.push(itemList[i].list[j])
              }
            }
          }
          for(var t = 0; t < technician.length; t++){
            if(technician[t].projectId == $stateParams.projectId){
              technician.splice(t,1);
            }
          }
          technician.push({
            projectId: $stateParams.projectId,
            user: users
          })
          
        }
        technician = JSON.stringify(technician);
        localStorage.technician = technician;
        $ionicHistory.goBack();
      }
      
      $scope.fuzzyQuery = function(searchTxt){
        $scope.sendParam.userNameKeyWord = searchTxt;
        HttpService.post($scope.sendParam, customerHost + 'api/newPlant/chose/choseWorkerDispatch.api').then(function(result){
          console.log(result)
          $scope.result = result;
        });
      }
    
    
    
    
  });
