(function () {
    'use strict';

    angular
        .module('enviou')
        .controller('CoreController', CoreController);

    CoreController.$inject = ['$rootScope', 'AuthUser', '$http'];

    function CoreController ($rootScope, AuthUser, $http) {

        var vm = this;

        vm.logout = logout;

        // Faz o logouto do usuário
        function logout() { AuthUser.logout(); }
    }

})();
