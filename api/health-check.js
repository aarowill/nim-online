const http = require('http');

const options = {
  host: 'localhost',
  port: 8081,
  timeout: 2000,
  method: 'GET',
  path: '/api/health',
};

// This file is hard-coded to work with the production config as it is meant to run in a docker container
const request = http.request(options, (result) => {
  console.info(`Performed health check, result ${result.statusCode}`);

  if (result.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', (err) => {
  console.error(`An error occurred while performing health check, error: ${err}`);
  process.exit(1);
});

request.end();
