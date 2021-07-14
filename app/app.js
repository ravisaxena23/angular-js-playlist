// create app of angular module(appname, dependency)
var app = angular.module('app', ['ngRoute', 'ngAnimate']);

// controller before application run it is also used for routing did not need $scope. 
// templateUrl connect to differnent html file and controller provide data
// redirectTo do as its name suggests.

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'appController'
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'appController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'contactController'
        })
        .when('/contact-success', {
            templateUrl: 'views/contact-success.html',
            controller: 'contactController'
        })
        .otherwise({
            redirectTo: '/home'
        })
}]);

// // controller when application run
// app.run(function(){
// })

// controllers module name.controller('controllerName',['depedency/scope/argument'],function(depedency/scope/argument)) 
// [] is used to remove error during minification

app.controller('appController', ['$scope', '$http', function ($scope, $http) {

    $scope.removeNinja = function (ninja) {
        var removedNinja = $scope.ninjas.indexOf(ninja);
        // to remove object/array value
        $scope.ninjas.splice(removedNinja, 1)
    }

    // add new  object after input
    $scope.addNinja = function () {
        $scope.ninjas.push({
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            rate: parseInt($scope.newninja.rate),
            available: true
        });

        $scope.newninja.name = "",
            $scope.newninja.belt = "",
            $scope.newninja.rate = ""
    }


    $http.get('data/ninjas.json').then(function (data) {
        $scope.a = data;
        $scope.ninjas = $scope.a.data
    }, function () {
        console.log("error")
    })

    $scope.removeAll = function () {
        $scope.ninjas = [];
    }

}])

// to create custom directive
app.directive('randomNinja', [function () {
    return {
        restrict: 'E',
        scope: {
            ninjas: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        // transclude help to show data or html present b/w custom directive
        transclude: true,
        // replace replaces the name of the custom tag with the first html tag it finds in templateUrl
        replace: true,
        controller: function ($scope) {
            $scope.random = Math.floor(Math.random() * 4);
        }
    };
}])

// contact controller
app.controller('contactController', ['$scope', '$location', function ($scope, $location) {
    $scope.sendMessage = function () {
        $location.path('/contact-success')
    }
}])