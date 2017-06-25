var studentModule = angular.module("studentModule",[]);

studentModule.controller("createStudentController", function($scope, studentFactory, studentService){
    $scope.master = {};
    
    $scope.update = function(student) {
        $scope.master = angular.copy(student);
        studentFactory.update($scope.master);
    };

       
    $scope.reset = function(form) {
        
        $scope.claim = angular.copy($scope.master);
    }
    
    $scope.reset();



});


studentModule.controller("viewStudentController", function($scope, studentFactory, studentService){

    $scope.delete = function (id) {
	alert(id);
        studentFactory.delete(id);
        //if ($scope.newcontact.id == id) $scope.newcontact = {};
    }

    $scope.edit = function (id) {
        $scope.student = angular.copy(studentFactory.get(id));
    }

    $scope.update = function(student) {
        $scope.master = angular.copy(student);
        studentFactory.update($scope.master);
    };

    $scope.students = studentFactory.list();
});

studentModule.factory("studentFactory", function(){
    

        var studentList = [];
    
        var thisService = {};
        
        thisService.update = function(student){
	    var found = 0;
	    for (i in studentList) {
                if (studentList[i].id == student.id) {
                    studentList[i] = student;
                    found = 1;
                }
            }
	    if (found == 0){
            studentList.push(student);
	    }
        } 

	thisService.delete = function(id){

            for(i in studentList){
			 if (studentList[i].id == id) {
                		studentList.splice(i, 1);
            		}
		}
        } 

	thisService.get = function (id) {
        for (i in studentList) {
            if (studentList[i].id == id) {
                return studentList[i];
            }
        }

    }

	thisService.edit = function (id) {
        $scope.master = angular.copy(thisService.get(id));

    }

        
        thisService.list = function(){
            return studentList;
        }
	

        
        return thisService;

});

studentModule.service("studentService", function(){    

        var studentList = [];
        
        this.update = function(student){

            var found = 0;
	    for (i in studentList) {
                if (studentList[i].id == student.id) {
                    studentList[i] = student;
                    found = 1;
                }
            }
	    if (found == 0){
            studentList.push(student);
	    }
        } 
	this.delete = function(id){

            for(i in studentList){
			 if (studentList[i].id == id) {
                		studentList.splice(i, 1);
            		}
		}
        } 

	this.get = function (id) {
        for (i in studentList) {
            if (studentList[i].id == id) {
                return studentList[i];
            }
        }

    }

this.edit = function (id) {
        $scope.master = angular.copy(this.get(id));

    }
	
        
        this.list = function(){
            return studentList;
        }

});

studentModule.filter('orderObjectsBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    // Filter out angular objects.
    var array = [];
    for(var objectKey in input) {
      if (typeof(input[objectKey])  === "object" && objectKey.charAt(0) !== "$")
        array.push(input[objectKey]);
    }

    var attributeChain = attribute.split(".");

    array.sort(function(a, b){

      for (var i=0; i < attributeChain.length; i++) {
        a = (typeof(a) === "object") && a.hasOwnProperty( attributeChain[i]) ? a[attributeChain[i]] : 0;
        b = (typeof(b) === "object") && b.hasOwnProperty( attributeChain[i]) ? b[attributeChain[i]] : 0;
      }

      return parseInt(a) - parseInt(b);
    });

    return array;
 }
});

