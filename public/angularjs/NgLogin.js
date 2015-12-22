
    var app = angular.module('signUp',[]);
    app.controller('signIn',function($scope){
    $scope.login = function(){
    console.log("hello hello" + $scope.emailPhone +$scope.password1);
    }
    });
    app.controller('saveData',function($scope){
    $scope.saveData = function(){
    var data = JSON.stringify({"firstName":$scope.firstName,"lastName":$scope.lastName,"phoneNo":$scope.phoneNo,"email":$scope.email,"password":$scope.password,"dob":$scope.dob});
 		
 		$.ajax({
 		
 			url:"/signUp",
 			data:data,
 			type:'POST',
 			contentType: "application/json",
 			
 			
 			success: function (result) {
 		        var frm = document.getElementById("signUpForm");
 			    frm.reset();  	
                alert("You are successfully signed up, Please Login");
   			},

    		error: function () {  
   				alert("error");
    		} 
 		});
        };
    });