(function () {
    'user strict';

    angular
        .module('enviou')
        .controller('UserAddController', UserAddController);

    UserAddController.$inject = ['config', '$rootScope', '$http', '$state'];

    function UserAddController (config, $rootScope, $http, $state) {

        var vm = this;
        vm.addUser = addUser;

        // Criar um usuario
        function addUser(newUser) {

            $http.post(config.url + '/user/', newUser)
                .then(function (result) {

                    $.notify({
                        icon: 'ti-check',
                        message: `O usuário ${newUser.username} foi criado com sucesso.`,
                        title: 'Usuário criado com sucesso.',
                        delay: 50000,

                    },{type: 'success'});

                    $state.go('main.users');
                })
                .catch(function(err) {
                    swal({
                        title: 'Erro',
                        text: `Usuário ou senha já esta em uso.`,
                        timer: 3000,
                        type: 'error'
                    });

                });
        }

    }
})();
