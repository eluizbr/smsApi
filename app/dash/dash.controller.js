(function () {
    'use strict';

    angular
        .module('enviou')
        .controller('DashController', DashController);

    DashController.$inject = ['config', '$rootScope', 'AuthUser', '$http'];

    function DashController (config, $rootScope, AuthUser, $http) {

        var vm = this;
        vm.logout = logout;
        vm.totais = totais();

        // Recebe os resultados do vendedor
        function totais() {
            $http.get(config.url+ '/client/sales/results')
                .then(function(result) {
                    vm.resultados = result.data[0];
                    $rootScope.spinner = false;
                });
        }

        // Faz o logouto do usuário
        function logout() { AuthUser.logout(); }
    }

})();
