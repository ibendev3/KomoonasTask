komoonasStats.directive('googleChart', function () {
    return {
        restrict: 'A',
        link: function ($scope, elm, attrs) {
            var chart = new google.visualization.LineChart(elm[0]);

            $scope.drawnChart = chart;
        }

    }

});