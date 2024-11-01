/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

const source = path.normalize(`${__dirname}/../src/assets/ping.mp3`);
const destination = path.normalize(`${__dirname}/../dist/ping.mp3`);

fs.copyFile(source, destination, (error) => {
  if (error) {
    throw err;
  }
  console.log(`\nping.mp3 was copied to ${destination}\n`);
});
