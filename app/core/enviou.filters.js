(function () {

    angular
        .module('enviou')
        .filter('cep', function () {
          return function (input) {
            var str = input + '';
            str = str.replace(/\D/g, '');
            str = str.replace(/^(\d{2})(\d{3})(\d)/, '$1.$2-$3');
            return str;
          };
        })
        .filter('cnpj', function () {
          return function (input) {
            // regex créditos Matheus Biagini de Lima Dias
            var str = input + '';
            str = str.replace(/\D/g, '');
            str = str.replace(/^(\d{2})(\d)/, '$1.$2');
            str = str.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            str = str.replace(/\.(\d{3})(\d)/, '.$1/$2');
            str = str.replace(/(\d{4})(\d)/, '$1-$2');
            return str;
          };
        })
        .filter('cpf', function () {
          return function (input) {
            var str = input + '';
            str = str.replace(/\D/g, '');
            str = str.replace(/(\d{3})(\d)/, '$1.$2');
            str = str.replace(/(\d{3})(\d)/, '$1.$2');
            str = str.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            return str;
          };
        })
        .filter('tel', function () {
          return function (input) {
            var str = input + '';
            str = str.replace(/\D/g, '');
            if (str.length === 11) {
              str = str.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else {
              str = str.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            }
            return str;
          };
        })
        .filter('startFrom', function() {
            return function(input, start) {
                start = +start; //parse to int
                return input.slice(start);
            };
        });

})();
