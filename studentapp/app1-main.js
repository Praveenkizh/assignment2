var app1 = angular.module("app1", ["ngRoute", "studentModule"]);

app1.config(function($routeProvider){
   $routeProvider
       .when("/", {templateUrl: "app1-home.htm"})
       .when("/viewStudent", {templateUrl: "app1-view-student.htm"})
       .when("/createStudent", {templateUrl: "app1-create-student.htm"});
    
    
});