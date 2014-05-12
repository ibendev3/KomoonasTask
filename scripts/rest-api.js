var restify = require('restify');
var statisticsHandler = require('./stats-handler');


function respondWithDailyStats(req, res, next) {
    res.setHeader('content-type', 'text/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.send(200, JSON.stringify(statisticsHandler.getDailyJson()));
    res.end();
}
function respondWithChainStats(req, res, next) {
    res.setHeader('content-type', 'text/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.send(200, JSON.stringify(statisticsHandler.getCahinStats()));
    res.end();
}
var startServer = function startRestServer() {
    var server = restify.createServer();
    server.get('/kstats', respondWithDailyStats);
    server.get('/chainstats', respondWithChainStats);
    server.use(restify.CORS());
    server.use(restify.fullResponse());

    server.listen(8081, function () {
        console.log('%s listening at %s', server.name, server.url);
    });
}

module.exports.start = startServer;

