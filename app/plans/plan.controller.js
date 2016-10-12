(function () {
    'use strict';

    angular
        .module('enviou')
        .controller('PlanController', PlanController);

    PlanController.$inject = ['config', '$rootScope', '$http'];

    function PlanController (config, $rootScope, $http) {

        var vm = this;
        vm.getPlans = getPlans();

        // Pega todos os planos
        function getPlans() {
            $http.get(`${config.url}/plan/`)
                .then(function (doc) {
                    vm.plans = doc.data;
                    $rootScope.spinner = false;
                });
        }

    }

})();
