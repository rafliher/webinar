const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var https = require('https');

const app = express();

require('dotenv').config()

app.use(cors());//corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: true
}));

const db = require("./app/models");

db.sequelize.sync().then(() => {
	console.log('db synced');
}).catch(err => {
	console.log(err.message);
});

require('./app/routes/form.routes')(app);
require('./app/routes/static.routes')(app);

if (process.env.SSL_MODE=='ON') {
    var https_options = {
        key: fs.readFileSync(process.env.SSL_KEYPATH),
        cert: fs.readFileSync(process.env.SSL_CERTPATH),
        ca: [
            fs.readFileSync(process.env.SSL_CERTPATH),
            fs.readFileSync(process.env.SSL_CABUNDLEPATH)
        ]
    };
    const server = https.createServer(https_options, app).listen(process.env.HTTPS_PORT);
}

const PORT = process.env.HTTP_PORT || 8080;
app.listen(PORT, () => {
	console.log(`app is running on ${PORT}.`);
});

process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });