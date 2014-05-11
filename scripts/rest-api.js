var restify = require('restify');
var statisticsHandler = require('./stats-handler');


function respond(req, res, next) {
    res.end(JSON.stringify(statisticsHandler.getJson()));
}

var startServer = function startRestServer() {
    var server = restify.createServer();
    server.get('/kstats', respond);

    server.listen(8080, function () {
        console.log('%s listening at %s', server.name, server.url);
    });
}

module.exports.start = startServer;

