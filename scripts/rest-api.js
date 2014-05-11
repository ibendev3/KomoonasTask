var restify = require('restify');
var statisticsHandler = require('./stats-handler');


function respond(req, res, next) {
    res.setHeader('content-type', 'text/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.send(200, JSON.stringify(statisticsHandler.getJson()));
    res.end();
}

var startServer = function startRestServer() {
    var server = restify.createServer();
    server.get('/kstats', respond);
    server.use(restify.CORS());
    server.use(restify.fullResponse());

    server.listen(8081, function () {
        console.log('%s listening at %s', server.name, server.url);
    });
}

module.exports.start = startServer;

