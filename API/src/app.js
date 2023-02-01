const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken') 
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const routes = require('./routes/index');
const YAML = require('yamljs');

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

const swaggerDocument = YAML.load('./src/docs/doc.yaml');
const swaggerUi = require('swagger-ui-express');

var options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Documentacion API",
  customfavIcon: "/assets/favicon.ico"
};

app.use('/', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

module.exports = app