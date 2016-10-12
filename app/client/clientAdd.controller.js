(function () {
    'use strict';

    angular
        .module('enviou')
        .controller('AddClientController', AddClientController);

    AddClientController.$inject = ['config', '$rootScope', '$scope', '$http', '$state'];

    function AddClientController (config, $rootScope, $scope, $http, $state) {

        var vm = this;
        vm.cnpjOK = false;
        vm.cepOK = false;
        $rootScope.spinner = false;

        vm.checkUsername = checkUsername;
        vm.checkZIP = checkZIP;
        vm.criarClient = criarClient;

        // Checa se o username existe
        function checkUsername(username) {
            vm.wrongUser = true;
            try {
                if (username.target.value.length >= 3) {
                    $http.get(config.url + '/client/username/' + username.target.value)
                        .then(function (result) {

                            if (result.data.success) {
                                vm.wrongUser = false;
                            }
                        });
                }
            } catch (err) {}
        }

        // Checa se o CPRF é válido
        $scope.$watch('vm.form.cprf', function (cprf) {
            try{
                if (cprf.length >= 14){
                    $http.get(config.url + '/client/cprf/' + cprf)
                        .then(function (result) {
                            if (result.data.CPRF) {

                                vm.cnpjOK = true;

                            }  else if (result.data.error === 10) {
                                vm.cnpjOK = false;
                                document.getElementById('cprf').value='';
                                swal({
                                    title: 'CNPJ em uso!',
                                    text: `O CNPJ ${cprf}, já esta cadastrado no sistema.`,
                                    timer: 3000,
                                    type: 'info'
                                });
                            } else {
                                vm.cnpjOK = false;
                                document.getElementById('cprf').value='';
                                swal({
                                    title: 'Erro no CNPJ!',
                                    text: `O CNPJ ${cprf}, não é válido.`,
                                    timer: 3000,
                                    type: 'error'
                                });
                            }
                        });
                } else {
                    vm.cnpjOK = false;
                }
            } catch (err) {}
        });

        // Procura pelo cep
         function checkZIP(zip){
            try{
                if (zip.target.value.length === 9){

                    swal({
                      title: `Pesquisando o CEP ${zip.target.value}...`,
                      type: 'info',
                    });

                    $http.get(config.url + '/cep/' +zip.target.value)
                        .then(function(result) {
                            vm.cepOK = true;
                            vm.form.logradouro = result.data.logradouro;
                            vm.form.bairro = result.data.bairro;
                            vm.form.cidade = result.data.cidade;
                            vm.form.estado = result.data.estado;

                            vm.wrongZip = true;

                            swal({
                                title: 'CEP encontrado',
                                text: `O CEP ${zip.target.value}, foi encontrato com sucesso.`,
                                type: 'success',
                                timer: 2000
                            });

                            $rootScope.spinner = false;

                        })
                        .catch(function(err) {
                            vm.wrongZip = false;
                            swal({
                                title: 'Erro no CEP',
                                text: `O CEP <b>${zip.target.value}</b> não existe na base dos correios.`,
                                timer: 2000,
                                type: 'error'
                            });
                            $rootScope.spinner = false;
                        });
                }
            } catch (err){}
        }

        // Cria um novo cliente
        function criarClient(client) {

            let dados = {
                cnpj: client.cprf,
                username: client.username,
                razao: client.razao,
                fantasia: client.fantasia,
                contato: client.contato,
                telefone: client.telefone,
                email: client.email,
                cep: client.cep,
                logradouro: client.logradouro,
                numero: client.numero,
                complemento: client.complemento,
                bairro: client.bairro,
                cidade: client.cidade,
                estado: client.estado
            };

            $http.post(config.url + '/client/', dados)
                .then(function (doc) {
                    if (doc.status === 201) {

                        $.notify({
                            icon: 'ti-check',
                            message: `O cliente ${client.razao} foi criado com sucesso.`,
                            title: 'Cliente Criado com sucesso.',
                            delay: 50000,

                        },{type: 'success'});

                        $state.go('main.clients');

                    }
                })
                .catch(function (err) {
                    $.notify({
                        icon: 'ti-info',
                        message: `Houve um erro ao criar o cliente ${client.razao}.`,
                        title: 'Erro ao criar o cliente',
                        delay: 50000,
                    },{type: 'danger'});
                });
        }


    }
})();
