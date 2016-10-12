(function () {
    'user strict';

    angular
        .module('enviou')
        .controller('UserController', UserController);

    UserController.$inject = ['config', '$rootScope', '$http'];

    function UserController (config, $rootScope, $http) {

        var vm = this;
        vm.getUsers = getUsers();

        // Retorna todos os Usuários
        function getUsers () {
            $http.get(config.url + '/user/')
                .then(function (result) {
                    vm.users = result.data;
                    $rootScope.spinner = false;
                });
        }

    }
})();
