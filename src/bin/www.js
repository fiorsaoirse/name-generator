#!/usr/bin/nodejs

import debugFunc from 'debug';
import app from '../app';

const debug = debugFunc('name-gen-server');
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  debug(`Express server listening on port ${server.address().port}`);
});
