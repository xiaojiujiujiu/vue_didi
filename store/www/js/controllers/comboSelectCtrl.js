/**
 * Created by Administrator on 2017/7/12.
 */
angular.module('starter.controllers', [])
  .controller('comboSelectCtrl', function($scope, $state, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,$stateParams,$ionicPlatform,$location,customerHost,Util) {
    $scope.comboList = {
      carModelId:'',//车型id
      carSeriesId:'',//车系id
      jobType:'',//工单类别编号
      pageNo:1,//当前页码
      pageSize:5,//一页数据量
      servicePackageKeyWord:'',//套餐搜索关键词
      clientSide:''
    };
    $scope.selected = [];//存储选择的
    $scope.repairs = [];//列表结合
    $scope.isItem = '';//控制二级菜单显示隐藏
    //$scope.comboList.carModelId = $stateParams['carModelId'];
    //$scope.comboList.carSeriesId = $stateParams['carSeriesId'];
    //$scope.comboList.jobType = $stateParams['jobType'];
    $scope.comboList.carModelId = '1310301521004762';
    $scope.comboList.carSeriesId = '298';
    $scope.comboList.jobType = 5;

    $scope.publicVlass = function (btn) {
      if (btn == 'btn1') { $scope.isAct = 'btn1'; $scope.repairs = []; $scope.comboList.pageNo = 1; }
      if (btn == 'btn2') { $scope.isAct = 'btn2'; $scope.repairs = []; $scope.comboList.pageNo = 1; }
      if (btn == 'btn3') { $scope.isAct = 'btn3'; $scope.repairs = []; $scope.comboList.pageNo = 1; }
    };
    $scope.getCombo = function (btn) {
      $scope.publicVlass(btn);
    };
    if ($location.$$search.btn != null || $location.$$search.btn != '') {
      $scope.publicVlass($location.$$search.btn);
    }

    var linshi = '';
    $scope.setMeal = function(val){
      if(linshi == val){
        $scope.isItem = '';
      }else{
        $scope.isItem = val;
        linshi = val;
      }
    };

    //全选取值
    var updateSelected = function (action, name) {
      if (action == 'add' && $scope.selected.indexOf(name) == -1) {
        $scope.selected.push(name);
      }
      if (action == 'remove' && $scope.selected.indexOf(name) != -1) {
        var idx = $scope.selected.indexOf(name);
        $scope.selected.splice(idx, 1);
      }
    };
    $scope.isSelected = function(name){
      return $scope.selected.indexOf(name)>=0;
    };
    $scope.updateSelection = function($event, name){
      var checkbox = $event.target;
      var action = (checkbox.checked?'add':'remove');
      updateSelected(action,name);
    };

    //加载数据分页
    $scope.repairs = [];
    $scope.isLoad = true;
    $scope.loadMore = function () {
      HttpService.post($scope.comboList, customerHost+'api/newPlant/create/choseDiServicePackage.api').then(function(result){
        if (result.data.list == 0) {
          $scope.isLoad = false;
          $scope.repairCar = true;
        } else {
          $scope.isLoad = true;
          $scope.repairCar = false;
          $scope.repairs = $scope.repairs.concat(result.data.list ? result.data.list : '');
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.comboList.pageNo = ++result.data.curPageNo;
        }
        console.log(result);
      });
    };
    $scope.goBack = function(){
      $state.go('billing')
    }

  });
