app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // 登录
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load(['js/controllers/loginCtrl.js','js/services/services.js']).then(function () {
        });
      }]
    }
  })

  // 首页
  .state('index', {
    url: '/index',
    templateUrl: 'templates/index_content.html',
    controller: 'indexCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
          return $ocLazyLoad.load(['js/controllers/indexCtrl.js']).then(function () {
          });
        });
      }]
    }
  })
  // 滴滴审核
  .state('review', {
    url: '/review/:searchStatus',
    templateUrl: 'templates/review.html',
    controller: 'reviewCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
          return $ocLazyLoad.load(['js/controllers/reviewCtrl.js']).then(function () {
          });
        });
      }]
    }
  })
  // 滴滴总检
  .state('inspection', {
    url: '/inspection/:searchStatus',
    templateUrl: 'templates/inspection.html',
    controller: 'inspectionCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
           return $ocLazyLoad.load(['js/controllers/inspectionCtrl.js']).then(function () {
          });
        });
      }]
    }
  })
   // 工单列表
  .state('orderList', {
    url: '/orderList',
    params: { searchStatus: null },
    templateUrl: 'templates/order_list.html',
    controller: 'orderListCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
          return $ocLazyLoad.load(['js/services/orderListServices.js']).then(function () {
            return $ocLazyLoad.load(['js/controllers/orderListCtrl.js']).then(function () {
            });
          });
        });
      }]
    }
  })
  // 维保历史
  .state('M_history', {
    url: '/M_history/:carVin/:flag',
    templateUrl: 'templates/M_history.html',
    controller: 'MHistoryCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['js/controllers/MHistoryCtrl.js']).then(function () {
        });
      }]
    }
  })
  // 维保历史查询
  .state('M_historySearch', {
    url: '/M_historySearch',
    params: { carLicense: null },
    templateUrl: 'templates/M_historySearch.html',
    controller: 'MHistorySearchCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['js/controllers/MHistorySearchCtrl.js','js/services/services.js']).then(function () {
        });
      }]
    }
  })
  // 维保历史详情
  .state('M_history_detail', {
    url: '/M_history_detail/:id/:type',
    templateUrl: 'templates/M_history_detail.html',
    controller: 'HistoryDetailCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
          return $ocLazyLoad.load(['js/directive/magnify.js']).then(function () {
            return $ocLazyLoad.load(['js/controllers/HistoryDetailCtrl.js']).then(function () {
            });
          });
        });
      }]
    }
  })
  // 驳回
  .state('turn_down', {
    url: '/turn_down/:id/:code/:carLicense/:partyName/:status/:typeId',
    templateUrl: 'templates/turn_down.html',
    controller: 'turnDownCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
          return $ocLazyLoad.load(['js/controllers/turnDownCtrl.js']).then(function () {
          });
        });
      }]
    }
  })
  // 工单详情
  .state('order_detail', {
    url: '/order_detail/:orderId/:flag',
    templateUrl: 'templates/order_detail.html',
    controller: 'orderDetailCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
          return $ocLazyLoad.load(['js/directive/magnify.js']).then(function () {
            return $ocLazyLoad.load(['js/controllers/orderDetailCtrl.js']).then(function () {
            });
          });
        });
      }]
    }
  })
  // 导入工单查询
    .state('workOrder', {
      url: '/workOrder/:carLicense',
      params: { carLicense: null },
      templateUrl: 'templates/workOrder.html',
      controller: 'workOrderCtrl',
      cache: false,
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/services/services.js').then(function () {
              return $ocLazyLoad.load(['js/controllers/workOrderCtrl.js']).then(function () {
              });
          });
        }]
      }
    })
  // 操作日志
  .state('operation_log', {
    url: '/operation_log/:orderId',
    cache: false,
    templateUrl: 'templates/operation_log.html',
    controller: 'operationCtrl',
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
          return $ocLazyLoad.load(['js/controllers/operationCtrl.js']).then(function () {
          });
        });
      }]
    }

  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/index');

});
