
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
    templateUrl: 'templates/tabs.html',
    controller: 'tabCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load(['js/controllers/tabCtrl.js']).then(function () {
          });
      }]
    }
  })
  // 登录
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load(['js/services/services.js','js/controllers/tabCtrl.js']).then(function () {
          return $ocLazyLoad.load(['js/controllers/loginCtrl.js']).then(function () {
          });
        });
      }]
    }
  })

   // 首页
  .state('tab.index', {
    url: '/index',
    views: {
        'tab-index': {
            templateUrl: 'templates/index_content.html',
            controller: 'indexCtrl'
        }
    },
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
          return $ocLazyLoad.load(['js/controllers/indexCtrl.js']).then(function () {
            return $ocLazyLoad.load(['js/controllers/tabCtrl.js']).then(function () {
            });
          });
        });
      }]
    }
  })

   // 接车
	.state('tab.receiving', {
      params: { seachVal: null },
	    url: '/receiving',
	    views: {
	        'tab-receiving': {
	            templateUrl: 'templates/receiving.html',
              controller: 'receivingCtrl'
	        }
	    },
	    cache: false,
	    resolve: {
	      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	        return $ocLazyLoad.load('js/services/services.js').then(function () {
              return $ocLazyLoad.load('js/controllers/receivingCtrl.js').then(function () {
              });
	        });
	      }]
	    }
	})
  // 导入工单查询
    .state('workOrder', {
      url: '/workOrder',
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

	//开单列表
	.state('billingList', {
    url: '/billingList/:carPlate',
    templateUrl: 'templates/billingList.html',
    controller: 'billingListCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
          return $ocLazyLoad.load('js/controllers/billingListCtrl.js').then(function () {
          });
        });
      }]
    }
  })
  //开单
  .state('billing', {
    url: '/billing',
    params: { getWork: null },
    templateUrl: 'templates/billing.html',
    controller: 'billingCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
          return $ocLazyLoad.load('js/services/smModalService.js').then(function () {
            return $ocLazyLoad.load('js/services/touchSliderService.js').then(function () {
              return $ocLazyLoad.load('js/directive/smModalDirective.js').then(function () {
                return $ocLazyLoad.load('js/directive/setStyleDirective.js').then(function () {
                  return $ocLazyLoad.load('js/services/QyScrollDelegate.js').then(function () {
                    return $ocLazyLoad.load('js/controllers/billingCtrl.js').then(function () {
                    });
                  });
                });
              });
            });
          });
        });
      }]
    }
  })
  // 修改
  .state('editOrder', {
    url: '/editOrder',
    params: { getWork: null },
    templateUrl: 'templates/editOrder.html',
    controller: 'editOrderCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
          return $ocLazyLoad.load('js/services/smModalService.js').then(function () {
            return $ocLazyLoad.load('js/services/touchSliderService.js').then(function () {
              return $ocLazyLoad.load('js/directive/smModalDirective.js').then(function () {
                return $ocLazyLoad.load('js/directive/setStyleDirective.js').then(function () {
                  return $ocLazyLoad.load('js/services/QyScrollDelegate.js').then(function () {
                    return $ocLazyLoad.load('js/controllers/editOrderCtrl.js').then(function () {
                    });
                  });
                });
              });
            });
          });
        });
      }]
    }
  })

  //工单类型说明
  .state('orderType', {
    url: '/orderType',
    templateUrl: 'templates/orderType.html',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {

      }]
    }
  })
  //套餐选择
  .state('comboSelect', {
    url: '/comboSelect/:carModelId/:carSeriesId/:jobType',
    templateUrl: 'templates/comboSelect.html',
    controller: 'comboSelectCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
          return $ocLazyLoad.load('js/controllers/comboSelectCtrl.js').then(function () {
          });
        });
      }]
    }
  })

   // 我的
	.state('tab.myself', {
	    url: '/myself',
	    views: {
	        'tab-myself': {
	            templateUrl: 'templates/myself.html',
	            controller: 'myselfCtrl'
	        }
	    },
	    cache: false,
	    resolve: {
	      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	        return $ocLazyLoad.load(['js/controllers/myselfCtrl.js'])
	      }]
	    }
	})

	//客户详情
	.state('customer', {
    url: '/customer',
    params: { customerData: null },
    templateUrl: 'templates/customer.html',
    controller: 'customerCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load('js/services/services.js').then(function () {
            return $ocLazyLoad.load(['js/controllers/customerCtrl.js']).then(function () {
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
  // 工单详情
  .state('order_detail', {
    url: '/order_detail/:id',
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
  // 接车登记
  .state('register', {
    url: '/register',
    cache: false,
    templateUrl: 'templates/register.html',
  })

  // 上传照片(一审)
  .state('upload_photos', {
    url: '/upload_photos/:id/:operationStatus',
    templateUrl: 'templates/upload_photos.html',
    controller: 'uploadImgCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load([
          'js/controllers/uploadImgCtrl.js'
        ]);
      }]
    }
  })
  // 上传照片(二审)
  .state('upload_photos_second_trial', {
    url: '/upload_photos_second_trial',
    templateUrl: 'templates/upload_photos_second_trial.html',
    cache: false,
  })

  // 派工
  .state('sendWork', {
    url: '/sendWork/:orderId/:code/:carLicense',
    templateUrl: 'templates/send_work.html',
    controller: 'sendWorkCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load([
          'js/controllers/sendWorkCtrl.js'
        ]);
      }]
    }
  })
  // 派工完成
  .state('dispatching_workers', {
    url: '/dispatching_workers',
    templateUrl: 'templates/dispatching_workers.html',
    controller: 'sendWorkCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        return $ocLazyLoad.load([
          'js/controllers/sendWorkCtrl.js'
        ]);
      }]
    }
  })
  // 服务技师
  .state('service_technician', {
    url: '/service_technician/:orderId/:projectId',
    templateUrl: 'templates/service_technician.html',
    controller: 'serviceTechnicianCtrl',
    cache: false,
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad){
        return $ocLazyLoad.load([
          'js/controllers/serviceTechnicianCtrl.js',
          'js/services/services.js'
        ]);
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
  // 维保历史查询
  .state('M_historySearch', {
    url: '/M_historySearch',
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
   // 维保历史
  .state('M_history', {
    url: '/M_history/:carVin',
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
  // 维保历史详情
  .state('M_history_detail', {
    url: '/M_history_detail/:id',
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
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/index');

});
