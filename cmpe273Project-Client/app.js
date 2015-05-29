
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , checkpoint = require('./routes/checkpoint')
  , report = require('./routes/report')
  , http = require('http')
  , path = require('path');


var app = express();
var homepage = require('./routes/schedule');
var building = require('./routes/building');
var UserSignIn = require('./routes/UserSignIn');
var client = require('./routes/client');
var guard = require('./routes/guard');
var alert = require('./routes/alert');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'xyz12345'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/checkpoint', checkpoint.addCheckPoint);
app.post('/checkpoint/update/:check_point_id', checkpoint.updateCheckPoint);
app.post('/deleteCheckpoint', checkpoint.removeCheckPoint);
app.post('/getCheckPointForBuilding', checkpoint.getCheckPointForBuilding);
app.get('/checkpoint/:check_point_id', checkpoint.getCheckPoint);

app.get('/homepage/getSchedule', homepage.getSchedule);
app.post('/homepage/addSchedule', homepage.addSchedule);
app.put('/homepage/updateSchedule', homepage.updateSchedule);
app.get('/homepage/deleteSchedule', homepage.deleteSchedule);
app.get('/building/showBuilding', building.showBuilding);
app.post('/building/addBuilding', building.addBuilding);
app.post('/building/updateBuilding', building.updateBuilding);
app.get('/building/deleteBuilding', building.deleteBuilding);
app.post('/UserSignIn/signin', UserSignIn.signin);
app.post('/UserSignIn/signup', UserSignIn.signup);
app.post('/client',client.addClient);
app.get('/client/:client_id',client.getClient);
app.get('/clients',client.getAllClients);
app.post('/deleteClient',client.deleteClient);
app.get('/generateBill',client.generateBill);
app.get('/goToClientsHome',client.goToClientHome);
app.get('/goToGuardsHome',guard.goToGuardsHome);

//added by Vedang
app.get('/redirectToAddBuildings',building.redirectToAddBuildings);
app.get('/redirectToEditBuildings',building.redirectToEditBuildings);
app.get('/view_building',building.view_building);
app.post('/getBuildingDetails',building.getBuildingDetails);
app.get('/client_redirect',client.redirectToAddClient);
app.get('/guardList',guard.displayGuard);
app.get('/checkpoint_redirect',checkpoint.redirectToAddBuildings);

//added by Pranav
app.get('/alert/get_alert', alert.get_alert);
app.post('/alert/create_alert', alert.create_alert);

app.get('/report',report.report);
app.get('/getbuildingId',report.getbuildingId);
app.get('/getfilteredReport',report.getfilteredReport);

app.post('/addGuard',guard.addGuard);
app.get('/searchGuard', guard.displayGuard);
app.post('/updateGuard',guard.updateGuard);
app.post('/deleteGuard',guard.deleteGuard);
app.get('/assignGuard',guard.assignGuard);
app.get('/redirectToGuards',guard.redirectToGuards);
app.get('/redirectToAddGuard',guard.redirectToAddGuard);
app.post('/clientbuild', building.clientBuilding);
app.get('/getclient', client.getAllClients);
app.get('/alert', alert.alert);
app.get('/getAlert', alert.list_alert);
app.get('/redirectToSignUp',UserSignIn.redirectToSignUp);
app.get('/getClientAndBuilding',guard.getClientAndBuilding);
app.post('/assignGuard', guard.assignGuard);
app.get('/getAllGuards', guard.getAllGuards);
app.get('/redirectToAssignGuard', guard.redirectToAssignGuard);
app.get('/redirectToUpdateGuard', guard.redirectToUpdateGuard);
app.post('/getGuardLocation', guard.getGuardLocation);
app.get('/diplay_location_guard', guard.diplay_location_guard);
app.get('/getGuard', guard.getGuard);
app.get('/getCheckPointGetGuard', checkpoint.getCheckPointGetGuard);
app.get('/goToUpdate', client.goToUpdateClient);
app.post('/updateClient', client.updateClient);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
