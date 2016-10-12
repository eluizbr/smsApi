(function () {
    'use strict';

    angular
        .module('enviou')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthUser'];

    function LoginController (AuthUser) {

        var vm = this;

        vm.logar = logar;

        // Realiza o login do usuário
        function logar(data) { AuthUser.login(data); }
    }

})();
