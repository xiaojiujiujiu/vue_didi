angular.module('starter.controllers', [])
  .controller('sendWorkCtrl', function($scope, $state, HttpService, customerHost, $timeout, $stateParams, $ionicPopover,Util) {
    
    $scope.sendWorkTxt = '派工>'
    $scope.sendParam = {
      orderId: $stateParams.orderId,
      code: $stateParams.code,
      carLicense: $stateParams.carLicense,
      technician: ''
    }
    HttpService.post($scope.sendParam, customerHost + 'api/newPlant/submit/repairOrderDispatch.api').then(function(result){
      $scope.result = result;
      if(localStorage.technician && localStorage.technician != []){
        var technician = JSON.parse(localStorage.technician);
        for(var i = 0; i < $scope.result.data.list.length; i ++){
          for(var y = 0; y < technician.length; y ++){
            var projectUserName = '';
            var projectUserId = '';
            for(var j = 0; j < technician[y].user.length; j ++){
              projectUserName += technician[y].user[j].userName + ',';
              projectUserId += technician[y].user[j].useId + ','
            }
            projectUserName = projectUserName.slice(0, projectUserName.length - 1);
            projectUserId = projectUserId.slice(0, projectUserId.length - 1);
            if(technician[y].projectId == 0){
              $scope.result.data.list[i].RepairOrderProjectUserNameStr = projectUserName;
              $scope.result.data.list[i].RepairOrderProjectUserIdStr = projectUserId;
            }
            if(technician[y].projectId == $scope.result.data.list[i].projectId){
              $scope.result.data.list[i].RepairOrderProjectUserNameStr = projectUserName;
              $scope.result.data.list[i].RepairOrderProjectUserIdStr = projectUserId;
            }
          }
          
        }
      }
    });
    // 一键派工
    $scope.oneKeySendWork = function(projectId){
      $state.go('service_technician', {orderId: $stateParams.orderId, projectId: projectId})
    }
    // 派工保存
    
    $scope.sendWork = function(){
      for(var i = 0; i < $scope.result.data.list.length; i ++){
        if( $scope.result.data.list[i].RepairOrderProjectUserIdStr == ''){
          Util.showAlert('提示', '请为所有项目选择技师后完成派工！');
          return;
        }
      }
      var repairProject = JSON.stringify($scope.result.data.list);
      repairProject = BASE64.encoder(repairProject);
      HttpService.post({
        orderId: $stateParams.orderId,
        repairProject: repairProject
      }, customerHost + 'api/newPlant/save/saveRepairOrderDispatch.api').then(function(data){
        // console.log(data);
        localStorage.removeItem('technician');
        // console.log(localStorage)
        if(data.status.code == "0000"){
          Util.showAlert('提示', '派工完成！', function(){
            $state.go('orderList',{searchStatus:150});
          })
        }
      });
    }
    /*var template = '<ion-popover-view><ion-header-bar> <h1 class="title">选择技师</h1> </ion-header-bar> <ion-content style="background: #fff">'+
     
      
    '<div class="review_list marginTop0 paddingTop0">'+
      '<div class="service_list" ng-repeat="list in popResult.data.list">'+
        '<p class="department">{{list.departmentName}}</p>'+
       '<ion-checkbox ng-repeat="item in list.list"'+
                    'ng-checked="">'+
        '{{ item.userName }}</ion-checkbox>'+
        
        
     '</div></ion-content></ion-popover-view>';*/
    
    // .fromTemplateUrl() 方法
    /*$scope.popover = $ionicPopover.fromTemplate(template, {
      scope: $scope
    });
    $scope.openPopover = function($event, projectId) {
      $scope.projectId = projectId;
      $scope.popover.show($event);
      HttpService.post({
        orderId: $scope.sendParam.orderId,
        projectId: projectId
      }, customerHost + 'api/newPlant/chose/choseWorkerDispatch.api').then(function(popResult){
        $scope.popResult = popResult;
      
      });
    };*/
   /* 
    var sendTechnicianParam = {
      orderId : $stateParams.id,
      repairProject: []
    }
    var repairProjects = {}
    $scope.serverSideChange = function(item,list){
      repairProjects = {
        projectId: $scope.projectId,
        userId: item.useId,
        departmentId: list.departmentId
      };
    }
    
    $scope.closePopover = function() {
      $scope.popover.hide();
    };*/
    // 清除浮动框
   /* $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });*/
    // 在隐藏浮动框后执行
   /* $scope.$on('popover.hidden', function() {
      if(sendTechnicianParam.repairProject.length > 0){
        // console.log(sendTechnicianParam.repairProject)
        var flag = true;
        for(var i = 0; i < sendTechnicianParam.repairProject.length; i++){
          if(sendTechnicianParam.repairProject[i].projectId == repairProjects.projectId){
            // console.log(sendTechnicianParam.repairProject[i])
            sendTechnicianParam.repairProject.splice(i, 1, repairProjects);
            flag = false;
            break;
          }
        }
        if(flag){
          sendTechnicianParam.repairProject.push(repairProjects)
        }
        
      }else{
        sendTechnicianParam.repairProject.push(repairProjects)
      }
    });*/
    
    // 移除浮动框后执行
   /* $scope.$on('popover.removed', function() {
      // 执行代码
    });*/
    /*
    $scope.sendWork = function(){
      if(sendTechnicianParam.repairProject.length == $scope.result.data.list.length){
        sendTechnicianParam.repairProject = JSON.stringify(sendTechnicianParam.repairProject);
        sendTechnicianParam.repairProject = BASE64.encoder(sendTechnicianParam.repairProject)
        // console.log(sendTechnicianParam)
        HttpService.post(sendTechnicianParam, customerHost + 'api/newPlant/save/saveRepairOrderDispatch.api').then(function(data){
          console.log(data);
          if(data.status.code == "0000"){
            Util.showAlert('提示', '派工完成！', function(){
              $state.go('order_list');
            })
          }
        });
      }else{
        Util.showAlert('提示', '去选择技师！');
      }
    }
    // checkbox 事件
    $scope.checkboxChange = function(text){
      console.log(text)
    }*/
  });
