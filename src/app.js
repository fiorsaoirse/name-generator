import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes/index';

const app = express();
const { dir } = path.parse(__dirname);

// view engine setup
app.set('views', path.join(dir, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(dir, 'public')));


const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  headers: 'X-Requested-With,content-type,',
};

// Set CORS configs
app.use(cors(corsOptions));
app.options('*', cors());

app.use('/favicon.ico', (req, res, next) => next());

// add routes
app.use('/', routes);

// add bootstrap
app.use('/bootstrap', express.static(path.join(dir + '/node_modules/bootstrap/dist/css')));

// / error handlers

// / catch 404 and forwarding to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

export default app;
