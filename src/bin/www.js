#!/usr/bin/nodejs

import debugFunc from 'debug';
import app from '../app';

const debug = debugFunc('name-gen-server');

app.set('port', 3000);

const server = app.listen(app.get('port'), () => {
  debug(`Express server listening on port ${server.address().port}`);
});
