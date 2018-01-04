var appService = angular.module('autozi.services', [])


  //手动实现返回操作
  .factory('Navigation', ['$ionicHistory', '$location', function ($ionicHistory, $location) {
    return {
      goBack: function () {
        if (!$ionicHistory.backView()) {
          $location.path("/tab/index");
        }
        else {
          $ionicHistory.goBack();
        }
      },
      backTitle: function () { return $ionicHistory.backTitle(); },
      backUrl: function () { return $ionicHistory.backView() ? $ionicHistory.backView().url : '#/tab/index'; }
    }
  }])
  //工具方法
  .factory('Util', ['$ionicPopup', function ($ionicPopup) {
    var error = {
      isValid: 0,            //正确
      isNull: 1,            //为空
      isInvalid: 2,         //不符合规则
      isInconsistent: 3      //密码不一致
    }
    return {
      //判断是否为空
      isNull: function (str) {
        if (str == null || str.length == 0) {
          return true;
        } else {
          return false;
        }
      },
      //去掉空格
      trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
      },
      //去掉左边空格
      ltrim: function (str) {
        return str.replace(/(^\s*)/g, "");
      },
      //去掉右边空格
      rtrim: function (str) {
        return str.replace(/(\s*$)/g, "");
      },
      //检查密码是否一致
      checkPwd: function (oldPwd, newPwd, confirmPwd) {
        if (oldPwd == "") {
          return error.isNull;
        } else if (newPwd.length < 4 || newPwd.length > 16) {
          return error.isInvalid;
        } else if (newPwd != confirmPwd) {
          return error.isInconsistent;
        } else { return error.isValid; }
      },
      //判断回调结果是否成功
      isSuccess: function (status) {
        if (status.code == '0000') {
          return true;
        } else {
          return false;
        }

      },
      //显示弹出框
      //title：弹出框标题
      //template:弹出框内容
      //callback:点击后的回调方法
      showAlert: function (title, template, callback) {
        var alertPopup = $ionicPopup.alert({
          title: title,
          template: template,
          buttons: [
            { text: '确定', type: 'button-positive' }]
        });
        alertPopup.then(function (res) {
          if (typeof callback == 'function')
          { callback(); }
        });
      },
      //显示确认弹出框
      //title：弹出框标题
      //template:弹出框内容
      //callback_ok:点击确认后的回调方法
      //callback_not:点击取消后的回调方法
      showConfirm: function (title, template, callback_ok, callback_not) {
        var confirmPopup = $ionicPopup.confirm({
          title: title,
          template: template,
          cancelText: '取消',
          okText: '确认'
        });

        confirmPopup.then(function (res) {
          if (res) {
            if (typeof callback_ok == 'function') {
              callback_ok();
            }
          } else {
            if (typeof callback_not == 'function') {
              callback_not();
            }
          }
        });
      },
      getLastDay: function (year, month) {
        var new_year = year;    //取当前的年份
        var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
        if (month > 12) {
          new_month -= 12;        //月份减
          new_year++;            //年份增
        }
        var new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天
        return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期
      }
    }

  }])
  //  拍照、相册
  .factory('TakePhoto', ['$ionicActionSheet', '$ionicHistory', '$ionicPopup', 'FileUpload', function ($ionicActionSheet, $ionicHistory, $ionicPopup, FileUpload) {
    return {
      choosePicMenu: function (image, goodsType, typeNum, scope,  callBack) {
        var cameraOption = {};
        $ionicActionSheet.show({
          buttons: [
            { text: '拍照' },
            { text: '从手机相册选择' }
          ],
          titleText: '选择照片',
          cancelText: '取消',
          cancel: function () {
            // alert("没选择照片");
          },
          buttonClicked: function (index) {
            if (index == 0) {
              cameraOption = {
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
                allowEdit: true,
                popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
                targetWidth: 600,
                targetHeight: 600,
                //saveToPhotoAlbum: true
              }
            } else if (index == 1) {
              cameraOption = {
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: Camera.EncodingType.JPEG,
                PictureSourceType: Camera.MediaType.PICTURE,
                popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
                targetWidth: 600,
                targetHeight: 600,
                //saveToPhotoAlbum: true
              }
            }
            //Camera.getPicture(type)->根据选择的“选取图片”的方式进行选取
            //navigator.camera.getPicture(type).then(
            //    //返回一个imageURI，记录了照片的路径
            //    function (imageURI) {
            //        $scope.me.image = imageURI;
            //        //更新页面上的照片
            //        $scope.img = imageURI;
            //        $scope.$apply();
            //    },
            //    function (err) {
            //    });
            navigator.camera.getPicture(function (imageURI) {
                //alert(imageURI);
                //$scope.me.image = imageURI;
                //更新页面上的照片
                //scope[image] = imageURI;
                //alert(scope[image]);
                FileUpload.fileUpload(image, imageURI, goodsType, scope, callBack);
                scope.$apply();
              }, function (err) {
                alert(err);
              },
              cameraOption);
            return true;
          }
        });
      }
    }
  }])
  //上传照片
  .factory('FileUpload', ['$filter', 'customerHost', function ($filter, customerHost) {
    return {
      fileUpload: function (image, upLoadImg, goodsType, scope, callBack) {
        //alert('开始上传');
        //新建文件上传选项，并设置文件key，name，type
        var options = new FileUploadOptions();
        //alert(FileUploadOptions);

        options.fileKey = "file";
        //alert(upLoadImg);
        //alert(upLoadImg.substr(upLoadImg.lastIndexOf('/')+1));
        options.fileName = upLoadImg.substr(upLoadImg.lastIndexOf('/') + 1);
        //options.mimeType = "image/jpg";
        options.httpMethod = 'POST';
        //alert(options.fileName);
        //用params保存其他参数，例如昵称，年龄之类
        var params = {};
        //params['name'] = $scope.me.name;
        //把params添加到options的params中
        options.params = params;
        //新建FileTransfer对象
        var ft = new FileTransfer();
        //scope.rotate = true;
        //scope.showMask = true;
        var now = new Date();
        now = $filter('date')(now, 'yyMMddHHmmss');
        //var timeCheckValue = hex_md5(now + "qeegoo@qeegoo.com");
        var token = window.localStorage.getItem('loginInfo') ? JSON.parse(window.localStorage.getItem('loginInfo')).token : 'undefined';
        var time = window.localStorage.getItem('loginInfo') ? JSON.parse(window.localStorage.getItem('loginInfo')).time : 'undefined';
        var timeCheckValue = window.localStorage.getItem('loginInfo') ? JSON.parse(window.localStorage.getItem('loginInfo')).timeCheckValue : 'undefined';
        var tokenCheckValue = window.localStorage.getItem('loginInfo') ? JSON.parse(window.localStorage.getItem('loginInfo')).tokenCheckValue : 'undefined';

        ft.upload(
          upLoadImg,
          encodeURI(customerHost + 'api/newPlant/create/upLoadImageToRepairOrder.api?vin='+8+'&token='+token+'&time='+ time+'&timeCheckValue='+ timeCheckValue+'&tokenCheckValue='+ tokenCheckValue),//把图片及其他参数发送到这个URL，相当于一个请求，在后台接收图片及其他参数然后处理
          uploadSuccess,
          uploadError,
          options);


        //upload成功的话

        function uploadSuccess(r) {
          //scope.rotate = false;
          //scope.showMask = false;
          var resp = JSON.parse(r.response);
          if (resp.status.code == '0000') {
            ////返回前一页面
            //$ionicHistory.back();
            if (typeof callBack == 'function') {
              callBack(image, upLoadImg, resp.data.imageUrl);
              //alert('走到了server上传图片方法里面:'+'resp.data.imageName'+resp.data.imageName+'resp.data.path'+resp.data.path);
            }
          } else {
            scope.rotate = false;
            scope.showMask = false;
            scope.$apply();
            //alert('上传失败,失败原因：'+resp.status.msg);

          }
        }
        //upload失败的话
        function uploadError(error) {
          scope.rotate = false;
          scope.showMask = false;
          scope.$apply();
          alert('上传失败，失败原因：图片过大或网络异常，请重新上传');
        }
      }
    }
  }])



  //自定义观察者模式服务
  .factory('viewerService', [function () {
    var pubsub = {}, subUid = 0;

    (function (p) {
      var calls = [];//回调函数数组

      //订阅者
      p.subscriber = function (name, func) {
        if (!calls[name]) {
          calls[name] = [];//清空原有的订阅
        }

        calls[name].push({
          $id: (++subUid).toString(),
          func: func
        });
      }
      //发布者
      p.publisher = function (name, args) {
        if (!calls[name])
          return false;
        var subscribers = calls[name], subLens = subscribers.length;
        //从后往前
        while (subLens--) {
          subscribers[subLens].func(args);
        }
      }
      //退订
      p.unSubscriber = function () {

      }
    })(pubsub);


    return pubsub;
  }]);
