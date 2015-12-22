var app = angular.module('home', [ "ui.bootstrap" ]);

app.controller('homeController', function($scope, $http, $window) {
	
	$scope.funcInit = function(userid,firstname){
		$scope.user_id=userid;
		$scope.first_name=firstname;
		console.log(firstname+"yaay");
		$scope.getPending(userid);
		$scope.getFriend(userid);
		$scope.getPost(userid);
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
	$scope.getFriend = function(userid){
       $http({
			method : "GET",
			url : '/getFriend',
			params : {
				"userId" : userid
			}
		}).success(function(data) {
           $scope.friendList = data;
		}).error(function(error) {

		});
		
	
	}
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
	$scope.getPost = function(userId) {
		$http({
			method : "GET",
			url : '/getPost',
			params : {
				"userId" : userId
			}
		}).success(function(data) {
			$scope.list = data;
			console.log($scope.list);
		}).error(function(error) {

		});

	};
	$scope.savePost = function() {
		console.log($scope.user_id);
		console.log($scope.first_name);
		console.log($scope.post);
		$http({
			method : "POST",
			url : '/insertPost',
			data : {
				"userId" : $scope.user_id,
				"firstName" : $scope.first_name,
				"post" : $scope.post,
			}
		}).success(function(data) {
			$scope.list = data;
			console.log($scope.list);
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

	$scope.getProfile = function($item, $model, $label) {
		$scope.selectedItem = $item;
		console.log("$item");
		console.log("yes here it is");
		console.log($scope.selectedItem.user_id);
		$window.location.href = "/othersProfile?user_id="
				+ $scope.selectedItem.user_id + "&first_name="
				+ $scope.selectedItem.first_name + "&last_name="
				+ $scope.selectedItem.last_name + "&email="
				+ $scope.selectedItem.email + "&phone_no="
				+ $scope.selectedItem.phone_no+ "&dob="
				+ $scope.selectedItem.dob;
		// $window.location.href = "/othersProfile?data="
		// +"[{'user_id':"+$item.user_id+ +"}]";
	};
});
