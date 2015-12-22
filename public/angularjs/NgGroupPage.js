var app = angular.module('groupPage', [ "ui.bootstrap" ]);

app.controller('groupPageController', function($scope, $http, $window) {
	
	$scope.funcInit = function(userid,firstname,groupId){
		$scope.user_id=userid;
		$scope.first_name=firstname;
		$scope.getPending(userid);
		$scope.groupId = groupId;
		$scope.getGroup(groupId);
		$scope.getMember(groupId,userid);
		console.log("groupId"+groupId);
		
	};
	$scope.getMember = function(id){
	       $http({
				method : "GET",
				url : '/getMember',
				params : {
					"groupId" : id
				}
			}).success(function(data) {
				console.log("in member list");
				$scope.memList=data;
				console.log(data);
			}).error(function(error) {

			});
		
		};
		
		$scope.delMember = function(userId,groupId){
		       $http({
					method : "GET",
					url : '/delMember',
					params : {
						"userId" : userId,
						"groupId" : groupId
					}
				}).success(function(data) {
					$scope.memList=data;
					console.log(data);
				}).error(function(error) {

				});
			
			};
	$scope.getGroup = function(id){
	       $http({
				method : "GET",
				url : '/getGroupFromId',
				params : {
					"groupId" : id
				}
			}).success(function(data) {
				$scope.groupList=data;
				console.log(data);
			}).error(function(error) {

			});
		
		};
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
	
	$scope.addMember = function(groupid) {
		$http({
			method : "GET",
			url : '/addMember',
			params : {
				"groupId" : $scope.groupId,
				"usrName" : $scope.usrName
			}
		}).success(function(data) {
			$scope.memList = data;
			console.log($scope.users);
		}).error(function(error) {

		});
	};

});
