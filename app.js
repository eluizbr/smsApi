const express = require('express'),
    app = express(),
    path = require('path'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    cors = require('cors');


const port = process.env.PORT || 3000;

// morgan
app.use(morgan('dev'));

// Run Helmet
app.use(helmet());

app.use(cors());

// viewed at http://localhost:3000
app.use(express.static('./'));

app.use('/js', express.static(__dirname + '/assets/js'));
app.use('/css', express.static(__dirname + '/assets/css'));
app.use('/partials', express.static(__dirname + '/app'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
});

// Run server
app.listen(port, ()=> {
    console.log(`Running on port ${port}`);
});
