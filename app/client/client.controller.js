(function () {
    'use strict';

    angular
        .module('enviou')
        .controller('ClientController', ClientController);

    ClientController.$inject = ['config', '$rootScope', '$http'];

    function ClientController (config, $rootScope, $http) {

        var vm = this;
        vm.getClients = getClients();

        // Carrega todos os clientes
        function getClients() {
            $http.get(config.url +'/client')
                .then(function (result) {
                    vm.clients = result.data;
                    $rootScope.spinner = false;
                });
        }

        // Status do clientes
        vm.clientStatus = [
            { "nome": "Novo contrato", "status":0, "class": "text-info", "mostrar": true },
            { "nome": "Aguardando envio de documentação", "status":1, "class": "text-warning", "mostrar": true },
            { "nome": "Em analize", "status":2, "class": "text-warning", "mostrar": true },
            { "nome": "Pendências no CNPJ", "status":3, "class": "text-danger", "mostrar": true },
            { "nome": "Contrato ATIVO", "status":4, "class": "text-success", "mostrar": true },
            { "nome": "Pagamento em atrazo", "status":5, "class": "text-warning", "mostrar": true },
            { "nome": "Contrato bloqueado", "status":6, "class": "text-danger", "mostrar": true },
            { "nome": "Cliente desativado", "status":7, "class": "text-danger", "mostrar": true }

        ];

    }
})();
