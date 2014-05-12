komoonasStats.directive('googleChart', function () {
    return {
        restrict: 'A',
        link: function ($scope, elm, attrs) {
            switch ($scope.chartType) {
                case 1:
                    var chart = new google.visualization.ColumnChart(elm[0]);
                    break;
                case 2:
                default:
                    var chart = new google.visualization.LineChart(elm[0]);

            }

            $scope.drawnChart = chart;
        }

    }

});