komoonasStats.controller('DailyController',
    function DailyController($scope, $log, $http) {
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales', 'Expenses'],
            ['2004', 1000, 400],
            ['2005', 1170, 460],
            ['2006', 660, 1120],
            ['2007', 1030, 540]
        ]);
        var options = {
            title: 'Company Performance',
            animation:{
                duration: 1000,
                easing: 'out'
            }
        };

        $scope.chartTypes = [
            {typeName: 'LineChart', typeValue: '1'},
            {typeName: 'BarChart', typeValue: '2'},
            {typeName: 'ColumnChart', typeValue: '3'},
            {typeName: 'PieChart', typeValue: '4'}
        ];

        var chart = {};
        chart.data = data;
        chart.options = options;
        chart.type = $scope.chartTypes[0].typeValue;

        var username = 'aplotkin';
        var password = 'malaysia';

        var responsePromise = $http.get("http://www.komoona.com:8080/sample_data.json", {headers: {'Authorization': 'Basic ' + btoa(username + ":" + password)}});

        responsePromise.success(function(data, status, headers, config) {
            alert("Success")
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });

        $scope.selectChart = function(type) {
            $log.info("Chart type has been change");
            $scope.chart.type = type.typeValue;
        }
        $scope.drawChart = function() {
            $scope.drawnChart.draw($scope.chart.data, $scope.chart.options);
        }
        $scope.chartType = $scope.chartTypes[0];
        $scope.chart = chart;
    });
