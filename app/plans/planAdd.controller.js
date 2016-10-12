(function () {
    'use strict';

    angular
        .module('enviou')
        .controller('AddPlanController', AddPlanController);

    AddPlanController.$inject = ['config', '$rootScope', '$http', '$state'];

    function AddPlanController (config, $rootScope, $http, $state) {

        var vm = this;
        vm.addPlan = addPlan;

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
        function addPlan(plan) {
            var data = {
                planName: plan.planName,
                costPerSms: plan.costPerSms,
                smsFree: plan.smsFree || 0,
                expiresIn: vm.selecteddate,
            };

            $http.post(`${config.url}/plan`, data)
                .then(function (result) {

                    $.notify({
                        icon: 'ti-check',
                        title: 'Plano Criado',
                        message: `O plano ${data.planName} foi criado com sucesso. O mesmo ainda precisa ser aprovado.`,
                    },{type: 'success'});

                    $state.go('main.plans');
                })
                .catch(function (err) {
                    swal({
                        title: 'Erro',
                        text: `O plano ${data.planName} já existe.`,
                        timer: 3000,
                        type: 'error'
                    });
                });
        }

    }

})();
