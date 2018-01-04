/**
 * Created by Administrator on 2017/7/12.
 */

angular.module('starter.controllers', [])
  .controller('billingCtrl', function($scope,$rootScope, $state,$compile, HttpService, $ionicSlideBoxDelegate, $ionicTabsDelegate,$stateParams,$ionicPlatform,customerHost,smModal,Util,TakePhoto,$ionicHistory) {
    $scope.title = '接车登记';
    // 返回
    $scope.goBack = function(){
      Util.showConfirm('提示','返回将会清空工单内容，是否确认返回？', function(){
        $ionicHistory.goBack();
      }, function(){
        return;
      })
    }
    // 维修材料数量加减
    $scope.goodsNumAdd = function(index){
      //console.log(index)
      var _thisNum = document.getElementById('goodsNum'+index).value;
      _thisNum ++;
      $scope.materialTemporary[index].goodsNumber = _thisNum;
      $scope.addMaterialRental();
    }
    $scope.goodsNumLess = function(index){
      var _thisNum = document.getElementById('goodsNum'+index).value;
      if(_thisNum == 0){
        return;
      }
      _thisNum --;
     $scope.materialTemporary[index].goodsNumber = _thisNum;
     $scope.addMaterialRental();
    }

    /******************************/
    $scope.repairObj = {
      repairOrderStr : ''
    };
    $scope.repairOrderStr = {
      otherPrice:{},//附加费用
      projectList:[],//项目
      goodsList:[],//材料
      orderMessage:{},//
      sendParam:[],//保存图片的信息
      delNumber:'',//保存要删除的序号
    };
    $scope.orderMessage = {
      orderId:'',//
      reserveOrderId:'',//预约单ID
      carVin:'',//vin码
      vin:'',
      carEngine:'',//发动机号
      carLicense:'',//车牌号
      jobType:'',//工单类别编号
      jobTypeName:'',//工单类别名称
      deptArray:[],//服务顾问
      deptVal:'',//服务顾问名称
      serviceDepartmentId:'',//服務部門id
      serviceAdvisorUserId:'',//服务人员id
      repairTypeArray:[],//维修类别
      repairTypeVal:'',//维修类别名称
      repairType:'',//维修类别值
      sendPeopleName:'',//送修人姓名
      sendPeoplePhone:'',//送修人电话
      lastMaintenanceMileage:'',//上次保养里程
      lastMileage:'',//上次进场里程
      mileage:'',//进场里程
      carModel:'',//车型id
      userName:'',//客户名称
      userPhone:'',//客户电话
      userAddress:'',//客户地址
      carModelId:'',//车型id
      carColor:'',//车色
      carSeriesId:'',//车系id
      vinBindId:'',//vin
      insurerArray:[],//保险公司
      insurerName:'',//保险名称
      insurerId:'',//保险值
      pageNo:1,//当前页码
      pageSize:5,//一页数据量
      servicePackageKeyWord:'',//套餐搜索关键词
      projectKeyWord:'',//项目搜索关键词
      goodsKeyWord:'',//材料搜索关键词
      materialKeyWord:'',//材料2搜索关键词
      openGoodsKeyWord:'',//开放搜索关键词
      note : '请输入备注',
      predictFinishTime : ''
    };
    $scope.otherPrice = {
      towingFee:'',//拖车费
      agencyFee:'',//代办费
      testingFee:'',//检测费
      otherFee:'',//其他费
    };

    $scope.ItemSubtotal = 0; //项目小计
    $scope.materialSubtotal = 0; //材料小计
    $scope.btnDisabled = false;//保存按钮
    $scope.itemTitle = '选择套餐';
    $scope.isShowloadMore = false;//是否开始分页
    $scope.postDataUrl = 'api/newPlant/create/choseDiServicePackage.api';//是否开始分页
    //动态设置列表的高度
    $scope.gridHeight = { 'height': window.screen.height-200 + 'px' };
    $scope.baoHeight = { 'height': window.screen.height-130 + 'px' };
    $scope.repairs = [];
    $scope.repairsItem = [];
    $scope.repairsMaterial = [];
    $scope.repairsDispark = [];
    $scope.isLoad = true;
    $scope.seveComboBtn = false;//套餐保存按钮
    $scope.seveItemBtn = false;//项目保存按钮
    $scope.seveMaterialBtn = false;//材料保存按钮
    $scope.seveMaterialBtnTwo = false;//材料保存按钮
    $scope.seveMaterialBtnTwo = false;//材料保存按钮

    $scope.PriceDetails = false;
    $scope.PriceDetailsClassName = 'icon ion-arrow-down-b';
    $scope.showPriceDetails = function(){
      $scope.PriceDetails = !$scope.PriceDetails;
      $scope.PriceDetails ? $scope.PriceDetailsClassName = 'icon ion-arrow-up-b' : $scope.PriceDetailsClassName = 'icon ion-arrow-down-b';
    };
    //获取当前时间

    function FormatDate (strTime) {
      var date = new Date(strTime);
      return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
    }
    $scope.orderMessage.predictFinishTime = FormatDate(new Date());
    console.log($scope.orderMessage.predictFinishTime);

    if($stateParams.getWork != null){
      if($stateParams.getWork.type == 1){
        $scope.title = '接车登记';

        HttpService.post({orderId: $stateParams.getWork.orderId}, customerHost+'api/newPlant/create/createRepairOrderAgain.api').then(function(result){
          if(result.status='0000') {
            $scope.imgList.operationStatus = '001';
            $scope.orderMessage = result.data.orderBase;
            $scope.orderMessage.orderId = $scope.orderMessage.id;
            $scope.orderMessage.repairTypeVal = result.data.orderBase.repairTypeName;
            $scope.orderMessage.deptVal = result.data.orderBase.serviceAdvisorUserName
            $scope.orderMessage.repairTypeArray = result.data.orderBase.repairTypeArray;
            $scope.orderMessage.insurerArray = result.data.orderBase.insurerArray;
            $scope.orderMessage.deptArray = result.data.orderBase.deptArray;
            $scope.orderMessage.mileage = '';
            $scope.orderMessage.orderId = '';
            $scope.orderMessage.id = '';
            $scope.orderMessage.note = result.data.orderBase.note;
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
              $scope.orderMessage.orderSource = 0
            } else if (/android/.test(ua)) {
              $scope.orderMessage.orderSource = 10
            }
            $scope.itemTemporary = result.data.projectList;//项目
            $scope.materialTemporary = result.data.goodsList;//材料
            $scope.otherPrice = {
              towingFee: parseFloat(result.data.otherPrice.towingFee),//拖车费
              agencyFee: parseFloat(result.data.otherPrice.agencyFee),//代办费
              testingFee: parseFloat(result.data.otherPrice.testingFee),//检测费
              otherFee: parseFloat(result.data.otherPrice.otherFee),//其他费
            };

            $scope.itemTemporary = result.data.projectList;//项目
            $scope.materialTemporary = result.data.goodsList;//材料
            $scope.addItemRental(); //项目小计
            $scope.addMaterialRental();//材料小计
          }
        })

      }else{
        $scope.orderMessage.carLicense = $stateParams.getWork.carLicense;
        $scope.orderMessage.jobType = $stateParams.getWork.jobType;
        $scope.orderMessage.jobTypeName = $stateParams.getWork.jobTypeName;
        //$scope.imgList.orderId = '1706081705210083';
        //$scope.imgList.operationStatus = '001';
        HttpService.post($scope.orderMessage, customerHost+'api/newPlant/create/createRepairOrder.api').then(function(result){
          if(result.status='0000'){
            console.log(result);
            $scope.orderMessage.repairTypeArray = result.data.repairTypeArray;
            $scope.orderMessage.deptArray = result.data.deptArray;
            $scope.orderMessage.insurerArray = result.data.insurerArray;
            $scope.orderMessage.insurerName = result.data.insurerName;
            $scope.orderMessage.insurerId = result.data.insurerId;
            $scope.orderMessage.carModel = result.data.carModel;
            $scope.orderMessage.userName = result.data.userName;
            $scope.orderMessage.userPhone = result.data.userPhone;
            $scope.orderMessage.lastMaintenanceMileage = result.data.lastMaintenanceMileage;
            $scope.orderMessage.lastMileage = result.data.lastMileage;
            $scope.orderMessage.carModelId = result.data.carModelId;
            $scope.orderMessage.carSeriesId = result.data.carSeriesId;
            $scope.orderMessage.carColor = result.data.carColor;
            $scope.orderMessage.vin = result.data.vin;
            $scope.orderMessage.carEngine = result.data.carEngine;
            $scope.orderMessage.carLicense = result.data.carLicense;
            $scope.orderMessage.vinBindId = result.data.vinBindId;
            $scope.orderMessage.sendPeopleName = result.data.sendPeopleName;
            $scope.orderMessage.operationType = result.data.operationType;
            $scope.orderMessage.sendPeoplePhone = result.data.sendPeoplePhone;
             $scope.orderMessage.note = result.data.note;
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
              $scope.orderMessage.orderSource = 0
            } else if (/android/.test(ua)) {
              $scope.orderMessage.orderSource = 10
            }
          }
        });
        HttpService.post($scope.orderMessage,customerHost+'api/newPlant/findNotFinishedOrderByCarLicense.api').then(function(result){
          console.log(result);
          if(result.data.notFinishedOrderCaption){
            if(window.localStorage.getItem('notFin')){
              Util.showConfirm('特别提醒','该车牌已经存在'+result.data.notFinishedOrderCaption+'的工单,工单号为'+result.data.notFinishedOrderCode+',特别提醒您不要重复录单,是否继续?'
                ,function(){return;},function(){$state.go('orderList');});
            }
          }
        });
      }
    }
    $scope.comboList = {
      carModelId:'',//车型id
      carSeriesId:'',//车系id
      jobType:'',//工单类别编号
      pageNo:1,//当前页码
      pageSize:5,//一页数据量
      servicePackageKeyWord:'',//套餐搜索关键词
      clientSide:''
    };
    var lingshiArr = {
      'selectedCombo' : [],
      'selectedItem' : [],
      'selectedMaterial' : []
    };
    var suggertArr = [];
    $scope.itemTemporary = [];//存储选择项目(页面展示)
    $scope.materialTemporary = [];//存储选择材料(页面展示)
    $scope.repairs = [];//列表结合
    $scope.isItem = '';//控制二级菜单显示隐藏
    $scope.publicVlass = function (btn) {
      if (btn == 'btn1') { $scope.isAct = 'btn1'; $scope.repairs = [];$scope.repairsItem = []; $scope.repairsMaterial = []; $scope.repairsMaterialTwo = []; $scope.repairsDispark = []; $scope.orderMessage.pageNo = 1; }
      if (btn == 'btn2') { $scope.isAct = 'btn2'; $scope.repairs = [];$scope.repairsItem = []; $scope.repairsMaterial = []; $scope.repairsMaterialTwo = []; $scope.repairsDispark = []; $scope.orderMessage.pageNo = 1; }
      if (btn == 'btn3') { $scope.isAct = 'btn3'; $scope.repairs = [];$scope.repairsItem = []; $scope.repairsMaterial = []; $scope.repairsMaterialTwo = []; $scope.repairsDispark = []; $scope.orderMessage.pageNo = 1; }
      if (btn == 'btn4') { $scope.isAct = 'btn4'; $scope.repairs = [];$scope.repairsItem = []; $scope.repairsMaterial = []; $scope.repairsMaterialTwo = []; $scope.repairsDispark = []; $scope.orderMessage.pageNo = 1; }
      if (btn == 'btn5') { $scope.isAct = 'btn5'; $scope.repairs = [];$scope.repairsItem = []; $scope.repairsMaterial = []; $scope.repairsMaterialTwo = []; $scope.repairsDispark = []; $scope.orderMessage.pageNo = 1; }
    };
    $scope.getCombo = function (btn) {
      $scope.publicVlass(btn);
    };
    var linshi = '';
    $scope.setMeal = function(val){
      if(linshi == val){
        $scope.isItem = '';
        linshi = '';
      }else{
        $scope.isItem = val;
        linshi = val;
      }
    };

    //全选取值
    var updateSelected = function (action, name, selectType,suggestItem) {
      if (action == 'add' && lingshiArr[selectType].indexOf(name) == -1) {
        lingshiArr[selectType].push(name);
      }
      if (action == 'remove' && lingshiArr[selectType].indexOf(name) != -1) {
        var idx = lingshiArr[selectType].indexOf(name);
        lingshiArr[selectType].splice(idx, 1);
      }
    };
    $scope.updateSelection = function($event, name, selectType, isCombo){
      var checkbox = $event.target;
      var action = (checkbox.checked?'add':'remove');
      if(isCombo=='combo'){  //如果是套餐
        lingshiArr.selectedCombo = [];//先清空已选择套餐
      }
      updateSelected(action,name,selectType);
    };
    //两个数组公共比较方法
    $scope.judgeComboArray = function(distinguishArr,itemId,isType){
      var arr = [];
      if($scope[isType].length==0){
        for(var i=0;i<distinguishArr.length;i++){
          $scope[isType].push(distinguishArr[i]);
        }
      }else {
        for(var i=0;i<$scope[isType].length;i++){
          arr.push($scope[isType][i][itemId]);
        }
        for (var i = 0; i < distinguishArr.length; i++) {
          if (arr.indexOf(distinguishArr[i][itemId]) == -1) {
            $scope[isType].push(distinguishArr[i]);
          }
        }
      }
    };
    $scope.seveComboFn = function(){
      $scope.judgeComboArray(lingshiArr.selectedCombo[0].diServicePackageProjectArray,'projectId','itemTemporary');
      $scope.judgeComboArray(lingshiArr.selectedCombo[0].diServicePackageGoodsArray,'goodsId','materialTemporary');
      smModal.hide('#main-combo-modal');
      lingshiArr = {
        'selectedCombo' : [],
        'selectedItem' : [],
        'selectedMaterial' : []
      };
      $scope.addItemRental(); //项目小计
      $scope.addMaterialRental();//材料小计
    };
    //项目确定按钮
    $scope.seveItemFn = function(){
      $scope.judgeComboArray(lingshiArr.selectedItem,'projectId','itemTemporary');
      smModal.hide('#main-combo-modal');
      smModal.hide('#main-suggest-modal'); //保养建议
      //$scope.circulationList($scope.itemTemporary);
      lingshiArr.selectedItem.length=0;
      $scope.addItemRental();
    };
    $scope.anewItem = function(){
      $scope.addItemRental();
    };
    //项目小计
    $scope.addItemRental = function(){
      $scope.ItemSubtotal = 0;
      for(var i=0;i<$scope.itemTemporary.length;i++){
        $scope.ItemSubtotal+=$scope.itemTemporary[i].projectUnitPrice*$scope.itemTemporary[i].projectManHour;
      }
      $scope.ItemSubtotal = new Number($scope.ItemSubtotal).toFixed(2)
    };
    //材料确定按钮
    $scope.seveMaterialFn = function(){
      $scope.judgeComboArray(lingshiArr.selectedMaterial,'goodsId','materialTemporary');
      smModal.hide('#main-combo-modal');
      $scope.addMaterialRental();
    };
    //材料2确定按钮
    $scope.seveMaterialTwnFn = function(){
      $scope.judgeComboArray(lingshiArr.selectedMaterial,'goodsId','materialTemporary');
      smModal.hide('#main-combo-modal');
      $scope.addMaterialRental();
    };
    $scope.anewGoods = function(){
      $scope.addMaterialRental();
    };
    //开放确定按钮
    $scope.seveOpenGoodsFn = function(){
      $scope.judgeComboArray(lingshiArr.selectedMaterial,'goodsId','materialTemporary');
      smModal.hide('#main-combo-modal');
      $scope.addMaterialRental();
    };
    $scope.anewGoods = function(){
      $scope.addMaterialRental();
    };
    //材料小计
    $scope.addMaterialRental = function(){
      $scope.materialSubtotal = 0; //材料小计
      for(var i=0;i<$scope.materialTemporary.length;i++){
        $scope.materialSubtotal+=$scope.materialTemporary[i].goodsNumber*$scope.materialTemporary[i].goodsUnitPrice;
      }
      $scope.materialSubtotal = new Number($scope.materialSubtotal).toFixed(2)
    };
    $scope.isPaste = true;
    $scope.$watch('otherPrice.towingFee',function(newValue,oldValue){
      var reg = new RegExp(/^\d{1,5}(\.\d{1,2})?$/);
      if(!reg.test(newValue)){
        if($scope.isPaste){
          $scope.otherPrice.towingFee ='';
          $scope.isPaste=false;
        }else {
          if(newValue == ''||newValue == undefined){
            oldValue = '';
          }
          $scope.otherPrice.towingFee = oldValue;
        }
        return false;
      }
    });
    $scope.isPaste2 = true;
    $scope.$watch('otherPrice.agencyFee',function(newValue,oldValue){
      var reg = new RegExp(/^\d{1,5}(\.\d{1,2})?$/);
      if(!reg.test(newValue)){
        if($scope.isPaste2){
          $scope.otherPrice.agencyFee ='';
          $scope.isPaste2=false;
        }else {
          if(newValue == ''||newValue == undefined){
            oldValue = '';
          }
          $scope.otherPrice.agencyFee = oldValue;
        }
        return false;
      }
    });
    $scope.isPaste3 = true;
    $scope.$watch('otherPrice.testingFee',function(newValue,oldValue){
      var reg = new RegExp(/^\d{1,5}(\.\d{1,2})?$/);
      if(!reg.test(newValue)){
        if($scope.isPaste3){
          $scope.otherPrice.testingFee ='';
          $scope.isPaste3=false;
        }else {
          if(newValue == ''||newValue == undefined){
            oldValue = '';
          }
          $scope.otherPrice.testingFee = oldValue;
        }
        return false;
      }
    });
    $scope.isPaste4 = true;
    $scope.$watch('otherPrice.otherFee',function(newValue,oldValue){
      var reg = new RegExp(/^\d{1,5}(\.\d{1,2})?$/);
      if(!reg.test(newValue)){
        if($scope.isPaste4){
          $scope.otherPrice.otherFee ='';
          $scope.isPaste4=false;
        }else {
          if(newValue == ''||newValue == undefined){
            oldValue = '';
          }
          $scope.otherPrice.otherFee = oldValue;
        }
        return false;
      }
    });

    //加载数据分页
    $scope.repairs = [];
    $scope.repairsItem = [];
    $scope.repairsMaterial = [];
    $scope.repairsMaterial = [];
    $scope.isLoad = true;
    $scope.loadMore = function (btn) {
      if($scope.isShowloadMore){
        HttpService.post($scope.orderMessage, customerHost+$scope.postDataUrl).then(function(result){
          if (result.data.list == 0) {
            $scope.isLoad = false;
            $scope.repairCar = true;
          } else {
            $scope.isLoad = true;
            $scope.repairCar = false;
            if($scope.isAct=='btn1'){
              $scope.repairs = $scope.repairs.concat(result.data.list ? result.data.list : '');
            }else if($scope.isAct=='btn2'){
              $scope.repairsItem = $scope.repairsItem.concat(result.data.list ? result.data.list : '');
            }else if($scope.isAct=='btn3'){
              $scope.repairsMaterial = $scope.repairsMaterial.concat(result.data.list ? result.data.list : '');
            }else if($scope.isAct=='btn4'){
              $scope.repairsMaterialTwo = $scope.repairsMaterialTwo.concat(result.data.list ? result.data.list : '');
            }else{
              $scope.repairsDispark = $scope.repairsDispark.concat(result.data.list ? result.data.list : '');
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.orderMessage.pageNo = ++result.data.curPageNo;
          }
          console.log(result);
        });
      }
    };

    //自采选中
    $scope.getPurchase = function($event,index,addType,val,onlySelfPurchase){
      var checkbox = $event.target;
      action = (checkbox.checked?true:false);

      if (action) {
        document.getElementById(addType+index).removeAttribute('disabled');
        if(onlySelfPurchase==0){
          $scope.materialTemporary[index].purchaseType = 10;
        }
      }
      if (!action) {
        document.getElementById(addType+index).setAttribute('disabled','disabled');
        document.getElementById(addType+index).value = val;
        $scope.materialTemporary[index].goodsUnitPrice = val;
        if(onlySelfPurchase==0){
          $scope.materialTemporary[index].purchaseType = 0;
        }
        $scope.addMaterialRental();
      }
    };
    $scope.itemClose = function(index,arr){
      $scope[arr].splice(index,1);
      lingshiArr.selectedItem.splice(index,1);
      $scope.addItemRental(); //项目小计

    };
    $scope.materialClose = function(index,arr){
      $scope[arr].splice(index,1);
      lingshiArr.selectedMaterial.splice(index,1);
      $scope.addMaterialRental();//材料小计
    };
    $scope.imageList = [
      {
        "imgNumber": 0,
        "imgNote": "进店车照",
        "imgUrl": "../www/img/add_img.png"
      },
      {
        "imgNumber": 1,
        "imgNote": "里程表照",
        "imgUrl": "../www/img/add_img.png"
      },
      {
        "imgNumber": 2,
        "imgNote": "完工签字照",
        "imgUrl": "../www/img/add_img.png"
      }
    ];
    //保存
    $scope.saveBilling = function(){

      //验证进厂里程
      if(parseInt($scope.orderMessage.mileage)<parseInt($scope.orderMessage.lastMileage)||$scope.orderMessage.mileage==''){
        Util.showAlert('','进厂里程必须大于上次进厂里程');
        return false;
      }
      if($scope.orderMessage.sendPeoplePhone !=''){
          if(!(/^1[34578]\d{9}$/.test($scope.orderMessage.sendPeoplePhone))){
            Util.showAlert('','请输入有效的手机号码！');
            return false;
          }
      }else{
        Util.showAlert('','请填写手机号');
          return false;
      }

      //服务项目判断
      if($scope.itemTemporary.length==0){
        Util.showAlert('','请选择项目');
        return false;
      }
      if($scope.orderMessage.repairTypeVal==''){
        Util.showAlert('','请选择维修类别');
        return false;
      }
      if($scope.orderMessage.deptVal==''){
        Util.showAlert('','请选择服务顾问');
        return false;
      }
      if($scope.orderMessage.mileage==''){
        Util.showAlert('','请输入进场里程');
        return false;
      }
      //验证图片标题框
      for(var i = 0; i < $scope.upArray.length; i ++){
        if($scope.upArray[i].imgNote == ''){
          Util.showAlert('提示','请输入图片备注');
          return false;
        }
      }
      for(var i = 0; i < $scope.upArray.length; i ++){
        if($scope.upArray[i].imgNote == ''){
          Util.showAlert('提示','请输入图片备注');
          return false;
        }
      }
      for(var t = 0; t < 3; t++){
          $scope.sendParam.orderList.push($scope.imageList[t]);
      }
      for(var y = 0; y < $scope.upArray.length; y++){
        $scope.sendParam.orderList.push($scope.upArray[y]);
      }

      $scope.btnDisabled = true;//判断保存按钮是否能点击
      $scope.repairOrderStr.otherPrice = $scope.otherPrice;//附加费用
      $scope.repairOrderStr.projectList = $scope.itemTemporary;//项目
      $scope.repairOrderStr.goodsList = $scope.materialTemporary;//材料
      $scope.repairOrderStr.orderMessage = $scope.orderMessage;//
      $scope.repairOrderStr.sendParam = $scope.sendParam.orderList;//图片信息
      $scope.repairOrderStr = JSON.stringify($scope.repairOrderStr);
      $scope.repairObj.repairOrderStr = $scope.repairOrderStr;
      HttpService.post($scope.repairObj, customerHost+'api/newPlant/create/saveRepairOrder.api').then(function(result){
        if(result.status.code != '0000'){
          $scope.repairOrderStr = JSON.parse($scope.repairOrderStr);
        }else{
          $scope.btnDisabled = false;
          Util.showAlert('提示','保存成功', function(){
            $state.go('orderList',{searchStatus:100})
          });
        }
      })
    };

    //初始化区域模态层
    smModal.init(['#main-nature-modal','#main-consultant-modal','#main-combo-modal','#main-insurance-modal','#main-suggest-modal'], $scope);
    smModal.hide('#main-nature-modal'); //维修类别
    smModal.hide('#main-consultant-modal'); //选择服务顾问
    smModal.hide('#main-combo-modal'); //套餐选择
    smModal.hide('#main-insurance-modal'); //保险公司
    smModal.hide('#main-suggest-modal'); //保养建议

    //维修类别
    $scope.selectMainNature = function () {
      smModal.show('#main-nature-modal');
    };
    //维修类别
    $scope.selectNature = function(val,type){
      $scope.orderMessage.repairTypeVal = val;
      $scope.orderMessage.repairType = type;
      smModal.hide('#main-nature-modal');
    };
    //服务顾问
    $scope.selectConsultant = function(){
      smModal.show('#main-consultant-modal');
    };
    //服务顾问
    $scope.selectConsultantVal = function(val,departmentId,advisorUserId){
      $scope.orderMessage.deptVal = val;
      $scope.orderMessage.serviceDepartmentId = advisorUserId;//服务人员id
      $scope.orderMessage.serviceAdvisorUserId = departmentId;//服务部门id
      console.log(val+'-'+advisorUserId+'-'+departmentId);
      smModal.hide('#main-consultant-modal');
    };
    //保险公司
    $scope.showSelectInsurer = function(){
      smModal.show('#main-insurance-modal');
    };
    //保险公司
    $scope.selectInsurer = function(val,type){
      $scope.orderMessage.insurerName = val;
      $scope.orderMessage.insurerId = type;
      smModal.hide('#main-insurance-modal');
    };
    //保养建议
    $scope.showSelectSuggest = function(){
      HttpService.post({JobType:$scope.orderMessage.jobType,vinBindId:$scope.orderMessage.vinBindId,mileage:$scope.orderMessage.mileage}, customerHost+'api/newPlant/check/checkMileage.api').then(function(result){
        if(result.status='0000'){
          console.log(result.data);
          $scope.maintenanceList = result.data;
          for(var i=0;i<$scope.maintenanceList.maintenanceProjectArray.length;i++){
            if($scope.maintenanceList.maintenanceProjectArray[i].isSelected==1){
              updateSelected('add',$scope.maintenanceList.maintenanceProjectArray[i],'selectedItem','itemTemporary');
            }
          }
        }
      });
      smModal.show('#main-suggest-modal');
    };
    //选择套餐,项目,材料
    $scope.showCombo = function(num,btn,seach){
      if(num==1){
        $scope.postDataUrl = 'api/newPlant/create/choseDiServicePackage.api';
        $scope.itemTitle = '选择套餐';
        $scope.seveComboBtn = true;
        $scope.seveItemBtn = false;
        $scope.seveMaterialBtn = false;
        $scope.seveMaterialBtnTwo = false;
        $scope.seveDisparkBtn = false;//开放
        $scope.packageStatus = false;
      }else if(num==2){
        $scope.postDataUrl = 'api/newPlant/create/listServiceProject.api';
        $scope.itemTitle = '选择项目';
        $scope.seveComboBtn = false;
        $scope.seveItemBtn = true;
        $scope.seveMaterialBtn = false;
        $scope.seveMaterialBtnTwo = false;
        $scope.seveDisparkBtn = false;//开放
        $scope.projectStatus = false;

      }else if(num==3){
        $scope.postDataUrl = 'api/newPlant/create/listRepairOrderGoods.api';
        $scope.itemTitle = '选择商城商品';
        $scope.seveComboBtn = false;
        $scope.seveItemBtn = false;
        $scope.seveMaterialBtn = true;
        $scope.seveMaterialBtnTwo = false;
        $scope.seveDisparkBtn = false;//开放
        $scope.goodsStatus = false;
      }else if(num==4){
        $scope.postDataUrl = 'api/newPlant/create/listOpenStoreGoods.api';
        $scope.itemTitle = '选择开放商品';
        $scope.seveComboBtn = false;
        $scope.seveItemBtn = false;
        $scope.seveMaterialBtn = false;
        $scope.seveDisparkBtn = false;//开放
        $scope.openTabStatus = false;
        $scope.seveMaterialBtnTwo = true;
      }else if(num==5){
        $scope.postDataUrl = 'api/newPlant/create/listRepairOrderSelfGoods.api';
        $scope.itemTitle = '选择自建商品';
        $scope.seveComboBtn = false;
        $scope.seveItemBtn = false;
        $scope.seveMaterialBtn = false;
        $scope.seveDisparkBtn = true;//开放
        $scope.materialStatus = false;
        $scope.seveMaterialBtnTwo = false;
      }
      if(seach=='seach'){
        $scope.orderMessage.servicePackageKeyWord = '',//套餐搜索关键词
        $scope.orderMessage.projectKeyWord = '';//项目搜索关键词
        $scope.orderMessage.goodsKeyWord = '';//材料搜索关键词
        $scope.orderMessage.materialKeyWord = '';//材料2搜索关键词
        $scope.orderMessage.openGoodsKeyWord = '';//开放搜索关键词
        smModal.show('#main-combo-modal');
      }

      $scope.publicVlass(btn);
      $scope.isShowloadMore = true;
      $scope.loadMore(btn);
    };
    //搜索清空后
    $scope.isSeachVal = function(val,num,btn,type){
      if(type == 'click'){
        switch(num){
          case 1:
            $scope.orderMessage.servicePackageKeyWord = '';
            $scope.packageStatus = false;
            break;
          case 2:
            $scope.orderMessage.projectKeyWord = '';
            $scope.projectStatus = false;
            break;
          case 3:
            $scope.orderMessage.goodsKeyWord = '';
            $scope.goodsStatus = false;
            break;
          case 4:
            $scope.orderMessage.materialKeyWord = '';
            $scope.materialStatus = false;
            break;
          case 5:
            $scope.orderMessage.openGoodsKeyWord = '';
            $scope.openTabStatus = false;
            break;
        }
        // $scope.showCombo(num,btn);
        return;
      }
      if(val==''){
        // $scope.showCombo(num,btn);
      }else{
        switch(num){
          case 1:
            $scope.packageStatus = true;
            break;
          case 2:
            $scope.projectStatus = true;
            break;
          case 3:
            $scope.goodsStatus = true;
            break;
          case 4:
            $scope.materialStatus = true;
            break;
          case 5:
            $scope.openTabStatus = true;
            break;
        }
      }
    };
    //验证手机号
    $scope.verifyIphone = function(val){
      var myreg = /^1[34578]\d{9}$/;
      if(!myreg.test(val))
      {
        Util.showAlert('','请输入有效的手机号码！');
        return false;
      }
    };
    //验证进厂里程
    $scope.verifyMileage = function(val){
      if(val<$scope.orderMessage.lastMileage){
        Util.showAlert('','进厂里程必须大于上次进厂里程！');
        return false;
      }
    };
    $scope.isSuggest = function(val){
      if(parseInt($scope.orderMessage.mileage)<parseInt($scope.orderMessage.lastMileage)||$scope.orderMessage.mileage==''){
        Util.showAlert('','进厂里程必须大于上次进厂里程');
        $scope.showSuggest = false;
        return false;
      }else{
        $scope.showSuggest = true;
      }
    };
    //跳到客户详情
    $scope.goCustomer = function(){
      $state.go('customer',{customerData:$scope.orderMessage});
    };
    //----------------------------------------------图片上传操作----------------------------------------------------
    $scope.upArray = [];
    $scope.imgList = {
      orderId : '',
      otherImage:[],
      otherNote:[],
      number:[],
      delNumber:'',
      operationStatus:''
    };
    $scope.sendParam = {
      orderId :'',
      orderList:[],
      delNumber:''
    };
    $scope.orderBase = {};
    var array = [];
    var nums;
    var number;
    var upArray=[];//读取默认数据的临时数组;
    $scope.imgNum = 2;
    $scope.img1='../www/img/add_img.png';$scope.img2='../www/img/add_img.png';$scope.img3='../www/img/add_img.png';
    for(var i=0; i<15;i++){
      $scope['img'+i] = '../www/img/add_img.png';
    }

    $scope.imgList.orderId = '1706081705210083';
    $scope.imgList.operationStatus = '001';
    $scope.img0 = $scope.imgList.otherImage[0] = '../www/img/add_img.png';
    $scope.img1 = $scope.imgList.otherImage[1] = '../www/img/add_img.png';
    $scope.img2 = $scope.imgList.otherImage[2] = '../www/img/add_img.png';
    $scope.imgList.otherNote[0] = '进店车照';
    $scope.imgList.otherNote[1] = '里程表照';
    $scope.imgList.otherNote[2] = '完工签字照';
    $scope.imgList.number[0] = 0;
    $scope.imgList.number[1] = 1;
    $scope.imgList.number[2] = 2;

    Array.prototype.removeByValue = function(val) {
      for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
          this.splice(i, 1);
          return;
        }
      }
    };
    //通过$compile动态编译html
    $scope.addImg = function(){
      var currentNum = '';
      if($scope.upArray.length>0){
        currentNum = $scope.upArray[$scope.upArray.length - 1].imgNumber;
      }else{
        currentNum = 2;
      }
      currentNum ++;
      var newImgAyy = {
        imgNote:'',
        imgNumber: currentNum,
        imgUrl:'../www/img/add_img.png'
      };
      $scope.upArray.push(newImgAyy);
    };

    //限制描述字符
    $scope.checkText = function (number) {
      if ($scope.imageList[number+3].imgNote.length > 30) {
        Util.showAlert('提示', '请输入30个字符以内');
        $scope.imageList[number+3].imgNote = $scope.imageList[number+3].imgNote.substr(0, 30);
      }
    };

    //通过$compile动态编译html
    $scope.removeImg = function(_index, delNum){
      $scope.sendParam.delNumber += delNum + ',';
      $scope.upArray.splice(_index, 1);
    };
    $scope.choosePicMenu = function (_index) {
      TakePhoto.choosePicMenu("img2",8,2,$scope, function (img, imgUrl, path) {
        //$scope['img'+num] = path;
        //$scope.imgList.otherImage.push(path);
        //$scope.imgList.number.push(num);
        $scope.upArray[_index].imgUrl = path;
        $scope.$apply();
      });
    };
    $scope.choosePicMenu1 = function (img) {/*img, orderVin,num*/
      TakePhoto.choosePicMenu(img,8,2,$scope, function (img, imgUrl, path) {
        $scope['img'+img] = path;
        $scope.imageList[img].imgUrl = path;
        $scope.$apply();
      });
    };
    //关闭选择清空临时数组
    $scope.close = function(){
      lingshiArr.selectedCombo=[];
      lingshiArr.selectedItem=[];
      lingshiArr.selectedMaterial=[];
    };
    $scope.veifNum = function(val){
      var reg = new RegExp(/^\d{1,5}(\.\d{1,2})?$/);
      if(reg.test(val)){
        return;
      }
    };

    //返回按键关闭侧滑
    $rootScope.$on("closeSubWindow", function (e) {
      //var ev = e || window.event;
      //ev.preventDefault();
      smModal.hide('#main-nature-modal');
      smModal.hide('#main-consultant-modal');
      smModal.hide('#main-combo-modal');
      smModal.hide('#main-insurance-modal');
      smModal.hide('#main-suggest-modal'); //保养建议
    });
  });
