angular.module('starter.controllers', [])
  .controller('orderListCtrl', function($scope, orderListServices, $state,$ionicSlideBoxDelegate, $ionicTabsDelegate,HttpService,customerHost,Util,$stateParams) {
    var tabItemActive = document.getElementById('tab_wrap').getElementsByTagName('li');
    var items = orderListServices.getClassify();
    $scope.slides = items;
    // console.log($scope.slides)
    $scope.tabs = items;
    $scope.searchStatus = true;
    var slideIndex = 0;
    $scope.reviewList = {
      searchStatus:'',
      pageNo: 1,
      pageSize: 5,
      orderId:'',
      didiOrderKeyWord:''
    };
    if($stateParams.searchStatus != ''){
      $scope.reviewList.searchStatus = $stateParams.searchStatus;
    }
    // console.log($stateParams)
    function initParam(){
      $scope.reviewList.pageNo=1;
      $scope.repairs = [];
      $scope.isLoad = true;
      $scope.loadMore();
    }

    $scope.slideChanged = function (index,state) {
      document.querySelector('.active').removeAttribute('class')
      tabItemActive[index].setAttribute('class', 'active');
      $ionicTabsDelegate.select(index);
      $scope.reviewList.searchStatus = $scope.tabs[index].searchstatus;
      initParam();

    };
    $scope.$on('$ionicView.afterEnter', function () {
      // console.log($stateParams)
      if($stateParams.searchStatus != ''){
        switch($stateParams.searchStatus){
          case 100:
            tabItemActive[0].setAttribute('class', 'active');
            $ionicSlideBoxDelegate.slide(0);
            $state.go('orderList');
            break;
          case 110:
            tabItemActive[1].setAttribute('class', 'active');
            $ionicSlideBoxDelegate.slide(1);
            $state.go('orderList');
            break;
          case 120:
            tabItemActive[2].setAttribute('class', 'active');
            $ionicSlideBoxDelegate.slide(2);
            $state.go('orderList');
            break;
          case 130:
            tabItemActive[3].setAttribute('class', 'active');
            $ionicSlideBoxDelegate.slide(3);
            break;
          case 140:
            tabItemActive[4].setAttribute('class', 'active');
            $ionicSlideBoxDelegate.slide(4);
            break;
          case 150:
            tabItemActive[5].setAttribute('class', 'active');
            $ionicSlideBoxDelegate.slide(5);
            break;
          case 160:
            tabItemActive[6].setAttribute('class', 'active');
            $ionicSlideBoxDelegate.slide(6);
            break;
         /* case 160:
            tabItemActive[7].setAttribute('class', 'active');
            $ionicSlideBoxDelegate.slide(7);
            break;
          case 170:
            tabItemActive[8].setAttribute('class', 'active');
            $ionicSlideBoxDelegate.slide(8);
            break;*/
        }
      }else{
        tabItemActive[0].setAttribute('class', 'active');

      }
    });

    $scope.selectedTab = function (index,state) {
      document.querySelector('.active').removeAttribute('class')
      tabItemActive[index].setAttribute('class', 'active');
      //滑动的索引和速度
      $ionicSlideBoxDelegate.slide(index);
      $scope.reviewList.searchStatus = state;
      initParam();
    };
    var flag = false;
    $scope.repairs = [];
    $scope.isLoad = true;
    $scope.loadMore = function (search) {
      if(!flag){
        flag = true;
        HttpService.post($scope.reviewList, customerHost+'api/didi/listRepairOrder.api').then(function(result){
          // console.log(result)
          // console.log(result)
          /*if(result.data.statusCount.dispatchNum==0){
            document.getElementById('itemsNum2').style.display = 'none';
          }
          if(result.data.statusCount.workNum==0){
            document.getElementById('itemsNum3').style.display = 'none';
          }
          if(result.data.statusCount.check1Num==0){
            document.getElementById('itemsNum6').style.display = 'none';
          }
          if(result.data.statusCount.check2Num==0){
            document.getElementById('itemsNum7').style.display = 'none';
          }*/
          document.getElementById('itemsNum1').innerHTML = result.data.statusCount.createNum;
          document.getElementById('itemsNum2').innerHTML = result.data.statusCount.dispatchNum;
          document.getElementById('itemsNum3').innerHTML = result.data.statusCount.workNum;
          document.getElementById('itemsNum4').innerHTML = result.data.statusCount.overNum;
          document.getElementById('itemsNum5').innerHTML = result.data.statusCount.cancelNum;
          document.getElementById('itemsNum6').innerHTML = result.data.statusCount.exceptionNum;

          if(search){
            if(result.data.list.length == 0){
              $scope.searchStatus = false;
            }
          }else{
            $scope.searchStatus = true;
          }
          flag = false;
          if (result.data.list == 0) {
            $scope.isLoad = false;
            $scope.repairCar = true;
          } else {
            $scope.isLoad = true;
            $scope.repairCar = false;
            $scope.repairs = $scope.repairs.concat(result.data.list ? result.data.list : '');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.reviewList.pageNo = ++result.data.curPageNo;
          }
        });
      }
    };

    //提交审核
    $scope.audit = function(orderId){
      $scope.reviewList.orderId = orderId;
      HttpService.post($scope.reviewList, customerHost+'api/newPlant/submit/submitToFirstCheck.api').then(function(result){
        // console.log(result);
        if(result.status.code=='0000'){
            Util.showAlert('提示','提交成功',function(){
              initParam();
            })
        }
      })
    };
    //提交审核
    $scope.submitToSecondCheck = function(orderId){
      $scope.reviewList.orderId = orderId;
      HttpService.post($scope.reviewList, customerHost+'api/newPlant/submit/submitToSecondCheck.api').then(function(result){
        // console.log(result);
        if(result.status.code=='0000'){
            Util.showAlert('提示','提交成功',function(){
              initParam();
            })
        }
      })
    };
    //搜索
    $scope.seachList = function(event){
      // alert(111)
      var keycode = event.keyCode;
      if(keycode=='13') {
        event.preventDefault();
        $scope.reviewList.pageNo=1;
        $scope.repairs = [];
        $scope.isLoad = true;
        $scope.loadMore(1);
      }
    };
    // 完工
    $scope.finished = function(orderId){
      HttpService.post({orderId:orderId}, customerHost+'api/newPlant/submit/submitWorkOver.api').then(function(result){
        if(result.status.code=='0000'){
            Util.showAlert('提示','操作成功',function(){
              tabItemActive[4].setAttribute('class', 'active');
              $ionicSlideBoxDelegate.slide(4);
            })
        }
      });
    }
    // 删除
    $scope.deleteOrder = function(orderId){
      Util.showConfirm('提示','确认删除吗?',function(){
        HttpService.post({orderId:orderId}, customerHost+'api/newPlant/delete/deleteRepairOrder.api').then(function(result){
          if(result.status.code=='0000'){
            Util.showAlert('提示','删除成功',function(){
              initParam();
            })
          }
        });
      },function(){

      });

    };
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
        var alertMessage = '';
        if(result.status.code=='0000'){
          switch(status){
            case '002':
              alertMessage = '工单已成功撤回至已创建'
              break;
            case '003':
              alertMessage = '工单已成功撤回至已创建'
              break;
            case '007':
              alertMessage = '工单已成功撤回至待派工'
              break;
            case '008':
              alertMessage = '工单已成功撤回至待派工'
              break;
          };
          Util.showAlert('提示',alertMessage,function(){
            initParam();
          })
        }
      });
    }
    // 修改
    $scope.alter = function(orderId){
      $state.go('editOrder', {
        getWork: {
          orderId: orderId,
          type: 0
        }
      })
    }
    $scope.goBack = function(){
      $state.go('tab.index')
    }

  });
