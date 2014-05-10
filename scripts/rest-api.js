var restify = require('restify');

function respond(req, res, next) {
    retrieveKomoonasData(res);
}

var startServer = function startRestServer() {
    var server = restify.createServer();
    server.get('/kstats', respond);

    server.listen(8080, function () {
        console.log('%s listening at %s', server.name, server.url);
    });
}

module.exports.start = startServer;

