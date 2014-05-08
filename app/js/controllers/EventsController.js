'use strict';

eventsApp.controller('EventController',

    function EventsController($scope) {

        $scope.event = {
            name: 'Angular Boot Camp',
            date: '1/1/2013',
            time: '10:30 am',
            imageUrl: '/img/AngularJS-large.png'
        }


});