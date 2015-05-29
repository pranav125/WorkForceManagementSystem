var redis = require('redis');
var client = redis.createClient(6379,"127.0.0.1");


var RedisCache = function () {
};

client.on("error", function (err) {
    console.log("Error connecting REDIS Cache Server " + err);
});

/**
 * Caching CLIENTS into REDIS database
 */
exports.cacheClients = function(clients) {
	client.set("select * from client", JSON.stringify(clients));
};

/**
 * Getting cached CLIENTS from REDIS database
 */
exports.getCachedClients = function(callback) {
	client.get("select * from client", function (err, reply){
		callback(err,JSON.parse(reply));
	});
}; 

/**
 * Caching GUARDS into REDIS database
 */
exports.cacheGuards = function(guards) {
	client.set("Select * from guard",JSON.stringify(guards));
};

/**
 * Getting cached GUARDS from REDIS database
 */
exports.getCachedGuards = function(callback) {
	client.get("Select * from guard", function (err, reply){
		callback(err,JSON.parse(reply));
	});
};

/**
 * Caching BUILDINGS into REDIS database
 */
exports.cacheBuildings = function(buildings) {
	client.set("BUILDINGS", JSON.stringify(buildings));
};

/**
 * Getting cached BUILDINGS from REDIS database
 */
exports.getCachedBuildings = function(callback) {
	client.get("BUILDINGS", function (err, buildings){
		callback(err,JSON.parse(buildings));
	});
}; /**
 * New node file
 */
