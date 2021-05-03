var app = angular.module('app', []);

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

app.controller('macroController',function macroController($scope, $http){

	$scope.list = [{
		id: 1,
					name: "MSP",
					//number: 28228,
					number: 54342,
					status: "available",
					image: "img/user.png"
	}];
		
			$scope.doCall = () => {
				startVideoConversation('0500');
				$scope.personCalling = "Selecta Privado";
			}

})