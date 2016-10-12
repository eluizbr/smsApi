(function () {
    'use strict';

    angular
        .module('enviou')
        .factory('Interceptor', Interceptor);

    Interceptor.$inject = ['$q', '$localStorage', '$location', '$rootScope', '$window'];

    function Interceptor ($q, $localStorage, $location, $rootScope, $window) {

        return {
            request: function (config) {
                config.headers = config.headers || {};

                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    $rootScope.userData = $localStorage.userData;
                    $rootScope.spinner = true;
                } else {
                    $location.path('/login');
                }
                return config;
            },

            responseError: function (err) {
                if (err.status === 401) {
                    delete $localStorage.token;
                    delete $localStorage.userData;
                    $location.path('/login');
                    $window.location.reload();
                }
                return $q.reject(err);
            }
        };

    }
})();
