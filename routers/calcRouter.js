var calcRouter = require('express').Router();
//middleware
calcRouter.use(function(request, response, next){
    const firstParam = request.query.first;
    const secondParam = request.query.second;
    if ( !firstParam ) {
        return error(response, {status : 400, message : "Missing required parameter 'first'" });
    }
    if ( !secondParam ) {
        return error(response, {status : 400, message : "Missing required parameter 'second'" });
    }
    var first = parseFloat(firstParam);
    var second = parseFloat(secondParam);
    if ( isNaN(first) ) {
        return error(response, {status : 400, message : "The parameter 'first' is not a number" });
    }
    if ( isNaN(second) ) {
        return error(response, {status : 400, message : "The parameter 'second' is not a number" });
    }
    request.first = first;
    request.second = second;
    next(); // go handle the request
});

calcRouter.route('/add')
    .get(function(request, response){
        return validResponse(response, request.first + request.second);
    });

calcRouter.route('/sub')
    .get(function (request, response) {
        return validResponse(response, request.first - request.second);
    });
calcRouter.route('/mul')
    .get(function (request, response) {
        return validResponse(response, request.first * request.second);
    });
calcRouter.route('/div')
    .get(function (request, response) {
        if ( request.second == 0 ) {
            return error(response, {status : 400, message : "Dividing by zero is not allowed"});
        }
        return validResponse(response, request.first / request.second);
    });

function error(response, err) {
    response.statusCode = err.status;
    response.type("text/plain");
    response.send(err.message);
}

function validResponse(response, result) {
    response.type('application/json');
    response.statusCode = 200;
    response.send({"result" : result});
}
module.exports = calcRouter;