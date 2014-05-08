'use strict';

eventsApp.controller('EventController',

    function EventsController($scope) {

        $scope.event = {
            name: 'Angular Boot Camp',
            date: '1/1/2013',
            time: '10:30 am',
            location: {
                address: 'Bend Appartment',
                city: 'Mouuntain View',
                province: 'CA'
            },
            imageUrl: '/img/AngularJS-large.png',
            sessions: [
                {
                    name: 'Session number 2',
                    creationName: 'Bend',
                    upVoteCount: 0
                },
                {
                    name: 'Session number 1',
                    creationName: 'Moshe',
                    upVoteCount: 0
                },
                {
                    name: 'Session number 3',
                    creationName: 'David',
                    upVoteCount: 0
                }
            ]
        }
        $scope.upVoteSession = function(session) {
            session.upVoteCount++;
        };

        $scope.downVoteSession = function(session) {
            session.upVoteCount--;
        };


});