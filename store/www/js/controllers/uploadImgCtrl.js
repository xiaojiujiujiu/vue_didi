angular.module('starter.controllers', [])
  .controller('uploadImgCtrl', function($scope, $compile,orderListServices, $state,$stateParams,$ionicSlideBoxDelegate, $ionicTabsDelegate,HttpService,customerHost,Util,TakePhoto) {
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
    $scope.title='上传图片';
    $scope.saveBtn='保存图片';
    $scope.setVal="创建照片";
    var array = [];
    /*var nums;
    var number;
    var upArray=[];//读取默认数据的临时数组;*/
    $scope.imgNum = 2;
    //$scope.img1='../www/img/add_img.png';$scope.img2='../www/img/add_img.png';$scope.img3='../www/img/add_img.png';
    //for(var i=0; i<15;i++){
    //  $scope['img'+i] = '../www/img/add_img.png';
    //}

    $scope.imgList.orderId = $stateParams.id;
    $scope.imgList.operationStatus = $stateParams.operationStatus;

    if($stateParams.operationStatus=='006'){
      $scope.title='提交总检';
      $scope.saveBtn='提交总检';
      $scope.saveUrl = 'api/newPlant/submit/submitToSecondCheck.api';
    }else if($stateParams.operationStatus=='001'){
      $scope.title='上传照片';
      $scope.saveBtn='保存';
      $scope.saveUrl = 'api/newPlant/save/saveRepairOrderForImages.api';
    }
    HttpService.post($scope.imgList, customerHost+'api/newPlant/edit/editRepairOrderForImages.api').then(function(result){
        $scope.results = result;
      if(result.status.code=='0000'){
        $scope.projectPrice = 0;
        $scope.goodsPrice = 0;
        if(result.data.goodsList.length > 0){
          for(var i = 0; i < result.data.goodsList.length; i ++ ){
            $scope.goodsPrice += parseFloat(result.data.goodsList[i].totalMoney);
          }
        }else{
          $scope.goodsPrice = 0;
        }
        if(result.data.projectList.length > 0){
          for(var i = 0; i < result.data.projectList.length; i ++ ){
            $scope.projectPrice += parseFloat(result.data.projectList[i].projectUnitTotalMoney);
          }
        }else{
          $scope.projectPrice = 0;
        }
        $scope.orderBase = result.data.orderBase;



        $scope.projectList = result.data.projectList;
        $scope.goodsList = result.data.goodsList;
        $scope.otherPrice = result.data.otherPrice;
        $scope.otherPriceSubtotal = parseFloat($scope.otherPrice.agencyFee) + parseFloat($scope.otherPrice.testingFee) + parseFloat($scope.otherPrice.towingFee) + parseFloat($scope.otherPrice.otherFee)
        $scope.otherPriceSubtotal = new Number($scope.otherPriceSubtotal).toFixed(2);
        $scope.imageList = result.data.imageList;
        console.log($scope.imageList);
        //$scope.img0 = $scope.imgList.otherImage[0] = $scope.imageList[0]?$scope.imageList[0].imgUrl:'../www/img/add_img.png';
        //$scope.img1 = $scope.imgList.otherImage[1] = $scope.imageList[1]?$scope.imageList[1].imgUrl:'../www/img/add_img.png';
        //$scope.img2 = $scope.imgList.otherImage[2] = $scope.imageList[2]?$scope.imageList[2].imgUrl:'../www/img/add_img.png';
        //$scope.imgList.otherNote[0] = $scope.imageList[0]?$scope.imageList[0].imgNote:'进店车照';
        //$scope.imgList.otherNote[1] = $scope.imageList[1]?$scope.imageList[1].imgNote:'里程表照';
        //$scope.imgList.otherNote[2] = $scope.imageList[2]?$scope.imageList[2].imgNote:'完工签字照';
        //$scope.imgList.number[0] = $scope.imageList[0]?$scope.imageList[0].imgNumber:0;
        //$scope.imgList.number[1] = $scope.imageList[1]?$scope.imageList[1].imgNumber:1;
        //$scope.imgList.number[2] = $scope.imageList[2]?$scope.imageList[2].imgNumber:2;
        //
        //if($scope.imageList[2]==null){
        //  $scope.imageList.splice(2,1,{"imgNumber": 2,"imgNote": "完工签字照", "imgUrl": "../www/img/add_img.png"});
        //}
        for(var i=0; i<3;i++){
          if($scope.imageList[i]==null&&i==0){
            $scope.imageList.splice(i,1,{"imgNumber":0,"imgNote":"进店车照","imgUrl":"../www/img/add_img.png"});
          }else if($scope.imageList[i]==null&&i==1){
            $scope.imageList.splice(i,1,{"imgNumber":1,"imgNote":"里程表照","imgUrl":"../www/img/add_img.png"});
          }else if($scope.imageList[i]==null&&i==2){
            $scope.imageList.splice(i,1,{"imgNumber":2,"imgNote":"完工签字照","imgUrl":"../www/img/add_img.png"});
          }
        }
        $scope.img0 = $scope.imageList[0].imgUrl;
        $scope.img1 = $scope.imageList[1].imgUrl;
        $scope.img2 = $scope.imageList[2].imgUrl;
        $scope.upArray = $scope.imageList.slice(3);  //截取除前三个以外的数据
        $scope.materialSubtotal = 0; //材料小计
        for(var i=0;i<$scope.goodsList.length;i++){
          $scope.materialSubtotal+=$scope.goodsList[i].goodsNumber*$scope.goodsList[i].goodsUnitPrice;
        }
        $scope.ItemSubtotal = 0;//项目小计
        for(var i=0;i<$scope.projectList.length;i++){
          $scope.ItemSubtotal+=$scope.projectList[i].projectUnitPrice*$scope.projectList[i].projectManHour;
        }
      }
    });
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


    $scope.sendParam.delNumber = '';
    //通过$compile动态编译html
    $scope.removeImg = function(_index, delNum){
      $scope.sendParam.delNumber += delNum + ',';
      $scope.upArray.splice(_index, 1);
    };
    $scope.choosePicMenu = function (_index) {/*img, orderVin,num*/
     // TakePhoto.choosePicMenu("img2",8,2, $scope,function(){}) {/*img, orderVin, num, $scope, */
      TakePhoto.choosePicMenu("img2",8,2,$scope, function (img, imgUrl, path) {
        $scope.upArray[_index].imgUrl = path;
        /* $scope.imgList.otherImage.push(path);
        $scope.imgList.number.push(num);
        //$scope[img] = imgUrl;
        //$scope[img] = path;
        //$scope.pageModel['images[' + number + '].tempImagePath'] = path;
        //$scope[imageName] = true;
        //$scope.setValNew = '请填写标题';
        //$scope.addImg();*/
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
    $scope.upImgSave = function(){
      $scope.sendParam.orderList = [];
      $scope.sendParam.orderId = $stateParams.id;
      for(var i = 0; i < $scope.upArray.length; i ++){
        if($scope.upArray[i].imgNote == ''){
          Util.showAlert('提示','请输入图片备注');
          return false;
        }
      }

      for(var t = 0; t < 3; t++){
        if($scope.imageList[t]==null){
          //$scope.sendParam.orderList.push({"imgNumber":2,"imgNote":"完工签字照","imgUrl":"../www/img/add_img.png"});
        }else{
          $scope.sendParam.orderList.push($scope.imageList[t]);
        }
      }
      for(var y = 0; y < $scope.upArray.length; y++){
         $scope.sendParam.orderList.push($scope.upArray[y]);
      }
      // console.log($scope.sendParam.orderList);
      if($stateParams.operationStatus=='006'){
        if($scope.img2==''||$scope.img2=='../www/img/add_img.png'){
          Util.showAlert('提示','请上传完工签字照',function(){
            return;
          });
        }else{
          $scope.sendParam.orderList = BASE64.encoder(JSON.stringify($scope.sendParam.orderList));
          HttpService.post($scope.sendParam, customerHost+$scope.saveUrl).then(function(result){
            if(result.status.code=='0000'){
              Util.showAlert('提示','提交成功',function(){
                $state.go('orderList',{searchStatus:160});
              });
            }
          })
        }
      }else{
        $scope.sendParam.orderList = BASE64.encoder(JSON.stringify($scope.sendParam.orderList));
        HttpService.post($scope.sendParam, customerHost+$scope.saveUrl).then(function(result){
          if(result.status.code=='0000'){
            Util.showAlert('提示','保存成功',function(){
              $state.go('orderList',{searchStatus:110});
            });
          }
        })
      }
    };


    $scope.PriceDetails = false;
    $scope.PriceDetailsClassName = 'icon ion-arrow-down-b';
    $scope.showPriceDetails = function(){
      $scope.PriceDetails = !$scope.PriceDetails;
      $scope.PriceDetails ? $scope.PriceDetailsClassName = 'icon ion-arrow-up-b' : $scope.PriceDetailsClassName = 'icon ion-arrow-down-b';
    }
  });

