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
function getJson() {
   var StatsObject =  StatisticsCache.get("statsJson");
    return StatsObject.statsJson;
}

function analyzeStatistics(body) {
    var JsonAsObject = body; //JSON.parse(body);
    var result = {};
    var i;
    console.log("lenght is " + JsonAsObject.length);
    for(i = 0; i < JsonAsObject.length; i++) {

        var date = JsonAsObject[i].time.split(" ")[0];
        var time = JsonAsObject[i].time.split(" ")[1];
        var tagid = JsonAsObject[i].tagid;
        if (result[tagid] == undefined) {
            result[tagid] = {};
            console.log("Tag id added to object: " + JsonAsObject[i].tagid )
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

        result[JsonAsObject[i].tagid][date][time].served += JsonAsObject[i].served;
        result[JsonAsObject[i].tagid][date][time].inited += JsonAsObject[i].inited;
        result[JsonAsObject[i].tagid][date][time].def += JsonAsObject[i].def;
    }
    StatisticsCache.set("statsJson", result, function(err, success) {
        console.log("JSON Object has been added to cache");
    });
}

module.exports.getJson = getJson;
module.exports.StatsCache = StatisticsCache;