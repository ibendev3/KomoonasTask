komoonasStats.directive('googleChart', function () {
    return {
        restrict: 'A',
        link: function ($scope, elm, attrs) {
            var chart = '';
            $scope.$watch('chart', function () {
                var type = $scope.chart.type;
                switch (type) {
                    case '1':
                        chart = new google.visualization.LineChart(elm[0]);
                        break;
                    case '2':
                        chart = new google.visualization.BarChart(elm[0]);
                        break;
                    case '3':
                        chart = new google.visualization.ColumnChart(elm[0]);
                        break;
                    case '4':
                        chart = new google.visualization.PieChart(elm[0]);
                        break;
                    default:
                        chart = new google.visualization.LineChart(elm[0]);

                }
                $scope.drawnChart = chart;
            }, true);

        }

    }

})
;