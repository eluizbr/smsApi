(function () {
    'use strict';

    angular
        .module('enviou')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $urlRouterProvider.otherwise('/home');
            $locationProvider.html5Mode(true);

            var home = {
                name: 'main',
                title: 'Dashboard',
                views: {
                    '': {
                        templateUrl: '/app/core/views/main.html',
                        controller: 'CoreController',
                        controllerAs: 'vm',
                    },
                    'navbar@main':{templateUrl: '/app/core/views/navbar.html'},
                    'sidebar@main':{templateUrl: '/app/core/views/sidebar.html'},
                    'footer@main':{templateUrl: '/app/core/views/footer.html'},
                }
            };

            var login = {
                name: 'access',
                url: '/login',
                templateUrl: '/app/login/views/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            };

            var dash = {
                name: 'main.dash',
                url: '/home',
                title: 'Dashboard',
                templateUrl: '/app/dash/views/dash.html',
                controller: 'DashController',
                controllerAs: 'vm'
            };

            $stateProvider.state(home);
            $stateProvider.state(login);
            $stateProvider.state(dash);

        });


})();
