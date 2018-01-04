// $ionicScrollDelegate not working for content in modals
// as described here: https://github.com/driftyco/ionic/issues/2754
// So using an intermediary service until it's fixed.
// Change to return standard and it should use native functionality.
angular
    .module('autozi.services')
    .service('QyScrollDelegate', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
        var custom = {
            $getByHandle: function (name) {
                var instances = $ionicScrollDelegate.$getByHandle(name)._instances;
                return instances.filter(function (element) {
                    return (element['$$delegateHandle'] == name);
                })[0];
            }
        };

        return custom;
    }]);
