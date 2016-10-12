(function () {
    'use strict';

    angular
        .module('enviou')
        .config(function ($stateProvider) {

            var all = {
                name: 'main.clients',
                url: '/client/',
                title: 'Todos os clientes',
                templateUrl: '/app/client/views/client.html',
                controller: 'ClientController',
                controllerAs: 'vm',
            };

            var add = {
                name: 'main.clientAdd',
                url: '/client/add',
                title: 'Novo cliente',
                views: {
                    '': {
                        templateUrl: '/app/client/views/addClient.html',
                        controller: 'AddClientController',
                        controllerAs: 'vm',
                    },
                    'clientInfo@main.clientAdd': { templateUrl: '/app/client/views/addPartials/clientInfo.html' },
                    'addressInfo@main.clientAdd': { templateUrl: '/app/client/views/addPartials/addressInfo.html' }
                }

            };

            var edit = {
                name: 'main.clientEdit',
                url: '/client/edit/:cnpj',
                title: 'Editar cliente',
                views: {
                    '': {
                        templateUrl: '/app/client/views/editClient.html',
                        controller: 'EditClientController',
                        controllerAs: 'vm',
                    },
                    'userForm@main.clientEdit':{templateUrl: '/app/client/views/editPartials/userForm.html'},
                    'boletos@main.clientEdit':{templateUrl: '/app/client/views/editPartials/boletos.html'},
                    'documentos@main.clientEdit':{templateUrl: '/app/client/views/editPartials/documentos.html'},
                    'gerarBoleto@main.clientEdit':{templateUrl: '/app/client/views/editPartials/gerarBoleto.html'},
                    'resetPass@main.clientEdit':{templateUrl: '/app/client/views/editPartials/resetPass.html'},
                    'mudarPlano@main.clientEdit':{templateUrl: '/app/client/views/editPartials/mudarPlano.html'},
                    'profile@main.clientEdit':{templateUrl: '/app/client/views/editPartials/profile.html'},
                    'userStatus@main.clientEdit':{templateUrl: '/app/client/views/editPartials/userStatus.html'}
                }

            };

            $stateProvider.state(all);
            $stateProvider.state(add);
            $stateProvider.state(edit);

        });

})();
