// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'oc.lazyLoad', 'starter.controllers', 'starter.services'])
  .constant('customerHost', 'http://o2o.autozi.com/')//http://172.16.1.241:8080 http://wxby.b2bex.com/ http://o2o.autozi.com/
  .run(['$ionicPlatform', '$location', '$ionicHistory', '$rootScope', '$state', '$ionicPopup', '$timeout', function ($ionicPlatform, $location, $ionicHistory, $rootScope, $state, $ionicPopup, $timeout) {
	  $ionicPlatform.ready(function() {
      var lastClickBckBtn = Date.now();
	    $rootScope.hasProgress = false;
      $rootScope.maskBar = false;
      $rootScope.receivedBytes = 0;
      $rootScope.totalBytes = 0;
	    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	    // for form inputs)

	    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	      cordova.plugins.Keyboard.disableScroll(true);

	    }
	    if (window.StatusBar) {
	      // org.apache.cordova.statusbar required
	      StatusBar.styleDefault();
	    }

	    //跳转链接
      if (window.cordova && window.cordova.InAppBrowser) {
          window.ref = cordova.InAppBrowser.open;
      } else {
          window.ref = function (url, type, option) {
              window.open(url, "_blank")
          }
      }
      //延迟splash screnn 隐藏时间,不然会有短暂的白屏出现u-+
      if (navigator.splashscreen) {
          setTimeout(function () {
              navigator.splashscreen.hide();
          }, 500);
      }

      //手动检查更新时需调用检查是否成功
      function notifySucceeded() { }

      function notifyFailed() {
          alert("更新失败，请稍后再试或下载最新版本！");
      }
      //if (codePush) {
      //    codePush.notifyApplicationReady(notifySucceeded, notifyFailed);
      //}


      //启动检查更新

      //function check() {
      //    codePush.checkForUpdate(function (update) {
      //        if (!update) {
      //            $rootScope.hasNewVersion = false;
      //        } else {
      //            $rootScope.hasNewVersion = true;
      //            version(update.description);
      //        }
      //    });
      //}

      //function version(str) {
      //    if (str.length >= 7 && str.substring(str.length - 1) == '0') {
      //        showAlert('版本信息', '发现新版本,点击确认下载最新版本!', function () {
      //            window.ref('http://app.autozi.com/servlet/appqrcode.do?appType=didi', "_system", '');
      //        });
      //    } else {
      //        //showAlert('提示', '发现新版本,请更新到最新版本!');
      //        var confirmPopup = $ionicPopup.confirm({
      //            title: '版本信息',
      //            template: '发现新版本,请更新到最新版本!',
      //            cancelText: '取消',
      //            okText: '确认'
      //        });
      //
      //        confirmPopup.then(function (res) {
      //            if (res) {
      //                $rootScope.hasProgress = true;
      //                $rootScope.maskBar = true;
      //                codePush.sync(syncStatus, { updateDialog: false, installMode: InstallMode.IMMEDIATE }, downloadProgress)
      //            } else {
      //
      //            }
      //        });
      //    }
      //}
      function syncStatus(status) {
          switch (status) {
              case SyncStatus.DOWNLOADING_PACKAGE:
                  console.log('Show downloading modal');
                  break;
              case SyncStatus.INSTALLING_UPDATE:
                  // Hide "downloading" modal
                  console.log('Hide downloading modal');

                  break;
          }
      }
      function downloadProgress(downloadProgress) {

          if (downloadProgress) {

              $rootScope.$apply(function () {
                  //alert("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress.totalBytes);
                  $rootScope.receivedBytes = parseFloat(parseInt(downloadProgress.receivedBytes) / (1024 * 1024));
                  $rootScope.totalBytes = parseFloat(parseInt(downloadProgress.totalBytes) / (1024 * 1024));
              }, 300);


          } else {
              $rootScope.$apply(function () {
                  $scope.downloading = false;

              });

          }
      }

      function showAlert(title, template, fn) {
          var alertPopup = $ionicPopup.alert({
              title: title,
              template: template,
              okText: "确认"
          });
          alertPopup.then(function (res) {
              if (fn) { fn() };
              //console.log('Thank you for not eating my delicious ice cream cone');
          });
      }

      //check();

      //返回键处理
      //主页面显示退出提示框

      $ionicPlatform.registerBackButtonAction(function (e) {
        e.preventDefault();

        if ($('.LightBox').css('display') =='block') {
          $('ion-header-bar').show();
          $(".LightBox").hide();
          return;
          //for (var smNum = 0; smNum < document.querySelectorAll('.sm-modal').length; smNum++) {
          //  if (document.querySelectorAll('.sm-modal')[smNum].offsetWidth > 0) {
          //    $rootScope.$broadcast('closeSubWindow');
          //    return;
          //  }
          //}
        }
        function showConfirm() {
          if ((Date.now() - lastClickBckBtn) < 2000) {
            ionic.Platform.exitApp();
            console.log(lastClickBckBtn);
          } else {
            lastClickBckBtn = Date.now();
          }
          window.plugins.toast.showShortBottom('再按一次退出应用');
        }

        if ($location.path() == '/index' || $location.path() == '/login') {
          showConfirm();
        } else if ($ionicHistory.backView()) {
          $ionicHistory.goBack();
        } else {
          $state.go('index');
          //showConfirm();
        }
        return false;
      }, 101);
	  });
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      //console.log('fromState:' + fromState.name + 'toState:' + toState.name)
      //判断是否登陆，未登陆跳转到登陆页面
      // if (fromState.name == '' && window.localStorage.getItem('loginInfo') !== '') {
      //     $state.go('index');
      // }
      if (toState.name != 'login' && toState.name != 'register' && toState.name != 'protocol' && !window.localStorage.getItem('loginInfo')) {
        //if () {

        event.preventDefault();
        $state.go('login');
        // return false;
        //}

      }
    });
    //错误处理
    var errorNum = 0;
    $rootScope.$on('userIntercepted', function (userIntercepted, errorType, data) {

      var alertPopup;
      if (errorType == 'verifyError') {
        // if ($location.$$path != '/login') {
        alertPopup = $ionicPopup.alert({
          title: '错误信息',
          template: data.message,
          buttons: [{
            text: '确定',
            type: 'button-positive'
          }]
        });
        alertPopup.then(function (res) {
          if(data.message == "请输入正确的车牌号码或VIN码!"){
            $state.go('M_historySearch');
          }
        });

        // }
      }
      if (errorType == 'loginError') {

        alertPopup = $ionicPopup.alert({
          title: '错误信息',
          template: data.message,
          buttons: [{
            text: '确定',
            type: 'button-positive'
          }]
        });
        alertPopup.then(function (res) {
          errorNum = 0;
          $state.go('login');
        });


      }
      if (errorType == 'networkError') {
        if (errorNum > 0) {
          return;
        }
        errorNum++;

        alertPopup = $ionicPopup.alert({
          title: '提示',
          template: data.message,
          buttons: [{
            text: '确定',
            type: 'button-positive'
          }]
        });
        alertPopup.then(function (res) {
          errorNum = 0;
        });

      }
    });
	}])


	//用户拦截器
  .factory('UserInterceptor', ['$rootScope', '$q', '$filter', function ($rootScope, $q, $filter) {
    return {
      request: function (config) {
          var now = new Date();
          now = $filter('date')(now, 'yyMMddHHmmss');
          var timeCheckValue = hex_md5(now + hex_md5('time@qeegoo.com'));
          if (config.url && config.url.split("/")[0] != 'templates') {
              config.data ? '' : config.data = {};
              config.data['token'] = window.localStorage.getItem('loginInfo') ? JSON.parse(window.localStorage.getItem('loginInfo')).token : 'undefined';
              config.data['tokenCheckValue'] = window.localStorage.getItem('loginInfo') ? JSON.parse(window.localStorage.getItem('loginInfo')).tokenCheckValue : 'undefined';
              config.data['time'] = now;
              config.data['timeCheckValue'] = timeCheckValue;
          }

          return config;
      },
      response: function (response) {
          var result = response.data;
          if (result instanceof Object) {
              //接收错误代码
              switch (result.status.code) {
                  //登录过期
                  case '0000':

                      break;
                  case '0002':
                      $rootScope.$emit('userIntercepted', 'loginError', {
                          message: '登录信息失效，请重新登录或稍后再试！'
                      });
                      break;
                  //令牌无效
                  default:
                      $rootScope.$emit('userIntercepted', 'verifyError', {
                          message: result.status.msg
                      });
                      break;

              }
          } else if (result === '' || response.status == 204) {
              var url = response.config.url.substr(0, response.config.url.indexOf('?'));
              alert('接口:无返回数据!');
              // $('.ui-view-loading').fadeOut('fast');
          }

          return response;
      },
      //处理响应错误
      responseError: function (response) {
          var url = response.config.url;
          alert('接口:请求失败，请检查网络或稍后再试！');
          // $('.ui-view-loading').fadeOut('fast');
      }
    };
  }])
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider, $compileProvider) {
    // iphone 关闭侧滑返回
    $ionicConfigProvider.views.swipeBackEnabled(false);

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/);
    $httpProvider.interceptors.push('UserInterceptor');
    // 使用传统的请求头
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * 将对象序列化以&拼接
     * @param {Object} obj
     * @return {String}
     */
    var param = function (obj) {
      var query = '',
        name, value, fullSubName, subName, subValue, innerObj, i;

      for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value !== undefined && value !== null)
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }

      return query.length ? query.substr(0, query.length - 1) : query;
    };

    // 重写默认请求
    $httpProvider.defaults.transformRequest = [function (data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];

    //重写返回back title
    $ionicConfigProvider.backButton.text(' ');
    $ionicConfigProvider.backButton.previousTitleText(false);
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(function ($injector, $location) {
      var $state = $injector.get("$state");
      if (!window.localStorage.getItem('loginInfo') || window.localStorage.getItem('loginInfo') == '') {
        $state.go('login')
      } else {
        $state.go('index')
      }

    });
  })
