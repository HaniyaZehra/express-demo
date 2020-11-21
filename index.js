const Joi = require('joi');
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
app.use(logger);

//Configuration
console.log(`Application name: ${config.get('name')}`);
console.log(`Mail server name: ${config.get('mail.host')}`);

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  debug('Morgan enabled');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
