'use strict';

// Declare app level module which depends on views, and components
angular.module('wnh', [
    'firebase',
    'youtube-embed',
    'ngMaterial',
    'ngRoute',
    'wnh.home',
    'wnh.controllers',
    'wnh.components'
]).config(['$locationProvider', '$routeProvider', '$mdThemingProvider', function ($locationProvider, $routeProvider, $mdThemingProvider) {
    /*$mdThemingProvider.theme('default')
        .primaryPalette('brown')
        .accentPalette('yellow');*/

    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/'});
}]);