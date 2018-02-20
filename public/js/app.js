(function(){

    var asaoApp = angular.module('asaoApp', ['firebase', 'ngMaterial']);

    asaoApp.controller('mainCtrl', ['$scope', '$firebaseArray', '$firebaseObject', '$mdDialog',
			function($scope, $firebaseArray, $firebaseObject, $mdDialog){
				var vm = this;
				var ref = firebase.database().ref().child("asado-app-20170209"); // referencia a los asados
				vm.nuevoAsado = function () {
					
					var confirm = $mdDialog.prompt()
                        .title('¿Cuál es el nombre del asado?')
                        .placeholder('Asao Peruano!')
                        .targetEvent()
                        .ok('Seguir')
                        .cancel('Me arrepentí');
					
					$mdDialog.show(confirm).then(function (nombre) {
						crearAsado(nombre);
            }, function () {
						console.log('se arrepintió');
					});
					
					function crearAsado(nombre){
						if (nombre && nombre.length) {
								vm.asadosArray = $firebaseArray(ref);
								vm.asadosArray.$add({
										nombre: nombre
								});

								// vm.asadosArray = $firebaseObject(ref);
								// vm.asadosArray.edad = nombre;
								// vm.asadosArray.$save();
						} 
					}
					
				};
				
				vm.verAsados = function() {
					vm.isAsadosDisplayed = true;
					vm.isDetailsDisplayed = false;
					vm.asadosArray = $firebaseArray(ref);
					vm.asadosObject = $firebaseObject(ref);
				};
				
				vm.verDetalles = function(asado) {
					vm.isAsadosDisplayed = false;
					vm.isDetailsDisplayed = true;
					vm.asadoActual = asado;
					asado.haSidoVisto = true;
					vm.asadosArray.$save(asado);
				};
				
				vm.anadirParticipante = function(){
					var confirm = $mdDialog.prompt()
							.title('¿Cuál es el nombre del participante?')
							.placeholder('Nombre del participante')
							.targetEvent()
							.ok('Seguir')
							.cancel('Me arrepentí');

					$mdDialog.show(confirm).then(function (nombre) {
						vm.asadoActual.participantes.push({
								nombre: nombre
						});
					}, function () {
							console.log('se arrepintió');
					});
        }
    }]);

})();
