'use strict';

angular.module('wnh.home', ['ngRoute', 'wnh.services'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ['$scope', 'Database', function ($scope, Database) {
        var getTimeframeName = function (timeframe) {
            for (var index = 0; index < $scope.timeframes.length; index++) {
                if ($scope.timeframes[index].filter === timeframe) {
                    return $scope.timeframes[index].title;
                }
            }
        };

        $scope.timeframes = [
            {filter: 'day', title: 'Today'},
            {filter: 'week', title: 'Last week'},
            {filter: 'month', title: 'Last month'},
            {filter: 'all', title: 'Overall'}
        ];

        $scope.currentFilters = {
            timeframe: 'day',
            hero: ''
        };
        $scope.currentFiltersNames = {
            timeframe: 'Today',
            hero: ''
        };

        $scope.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        $scope.timeframeFilter = function (timeframe) {
            $scope.currentFilters.timeframe = timeframe;
            $scope.currentFiltersNames.timeframe = getTimeframeName(timeframe);
        };

        $scope.playofList = Database.getPlayof($scope.currentFilters);
    }]);