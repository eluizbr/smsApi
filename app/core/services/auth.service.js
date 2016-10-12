(function () {
    'use strict';

    angular
        .module('enviou')
        .factory('AuthUser', AuthUser);

    AuthUser.$inject = ['config', '$q','$http', '$localStorage', '$location', '$state', '$window'];

    function AuthUser (config, $q, $http, $localStorage, $location, $state, $window) {

        // Remove os dados do usuario

        var removeuser = function () {
            delete $localStorage.token;
            delete $localStorage.userData;
            $location.path('/login');
            $window.location.reload();
        };

        return {

            login: function (data) {
                $http.post(`${config.url}/login`, data)
                    .then(function (result) {

                        if (result.data.userdata.isActive) {
                            $localStorage.userData = result.data.userdata;
                            $localStorage.token = result.data.token;
                            $location.path('home');

                        } else { removeuser(); }

                    })
                    .catch(function (err) { removeuser(); });
            },

            logout: function () { removeuser(); },

            checkToken: function () {

                if (!$localStorage.token) {
                    return false;
                } else {
                    return true;
                }
            }

        };

    }

})();
