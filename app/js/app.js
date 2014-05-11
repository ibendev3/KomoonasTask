'use strict';

google.load('visualization', '1', {packages:['corechart']});

google.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['KomoonaStatsApp']);
});


// Declare app level module which depends on filters, and services
var komoonasStats = angular.module('KomoonaStatsApp', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/',
            {
                templateUrl: 'template/HomeView.html',

            }).when('/dailyView',
            {
                templateUrl: 'template/DailyView.html',
                controller: 'DailyController'
            }).otherwise({
                redirectTo: '/'
            });
        $locationProvider
            .html5Mode(true)
            .hashPrefix('!');


    });
