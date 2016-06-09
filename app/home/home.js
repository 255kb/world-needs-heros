'use strict';

angular.module('wnh.home', ['ngRoute', 'wnh.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ['$scope', 'Database', function ($scope, Database) {
        $scope.tabs = [
            {filter: 'day', title: 'Today'},
            {filter: 'week', title: 'Last week'},
            {filter: 'month', title: 'Last month'},
            {filter: 'all', title: 'Overall'}
        ];
        
        $scope.currentFilter = 'day';
                
        $scope.setFilter = function (filter) {
            $scope.currentFilter = filter;
        };
        
        Database.getPlayof($scope.currentFilter).$bindTo($scope, 'playofList');
    }]);