
(function () {
    'use strict';

    angular
        .module('enviou', [
            'ui.router',
            'ngStorage',
            'ngAnimate',
            'ngMask'
        ])
        .constant('config', {
            "url": 'http://127.0.0.1:8080/api/v1'
        })
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('Interceptor');
        })
        .run(function ($rootScope, AuthUser, $state, $location, $http) {
            console.log('Enviou is running...');
            $rootScope.$on("$stateChangeError", console.log.bind(console));

            $rootScope.$on('$stateChangeStart', function (event, toState) {
                if (!AuthUser.checkToken()) {
                    $location.path('/login');
                } else {
                    $rootScope.title = toState.title;
                }
            });

        });

})();
