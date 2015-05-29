
var request = require('supertest')
, should = require('should')
, express = require('express')
,assert = require("assert")
,http = require("http");


var app = express();
app.use(express.cookieParser());



describe('cookie tests', function(){
	var app = express();

	app.use(express.cookieParser());

	app.get('/', function(req, res){
		res.cookie('cookie', 'test273');
		res.send();
	});

	app.get('/return', function(req, res){
		if (req.cookies.cookie) res.send(req.cookies.cookie);
		else res.send(':(')
	});

	var agent = request.agent(app);

	it('should save cookies', function(done){
		agent
		.get('/')
		.expect('set-cookie', 'cookie=test273; Path=/', done);
	})

	it('should send cookies', function(done){
		agent
		.get('/return')
		.expect('test273', done);
	})
})

describe('http tests', function(){

	it('should return the home page if the url is correct', function(done){
		http.get('http://localhost:3000/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('should not return the home page if the url is wrong', function(done){
		http.get('http://localhost:3000/home', function(res) {
			assert.equal(404, res.statusCode);
			done();
		})
	});

	it('should return list of clients if url is correct', function(done){
		http.get('http://localhost:3000/getclient', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});
});