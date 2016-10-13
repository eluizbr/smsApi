(function () {
    'use strict';

    angular
        .module('enviou')
        .controller('EditPlanController', EditPlanController);

    EditPlanController.$inject = ['config', '$rootScope', '$scope', '$http', '$stateParams'];

    function EditPlanController (config, $rootScope, $scope, $http, $stateParams) {

        var vm = this;
        vm.getPlan = getPlan();
        vm.ativarPlano = ativarPlano;
        vm.updatePlan = updatePlan;

        $('#data').datetimepicker({
            locale: moment().locale('pt-BR'),
            defaultDate: moment().add(1, 'years').format('YYYY-MM-DD'),
            format: 'YYYY-MM-DD',
            minDate: moment(),
            icons: {
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
         });

        $("#data").on("dp.change", function() {
           vm.selecteddate = $("#data").val();

        });

        // Pega todos os planos
        function getPlan() {
            $http.get(`${config.url}/plan/${$stateParams.id}`)
                .then(function (doc) {
                    vm.plan = doc.data;
                    vm.canDeactivate = true;
                    if (doc.data.clients.length <=0 ){
                        vm.canDeactivate = false;
                    }

                    $rootScope.spinner = false;
                });
        }

        // Ativar/Desativar o planos
        function ativarPlano(id) {
            $http.put(`${config.url}/plan/isAproved/` +id)
                .then(function(result) {
                    vm.plan.isActive = !vm.plan.isActive;
                    $.notify({
                        icon: 'ti-check',
                        title: 'Plano Atualizado',
                        message: `O plano <b>${vm.plan.planName}</b> foi atualizado com sucesso.`,
                    },{type: 'success'});
                });
        }

        // Atualizar um plano
        function updatePlan(id,plan) {

            var update = {
                expiresIn: vm.selecteddate,
                planName: plan.planName,
                costPerSms: plan.costPerSms,
                smsFree: plan.smsFree
            };

            $http.put(`${config.url}/plan/${id}`, update)
                .then(function(result) {
                    swal({
                        title: 'Sucesso',
                        text: `O plano <b>${update.planName}</b> foi atualizado com sucesso.`,
                        timer: 3000,
                        type: 'success'
                    });
                });
        }

    }

})();
