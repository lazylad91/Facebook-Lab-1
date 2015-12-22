var app = angular.module('group', [ "ui.bootstrap" ]);

app.controller('groupController', function($scope, $http, $window) {
	
	$scope.funcInit = function(userid,firstname){
		$scope.user_id=userid;
		$scope.first_name=firstname;
		$scope.getPending(userid);
		$scope.getGroup(userid);
	};
	$scope.openGroup = function(groupId){
		$window.location.href = "/getGroupPage?groupId="
			+ groupId;
	}
	$scope.createGroup = function(){
		$http({
			method : "GET",
			url : '/createGroup',
			params : {
				"userId" : $scope.user_id,
				"grpName" : $scope.grpName,
				"grpDesc" : $scope.grpDesc,
				"adminName" : $scope.first_name
			}
		}).success(function(data) {
			$scope.groupList=data;
			console.log(data);
		}).error(function(error) {

		});
	}
	$scope.showCreateGroup = function(){
		$scope.createGrp = 'truthy';
	}
	$scope.deleteGroup = function(id){
	       $http({
				method : "GET",
				url : '/delGroup',
				params : {
					"groupId" : id,
					"userId" : $scope.user_id
				}
			}).success(function(data) {
				$scope.groupList=data;
				console.log(data);
			}).error(function(error) {

			});
		
		}
	$scope.getGroup = function(id){
       $http({
			method : "GET",
			url : '/getGroup',
			params : {
				"userId" : $scope.user_id
			}
		}).success(function(data) {
			$scope.groupList=data;
			console.log(data);
		}).error(function(error) {

		});
	
	}
	$scope.getPending = function(id){
		$http({
			method : "GET",
			url : '/getPending',
			params : {
				"userId" : $scope.user_id
			}
		}).success(function(data) {
			$scope.pending=data;
			console.log(data);
		}).error(function(error) {

		});
	};
	$scope.acceptReq= function(friendId){
		$http({
			method : "GET",
			url : '/acceptReq',
			params : {
				"userId" : $scope.user_id,
				"friendId" : friendId
			}
		}).success(function(data) {
           $scope.getPending($scope.user_id);
		}).error(function(error) {

		});
		
	};
	$scope.searchFB = function() {
		console.log($scope.searchText);
		$http({
			method : "GET",
			url : '/searchUser',
			params : {
				"searchText" : $scope.searchText
			}
		}).success(function(data) {
			$scope.users = data;
			console.log($scope.users);
		}).error(function(error) {

		});
	};
});
