
var app = angular.module('addEmpEdu', []);

app.controller('saveEmpEdu', function($scope, $http) {
	$scope.list = [];
	$scope.list1 = [];
	$scope.addNewEvent = function() {
		console.log("yaaaaaaaaay");
		console.log("human"+$scope.list1);
		console.log("userId" + $scope.user_id);
		$http({
			method : "POST",
			url : '/insertEvent',
			data : {
				"userId" : $scope.user_id,
				"event" : $scope.event,
				"yearOfEvent" : $scope.yearOfEvent,
			}
		}).success(function(data) {
			$scope.list1 = data;
			console.log($scope.list1);
		}).error(function(error) {

		});
	};
	$scope.addNewEmp = function() {
		console.log("yaaaaaaaaay");
		console.log($scope.list);
		console.log("userId" + $scope.user_id);
		$http({
			method : "POST",
			url : '/insertEduEmp',
			data : {
				"userId" : $scope.user_id,
				"empOrEdu" : $scope.empOrEdu,
				"name" : $scope.name,
				"from" : $scope.from,
				"to" : $scope.to
			}
		}).success(function(data) {
			$scope.list = data;
		}).error(function(error) {

		});
	};

});




