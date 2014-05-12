komoonasStats.controller('ChainController',

    function ($scope, $http) {
        $scope.chartType = 1; //
        $scope.maxRequests = 0;
        var responsePromise = $http.get("/chain");

        responsePromise.success(function(data, status, headers, config) {
            $scope.originalStatisticData = data;
            $scope.tagsList = getTagsArranged(data, $scope);
            $scope.data = buildChainVisuData($scope.originalStatisticData, $scope);
            $scope.chart = buildChainLinareChart($scope.data);
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });

        $scope.selectTag = function(type) {
            $log.info("Chart type has been change to " + type);
            $scope.chosenTag = type;

        }
        console.log($scope.tagsList);
        $scope.$watch('[chosenTag, maxRequests]', function (n, o) {
            if (n == undefined || n === o)
                return;
            if (n[0] != o[0]) { //reset max request when tag id is changing
                $scope.maxRequests = 0;
            }
            $scope.data = buildChainVisuData($scope.originalStatisticData, $scope);
            $scope.chart.data = $scope.data;
        }, true);

        $scope.$watch('chart', function (n, o) {
            if (n == undefined)
                return;
            $scope.drawnChart.draw($scope.chart.data, $scope.chart.options);

        }, true);

    });
function buildChainLinareChart(data) {
    var chart = {};
    var options = {
        'legend':'bottom',
        'title':'Customer Statistics - Daily Volume',
        'is3D':true,
        'width':1200,
        'height':500,
        'isStacked': true,
        hAxis: {title: 'Chain ID', titleTextStyle: {color: 'red'}},
        vAxis: {title: 'Requests Inited', minValue: 0},
        bar: { groupWidth: '35%' },
        animation: {
            duration: 1000,
            easing: 'out'
        }
    };

    chart.data = data;
    chart.options = options;

    return chart;

}
function buildChainVisuData(originalStatisticData, $scope) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Chain ID');
    data.addColumn('number', 'Served');
    data.addColumn('number', 'Default');
    data.addColumn('number', 'Lost');


    for (chain in originalStatisticData[$scope.chosenTag]) {
        if ($scope.maxRequests > 0 && originalStatisticData[$scope.chosenTag][chain].inited > $scope.maxRequests)
            continue;
        data.addRows([buildChainColumnObject(chain, originalStatisticData, $scope)]);
    }

    return data;
};


function buildChainColumnObject(chain, originalStatisticData, $scope) {
    var served = 0, inited  = 0, def = 0;

    served += originalStatisticData[$scope.chosenTag][chain].served;
    inited += originalStatisticData[$scope.chosenTag][chain].inited;
    def += originalStatisticData[$scope.chosenTag][chain].def;

    return [chain, served, def, inited-served-def];
}

function getTagsArranged(data, $scope) {
    var retTags = {};
    var index = 0;
    for (key in data) {
        retTags[index++] = key;
    }

    $scope.chosenTag = retTags[0];
    return retTags;

}