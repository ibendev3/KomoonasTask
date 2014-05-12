'use strict';

google.load('visualization', '1', {packages:['corechart']});

google.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['KomoonaStatsApp']);
});

var proccessWindow =  (function () {
    var pleaseWaitDiv = $('<div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header"><h1>Processing...</h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div>');
    return {
        showPleaseWait: function() {
            pleaseWaitDiv.modal();
        },
        hidePleaseWait: function () {
            pleaseWaitDiv.modal('hide');
        },

    };
})();
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
            }).when('/chainview', {
                templateUrl: 'template/ChainVisual.html',
                controller: 'ChainController'
            }).otherwise({
                redirectTo: '/'
            });
        $locationProvider
            .html5Mode(true)
            .hashPrefix('!');


    });
