(function () {
    'use strict';

    angular
        .module('enviou')
        .config(function ($stateProvider) {

            var all = {
                name: 'main.plans',
                url: '/plans',
                title: 'Planos',
                templateUrl: 'app/plans/views/planos.html',
                controller: 'PlanController',
                controllerAs: 'vm'
            };
            var add = {
                name: 'main.planAdd',
                url: '/plan/add',
                title: 'Novo Plano',
                templateUrl: 'app/plans/views/addPlan.html',
                controller: 'AddPlanController',
                controllerAs: 'vm'
            };

            var edit = {
                name: 'main.planEdit',
                url: '/plan/edit/:id',
                title: 'Editar plano',
                templateUrl: 'app/plans/views/editPlan.html',
                controller: 'EditPlanController',
                controllerAs: 'vm',
            };

            $stateProvider.state(all);
            $stateProvider.state(add);
            $stateProvider.state(edit);

        });






})();
