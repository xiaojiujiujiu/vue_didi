// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'oc.lazyLoad', 'starter.controllers', 'starter.services'])
  .constant('customerHost', 'http://wxby.b2bex.com/')//http://wxby.b2bex.com/   http://o2o.autozi.com/  http://172.16.1.241:8080/   // http://172.16.1.84:8080/ http://172.16.1.241:8080/
  .run(['$ionicPlatform', '$location', '$ionicHistory', '$rootScope', '$state', '$ionicPopup', '$timeout', '$http', function ($ionicPlatform, $location, $ionicHistory, $rootScope, $state, $ionicPopup, $timeout, $http) {
	  $ionicPlatform.ready(function() {
	    $rootScope.hasProgress = false;
      $rootScope.maskBar = false;
      $rootScope.receivedBytes = 0;
      $rootScope.totalBytes = 0;
      var lastClickBckBtn = Date.now();

      /*
       * 检查更新
       **/
      // 简单的 GET 请求，可以改为 POST
      /*$http({
        method: 'GET',
        url: 'http://phpapi.autozi.com/api.php?a=checkVersion&ctype=2&m=MobileSystem&cur_version=1.2.0&project_id=1035'+'&callback=JSON_CALLBACK'
      }).then(function successCallback(response) {
          // 请求成功执行代码
          console.log(response)
        }, function errorCallback(response) {
          // 请求失败执行代码
      });*/


      //返回键处理
      //主页面显示退出提示框

      $ionicPlatform.registerBackButtonAction(function (e) {
        e.preventDefault();
        if (document.querySelectorAll('.sm-modal').length > 0) {
          for (var smNum = 0; smNum < document.querySelectorAll('.sm-modal').length; smNum++) {
            if (document.querySelectorAll('.sm-modal')[smNum].offsetWidth > 0) {
              $rootScope.$broadcast('closeSubWindow');
              return;
            }
          }
        }
        if ($location.path() == '/tab/index' || $location.path() == '/login') {
          showConfirm();
        } else if ($ionicHistory.backView()) {
          $ionicHistory.goBack();
        } else {
          $state.go('index');
          //showConfirm();
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
        return false;
      }, 101);
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      //延迟splash screnn 隐藏时间,不然会有短暂的白屏出现u-+
      if (navigator.splashscreen) {
          setTimeout(function () {
              navigator.splashscreen.hide();
          }, 500);
      }


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

	  });
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      if (toState.name != 'login' && toState.name != 'register' && toState.name != 'protocol' && !window.localStorage.getItem('loginInfo')) {
        event.preventDefault();
        $state.go('login');
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
          //errorNum = 0;
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
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/);
    $httpProvider.interceptors.push('UserInterceptor');
    // 使用传统的请求头
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // iphone 关闭侧滑返回
    $ionicConfigProvider.views.swipeBackEnabled(false);

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
        $state.go('tab.index')
      }

    });
  })
