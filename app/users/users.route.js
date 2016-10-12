(function () {
    'user strict';

    angular
        .module('enviou')
        .config(function ($stateProvider) {

            var user = {
                name: 'main.users',
                url: '/user',
                title: 'Todos os usuários',
                templateUrl: 'app/users/views/users.html',
                controller: 'UserController',
                controllerAs:  'vm'
            };

            var add = {
                name: 'main.userAdd',
                url: '/user/add',
                title: 'Novo usuário',
                templateUrl: 'app/users/views/addUser.html',
                controller: 'UserAddController',
                controllerAs: 'vm'
            };

            var edit = {
                name: 'main.userEdit',
                url: '/user/edit/:user',
                title: 'Editar usuário',
                views: {
                    '': {
                        templateUrl: '/app/users/views/editUser.html',
                        controller: 'UserEditController',
                        controllerAs: 'vm'
                     },
                     'userProfile@main.userEdit':{templateUrl: '/app/users/views/editPartials/profile.html'},
                     'userForm@main.userEdit':{templateUrl: '/app/users/views/editPartials/userForm.html'},
                     'resetPass@main.userEdit':{templateUrl: '/app/users/views/editPartials/resetPass.html'},



                }
            };

            $stateProvider.state(user);
            $stateProvider.state(add);
            $stateProvider.state(edit);

        });

})();
