var Router = require('react-router');
var React = require('react/addons');
var express = require('express');
var Iso = require('iso');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//Define Routes here
var bill = require('./routes/bill.routes');
var routes = require('./src/routes.jsx');
var alt = require('./src/libs/alt');
var app = express();
//In this file we take the local data set inside ./controllers/* and we parse it
//into a flux instance for the app.
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'copy cat', resave: true, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit : '50mb'}));
app.use(cookieParser());

//use Routes here
app.use('/',bill);

app.use(function (req, res) {
    alt.bootstrap(JSON.stringify(res.locals.data || {}));

    var iso = new Iso();

    Router.run(routes, req.url, function (Handler) {

        var content = React.renderToString(React.createElement(Handler));
        //Supply html markup and supply store state
        iso.add(content, alt.flush());
        res.render('index',{content:iso.render()});
    });
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {

    if(!err.status || err.status !== 404){
        err.status = 500;
    }

    console.log(err);

    res.status(err.status, err.stack.split("\n"));

    res.sendFile(path.resolve(__dirname+'/views/error/'+err.status+'.html'));

});

app.listen(8000, function () {
    console.log('Listening on localhost:8000');
});