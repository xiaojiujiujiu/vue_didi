/**
 * http services
 * author hui.sun 
 * date 17/5/25
 */
angular.module('starter.services', [])
    .factory('HttpService', ['$http', '$q', '$filter', function ($http, $q, $filter) {
        return {
            get: function (param, url) {
                var deferred = $q.defer();
                $http.get(url, {params: param})
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (e) {
                        deferred.reject('error:' + e);
                    });
                return deferred.promise;
            },
            post: function (params, url) {
                var deferred = $q.defer();       
                $http.post(url, params)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (e) {
                        deferred.reject('error:' + e);
                    });
                return deferred.promise;

            },
            jsonp: function (param, url) {
                var deferred = $q.defer();
                $http.jsonp(url+'?'+paramSerialization(param)+'&callback=JSON_CALLBACK')
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (e) {
                        deferred.reject('error:' + e);
                    });
                return deferred.promise;
            }

        }
    }]);