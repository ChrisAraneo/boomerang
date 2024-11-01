import commandLineArgs from 'command-line-args';

import { Boomerang } from './boomerang.class';
import { HttpClient } from './http/http-client.class';
import { Logger } from './logger.class';

const DEFAULT_DEBOUNCE_TIME = 5000;

const logger = new Logger();
let options = null;

try {
  options = commandLineArgs([
    { name: 'url', alias: 'u', type: String, defaultOption: true },
    { name: 'debounce', alias: 'd', type: Number },
  ]);
} catch (e: unknown) {
  logger.error(e.toString());
}

(() => {
  let debounceTime: number;

  logger.info(`Boomerang v0.1.0`);
  logger.info(`Arguments: ${JSON.stringify(options)}`);

  if (!options['url']) {
    logger.error(
      'URL is not defined. Run script with --url for example: "npm run start --url http://localhost:8080/" or "node index.js --url http://localhost:8080/"',
    );

    return;
  }

  if (!options['debounce']) {
    logger.warn(
      `Debounce time argument is not defined. Setting to default ${DEFAULT_DEBOUNCE_TIME}`,
    );
    debounceTime = DEFAULT_DEBOUNCE_TIME;
  } else {
    logger.info(`Debounce time: ${debounceTime}`);
  }

  const httpClient = new HttpClient();

  const boomerang = new Boomerang(
    options['url'],
    debounceTime,
    logger,
    httpClient,
  );

  boomerang.run();
})();
