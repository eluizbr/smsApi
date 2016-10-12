(function () {
    'user strict';

    angular
        .module('enviou')
        .controller('UserEditController', UserEditController);

    UserEditController.$inject = ['config', '$rootScope', '$http', '$stateParams'];

    function UserEditController (config, $rootScope, $http, $stateParams) {

        var vm = this;

        vm.getUser = getUser();
        vm.gerarSenha = gerarSenha;

        // Retorna todos os Usuários
        function getUser () {
            $http.get(config.url + '/user/' +$stateParams.user)
                .then(function (result) {
                    vm.user = result.data;
                    $rootScope.spinner = false;
                });
        }

        // Gerar nova senha
        function gerarSenha (id) {

            $http.get(config.url + '/user/resetPass/' +id)
                .then(function (result) {
                    getUser();
                });
        }

    }

})();
