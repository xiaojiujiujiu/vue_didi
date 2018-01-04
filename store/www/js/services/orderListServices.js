angular.module('starter.services', [])
  .service('orderListServices', function ($http) {
    this.getClassify = function () {
      return [
        { name: '全部',searchstatus:'100', viewable: true},
        { name: '已创建',searchstatus:'110', viewable: false },
        { name: '待派工',searchstatus:'140', viewable: false},
        { name: '待完工',searchstatus:'150', viewable: false},
        { name: '已完工',searchstatus:'155', viewable: false},
        { name: '已驳回',searchstatus:'130', viewable: false},
        { name: '待审核',searchstatus:'120', viewable: false},
        { name: '待总检',searchstatus:'160', viewable: false},
        { name: '异常单',searchstatus:'170', viewable: false},
      ]
    };

    this.getList = function (url, page, rows) {
      return $http.post(url, { page: page, rows: rows })
    }
  });
