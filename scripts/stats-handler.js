var NodeCache = require( "node-cache" );
var http = require('http');

var StatisticsCache = new NodeCache( { stdTTL: 0, checkperiod: 0 } );
retrieveKomoonasData();

function retrieveKomoonasData() {
    console.log("Start retrieving Komoona's stats");
    var username = 'aplotkin';
    var password = 'malaysia';

    var options = {
        host: 'www.komoona.com',
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
            var JsonAsObject = JSON.parse(body);
            var result = {};
            var i;
            console.log("lenght is " + JsonAsObject.length);
            for(i = 0; i < JsonAsObject.length; i++) {
                if (result[JsonAsObject[i].tagid] == undefined) {
                    result[JsonAsObject[i].tagid] = {};
                    console.log("Tag id added to object: " + JsonAsObject[i].tagid )
                }
                if (result[JsonAsObject[i].tagid][JsonAsObject[i].time] == undefined)
                    result[JsonAsObject[i].tagid][JsonAsObject[i].time] = {};
                if (result[JsonAsObject[i].tagid][JsonAsObject[i].time].served == undefined)
                    result[JsonAsObject[i].tagid][JsonAsObject[i].time].served = 0
                if (result[JsonAsObject[i].tagid][JsonAsObject[i].time].inited == undefined)
                    result[JsonAsObject[i].tagid][JsonAsObject[i].time].inited = 0
                if (result[JsonAsObject[i].tagid][JsonAsObject[i].time].def == undefined)
                    result[JsonAsObject[i].tagid][JsonAsObject[i].time].def = 0

                result[JsonAsObject[i].tagid][JsonAsObject[i].time].served += JsonAsObject[i].served;
                result[JsonAsObject[i].tagid][JsonAsObject[i].time].inited += JsonAsObject[i].inited;
                result[JsonAsObject[i].tagid][JsonAsObject[i].time].def += JsonAsObject[i].def;
            }
            StatisticsCache.set("statsJson", result, function(err, success) {
                console.log("JSON Object has been added to cache");
            });

        })
    }).on('error', function (e) {
        console.log("Got error: ", e);
    });
}
function getJson() {
   var StatsObject =  StatisticsCache.get("statsJson");
//    var count = 0;
//    for (var x in StatsObject.statsJson) {
//        count++;
//    }
    //console.log("Items are " + count);
    return StatsObject.statsJson;
}

module.exports.getJson = getJson;
module.exports.StatsCache = StatisticsCache;