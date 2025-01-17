const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs/app.log');

const log = (message) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
};

module.exports = { log };
