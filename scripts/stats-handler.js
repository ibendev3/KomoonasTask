var NodeCache = require( "node-cache" );
var http = require('http');
var localJson = require('./sample_data.json');


var StatisticsCache = new NodeCache( { stdTTL: 0, checkperiod: 0 } );
//retrieveKomoonasData();
analyzeStatistics(localJson);
function retrieveKomoonasData() {
    console.log("Start retrieving Komoona's stats");
    var username = 'aplotkin';
    var password = 'malaysia';

    var options = {
        host: '23.23.150.175',
        port: 8080,
        path: '/sample_data.json',
        headers: {
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        }
    };

    http.get(options, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            console.log("Retrieving statistic has ended successfully");
            analyzeStatistics(body);

        })
    }).on('error', function (e) {
        console.log("Got error: ", e);
    });
}
function getDailyJson() {
   var StatsObject =  StatisticsCache.get("statsJson");
    return StatsObject.statsJson;
}

function getCahinStats() {
    var StatsObject =  StatisticsCache.get("chainJson");
    return StatsObject.chainJson;
}

function buildDailyStats(JsonAsObject) {
    var result = {};
    var i;
    for(i = 0; i < JsonAsObject.length; i++) {

        var date = JsonAsObject[i].time.split(" ")[0];
        var time = JsonAsObject[i].time.split(" ")[1];
        var tagid = JsonAsObject[i].tagid;
        if (result[tagid] == undefined) {
            result[tagid] = {};
        }
        if (result[tagid][date] == undefined)
            result[tagid][date] = {};
        if (result[tagid][date][time] == undefined)
            result[tagid][date][time] = {};
        if (result[tagid][date][time].served == undefined)
            result[tagid][date][time].served = 0
        if (result[tagid][date][time].inited == undefined)
            result[tagid][date][time].inited = 0
        if (result[tagid][date][time].def == undefined)
            result[tagid][date][time].def = 0

        result[tagid][date][time].served += JsonAsObject[i].served;
        result[tagid][date][time].inited += JsonAsObject[i].inited;
        result[tagid][date][time].def += JsonAsObject[i].def;
    }
    return result;
}
function buildChainStats(JsonAsObject) {
    var result = {};
    var i;
    for(i = 0; i < JsonAsObject.length; i++) {
        var tagid = JsonAsObject[i].tagid;
        var chain = JsonAsObject[i].chain;
        if (result[tagid] == undefined) {
            result[tagid] = {};
        }
        if (result[tagid][chain] == undefined)
            result[tagid][chain] = {};
        if (result[tagid][chain].served == undefined)
            result[tagid][chain].served = 0
        if (result[tagid][chain].inited == undefined)
            result[tagid][chain].inited = 0
        if (result[tagid][chain].def == undefined)
            result[tagid][chain].def = 0

        result[tagid][chain].served += JsonAsObject[i].served;
        result[tagid][chain].inited += JsonAsObject[i].inited;
        result[tagid][chain].def += JsonAsObject[i].def;
    }
    return result;
}
function analyzeStatistics(JsonAsObject) {
    var dailyStats = buildDailyStats(JsonAsObject);
    var chainStats = buildChainStats(JsonAsObject);
    StatisticsCache.set("statsJson", dailyStats, function(err, success) {
        if (!err)
            console.log("Daily statistics has been added to cache");
        else console.log("Error: Could not load data to cache, please reload server");
    });
    StatisticsCache.set("chainJson", chainStats, function(err, success) {
        if (!err)
            console.log("Chain statistics has been added to cache");
        else console.log("Error: Could not load data to cache, please reload server");
    });
}


module.exports.getDailyJson = getDailyJson;
module.exports.getCahinStats = getCahinStats;
module.exports.StatsCache = StatisticsCache;