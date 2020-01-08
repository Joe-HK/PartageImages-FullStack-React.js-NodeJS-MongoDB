/**
 */
let _map = {
    'Access-control-Allow-Headers': 'X-Requested-With, content-type, access_token',
    'Access-control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-control-Allow-Credentials': true,
    'Cache-Control': 'public'
};

let _setHeader = (response, header, value) => response.setHeader(header, value);

module.exports = allowedCors => {
    return (request, response, next) => {
        let origin = request.headers.origin;
        if (origin) {
            response.setHeader('Access-Control-Allow-Origin', origin);
        }

        Object.keys(_map).forEach(
            key => _setHeader(response, key, _map[key])
        );

        next();
    };
};
