komoonasStats.controller('DailyController',
    function DailyController($scope, $log, $http) {
        $scope.chosenTags = new Array();

        var responsePromise = $http.get("http://komstats.cloudapp.net:81/kstats");

        responsePromise.success(function(data, status, headers, config) {
           $scope.originalStatisticData = data;
           $scope.chartType = 2;
           $scope.tagsList = getTagsAndDatesDataArranged(data, $scope);
           $scope.data = buildDailyVolData(data, $scope.tagsList, $scope.dayDisplayed, $scope);
           $scope.chart = buildDailyLinareChart($scope.data);

        });
        responsePromise.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });

        $scope.selectDay = function(type) {
            $log.info("Chart type has been change to " + type);
            $scope.dayDisplayed = type;

        }
        $scope.$watch('dayDisplayed', function (n, o) {
            if (n == undefined)
                return;

            $scope.data = buildDailyVolData($scope.originalStatisticData,  $scope.dayDisplayed, $scope);
            $scope.chart.data = $scope.data;
        }, true);


        $scope.$watch('chart', function (n, o) {
            if (n == undefined)
                return;
            $scope.drawnChart.draw($scope.chart.data, $scope.chart.options);

        }, true);




    });

function buildDailyVolData(originalStatisticData, dayDisplayed, $scope) {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Hour a Day');
    data.addColumn('number', 'Inited Requests');
    data.addColumn('number', 'Served');
    data.addColumn('number', 'Default');

    var intTime;
    for (intTime = 0; intTime < 24; intTime++) {
        data.addRows([buildColumnObject(intTime, originalStatisticData, dayDisplayed, $scope)]);
    }

    return data;

}


function buildColumnObject(intTime, originalStatisticData, dayDisplayed, $scope) {
    var served = 0, inited  = 0, def = 0;
    if ($scope.chosenTags == undefined || $scope.chosenTags.length == 0) {
        var tagList = $scope.tagsList;
    } else  {
        var tagList = _.flatten($scope.chosenTags);
    }

    for (tag in tagList) {
            stringT = numericTimeToString(intTime);
            if (originalStatisticData[tagList[tag]] == undefined) {
                continue; // Not reasonable [Means there is no data for this tag]
            }
            if (originalStatisticData[tagList[tag]][dayDisplayed] == undefined) {
                continue; // Reasonable - [Means a specific tag has no data for a certain date]
            }
            if (originalStatisticData[tagList[tag]][dayDisplayed][stringT]== undefined) {
                continue; // Reasonable - [Means this tag has missing data for this specific hour]
            }
            served += originalStatisticData[tagList[tag]][dayDisplayed][stringT].served;
            inited += originalStatisticData[tagList[tag]][dayDisplayed][stringT].inited;
            def += originalStatisticData[tagList[tag]][dayDisplayed][stringT].def;
    }
    return [intTime, inited,served, def];
}

function buildDailyLinareChart(data) {
    var chart = {};
    var options = {
        'legend':'bottom',
        'title':'Customer Statistics - Daily Volume',
        'is3D':true,
        'width':1200,
        'height':500,
        'isStacked': true,
        hAxis: {title: 'Hour in the day', titleTextStyle: {color: 'red'}, gridlines: { count: 24 } },
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

function getTagsAndDatesDataArranged(data, $scope) {
    var retTags = {};
    var retDays = {};
    var index = 0, jdex = 0;
    for (key in data) {
        retTags[index++] = key;
        for (day in data[key]) {
            retDays[jdex++] = day;
        }
    }
    $scope.daysData = _.unique(retDays); // A List of uniq days we have data for
    $scope.dayDisplayed = $scope.daysData[$scope.daysData.length-1];
    return retTags;

}

function numericTimeToString(intTime) {
    if (intTime > 23 || intTime < 0) {
        console.log("Invalid time received, returning midnight");
        return '00:00:00';
    }

    if (intTime < 10) {
        return '0' + intTime + ':00:00';
    } else return intTime + ":00:00";
}

function tagIdSelectionChange(element, toAdd, $scope) {
    if (toAdd)
        $scope.chosenTags.push(element);
    else {
        var index = $scope.chosenTags.indexOf(element);
        if (index > -1) {
            $scope.chosenTags.splice(index, 1)
        }
    }

    $scope.data = buildDailyVolData($scope.originalStatisticData,  $scope.dayDisplayed, $scope);
    $scope.chart.data = $scope.data;
    $scope.drawnChart.draw($scope.chart.data, $scope.chart.options);

}