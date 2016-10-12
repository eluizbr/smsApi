(function () {
    'use strict';

    angular
        .module('enviou')
        .controller('EditClientController', EditClientController);

    EditClientController.$inject = ['config', '$rootScope', '$http', '$stateParams'];

    function EditClientController (config, $rootScope, $http, $stateParams) {

        var vm = this;
        vm.wrongZip = true;

        vm.getClient = getClient;
        vm.gerarContrato = gerarContrato;
        vm.gerarSenha = gerarSenha;
        vm.getPlans = getPlans;
        vm.planSelected = planSelected;
        vm.gerarBoleto = gerarBoleto;
        vm.isPaid = isPaid;
        vm.checkZIP = checkZIP;
        vm.updateUser = updateUser;
        vm.userStatus = userStatus;
        vm.newStatus = newStatus;


        // Altera o status do cliente
        function newStatus(status) {

            $http.put(`${config.url}/client/status/${vm.client.cnpj}/${status}`)
                .then(function(result) {

                    getClient();
                    $rootScope.spinner = false;

                    $.notify({
                        icon: 'ti-check',
                        title: 'Cliente atualizado',
                        message: `O cliente <b>${vm.client.razao}</b>, teve seu status alterado com sucesso.`,
                    },{type: 'success'});
                });

        }

        // Carrega os dados dos clientes
        getClient();

        // Carrega a lista de planos
        getPlans();

        // Pega o cliente com base no CNPJ enviado
        function getClient() {
            $http.get(config.url+'/client/' +$stateParams.cnpj)
                .then(function (result) {
                    vm.client = result.data;
                    $rootScope.spinner = false;
                    var pageSize = 1;
                    vm.hasPayment = false;
                    vm.hasContract = result.data.hasContract;

                    // Seta true ou false se o cliente já gerou algum boleto
                    vm.hasPaymentLate = false;
                    if (result.data.paymentId.length >= 1) {
                        vm.hasPaymentLate = true;
                    }

                    // Paginação para os Boletos
                    if (vm.client.paymentId.length >=3) {
                        pageSize = 3;
                        vm.hasPayment = true;
                    }

                    // Verifica sem já existe algum pagamento
                    if (vm.client.paymentId.length >=1) {
                        vm.hasPayment = true;
                    }

                    if (vm.client.planoId) {
                        vm.hasPlan = true;
                    } else {
                        vm.hasPlan = false;
                    }

                    vm.currentPage = 0;
                    vm.pageSize = pageSize;
                    vm.data = [];
                     for (var i=0; i<pageSize; i++) {
                         vm.data.push("Item "+i);
                     }

                     // Status do clientes
                     vm.clientStatus = [
                         { "nome": "Novo contrato", "status":0, "class": "text-info", "mostrar": true },
                         { "nome": "Aguardando envio de documentação", "status":1, "class": "text-warning", "mostrar": true },
                         { "nome": "Em analize", "status":2, "class": "text-warning", "mostrar": true },
                         { "nome": "Pendências no CNPJ", "status":3, "class": "text-danger", "mostrar": true },
                         { "nome": "Contrato ATIVO", "status":4, "class": "text-success", "mostrar": true },
                         { "nome": "Pagamento em atrazo", "status":5, "class": "text-warning", "mostrar": vm.hasPaymentLate },
                         { "nome": "Contrato bloqueado", "status":6, "class": "text-danger", "mostrar": true },
                         { "nome": "Cliente desativado", "status":7, "class": "text-danger", "mostrar": true }

                     ];


                });
        }


        // Gerar contrato do cliente
        function gerarContrato (cnpj) {
            // Registra a alteração no mongo
            if (!vm.hasPayment) {
                swal({
                    title: 'Erro',
                    text: 'É necessário selecionar um plano antes.',
                    type: 'error',
                    timer: 5000
                });
            } else {

                $http.get(config.url+'/client/contract/' +cnpj)
                    .then(function(result) {
                        $.notify({
                            icon: 'ti-check',
                            title: 'Contrato OK!',
                            message: `O contrato foi gerado com sucesso com sucesso.`,
                        },{type: 'success'});
                        // Atualiza a view
                        $rootScope.spinner = false;
                        getClient();
                    });

            }

        }


        //Gerar nova senha
        function gerarSenha(senha) {
            // Exibe uma modal de confirmação
            swal({
                  title: 'Deseja alterar a senha?',
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  cancelButtonText: 'Cancelar',
                  confirmButtonText: 'Sim, alterar senha!'
            }).then(function() {

                  swal({
                      title: 'Sucesso',
                      text: 'Senha alterada com sucesso.',
                      type: 'success',
                      timer: 3000
                  });

              // Registra a alteração no mongo
              $http.put(config.url+'/client/pass/' +senha)
                  .then(function(result) {
                      // Atualiza a view
                      $rootScope.spinner = false;
                      getClient();
                  });

          });
        }

        // Retorna todos os planos
        function getPlans() {
            $http.get(config.url+'/plan')
                .then(function (result) {
                    vm.plans = result.data;
                });
        }

        // Alterar o plano do cliente
        function planSelected(newPlan,oldPlan,clientId) {
            var data = {
                'oldPlan': oldPlan,
                'newPlan': newPlan,
                'clientId': clientId
            };

            // Exibe uma modal de confirmação
            swal({
                  title: 'Deseja alterar o Plano?',
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  cancelButtonText: 'Cancelar',
                  confirmButtonText: 'Sim, alterar plano!'
            }).then(function() {

                  swal({
                      title: 'Sucesso',
                      text: 'Plano alterado com sucesso.',
                      type: 'success',
                      timer: 3000
                  });

              // Registra a alteração no mongo
              $http.put(config.url+'/plan/changePlan/', data)
                  .then(function(result) {
                      // Atualiza a view
                      $rootScope.spinner = false;
                      getClient();
                  });

          });

        }

        //Gerar boleto
        function gerarBoleto(valor) {

            var data = {
                valor: valor,
                userId:vm.client._id
            };

            swal({
              title: 'Gerando boleto',
              text: `Boleto no valor de R$ ${valor}, esta sendo gerado. Aguarde...`,
              type: 'info',
            });

            $http.post(config.url + '/payment', data)
                .then(function(result) {

                    vm.valor = '';

                    swal({
                        title: 'Boleto gerado',
                        text: `Boleto no valor de R$ ${valor}, foi gerado com sucesso.`,
                        type: 'success',
                        timer: 3000
                    });

                    getClient();
                });
        }

        // Quitar o Boleto
        function isPaid(id) {
            // Exibe uma modal de confirmação
            swal({
                  title: 'Deseja quitar o boleto?',
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  cancelButtonText: 'Cancelar',
                  confirmButtonText: 'Sim, quitar!'
            }).then(function() {

                  swal({
                      title: 'Sucesso',
                      text: 'Boleto quitado com sucesso.',
                      type: 'success',
                      timer: 3000
                  });

                  $http.put(config.url + '/payment/isPaid/'+id)
                      .then(function(result) {
                          // Atualiza a view
                          getClient();
                      });

            }).catch(function () {
                console.log('aqui');
            });


        }


        // Procura pelo cep
        function checkZIP(zip){
            try{
                if (zip.target.value.length === 9){
                    $http.get(config.url + '/cep/' +zip.target.value)
                        .then(function(result) {
                            vm.client.logradouro = result.data.logradouro;
                            vm.client.bairro = result.data.bairro;
                            vm.client.cidade = result.data.cidade;
                            vm.client.estado = result.data.estado;

                            vm.wrongZip = true;

                            $.notify({
                                icon: 'ti-check',
                            	title: 'CEP OK!',
                        	    message: `O Endereço foi atualizado com sucesso.`,
                            },{type: 'success'});
                            $rootScope.spinner = false;

                        })
                        .catch(function(err) {
                            vm.wrongZip = false;
                            swal({
                                title: 'Erro no CEP',
                                text: `O CEP <b>${zip.target.value}</b> não existe na base dos correios.`,
                                timer: 5000,
                                type: 'error'
                            });
                            $rootScope.spinner = false;
                        });
                }
            } catch (err){}
        }

        // Atualiza os dados do cliente
        function updateUser(data) {
            var dados = {
                fantasia: data.fantasia,
                contato: data.contato,
                telefone: data.telefone,
                email: data.email,
                logradouro: data.logradouro,
                numero: data.numero,
                complemento: data.complemento,
                bairro: data.bairro,
                cidade: data.cidade,
                estado: data.estado,
                cep: data.cep
            };

            $http.put(config.url + '/client/' +data.cnpj, dados)
                .then(function(result) {
                    if (result.status === 201) {
                        $.notify({
                            icon: 'ti-check',
                        	title: 'Cliente atualizado',
                        	message: `O cliente <b>${data.razao}</b> foi atualizado com sucesso.`,
                        },{type: 'success'});
                        $rootScope.spinner = false;
                    } else {
                        swal({
                            title: 'Erro ao atualizar',
                            text: `Houve um erro ao tentar atualiza o cliente.`,
                            timer: 5000,
                            type: 'error'
                        });
                        $rootScope.spinner = false;
                    }

                });
        }

        // Ativar ou desativar o cliente
        function userStatus(cnpj, status) {
            $http.get(`{config.url}/client/status/${cnpj}/{$status}`)
                .then(function (result) {
                    console.log(result.data);
                });
        }
    }
})();
