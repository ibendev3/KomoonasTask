var NodeCache = require( "node-cache" );
var http = require('http');

var StatisticsCache = new NodeCache( { stdTTL: 0, checkperiod: 0 } );


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
            //remoteRes.send(JSON.stringify(body));
            console.log(body);
        })
    }).on('error', function (e) {
        console.log("Got error: ", e);
    });
}
