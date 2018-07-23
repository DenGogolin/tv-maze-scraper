import * as nconf from "nconf";
import { join } from "path";

export function initConfig() {
  const conf = new nconf.Provider({
    env: true,
    argv: true
  });
  const basePats = join(process.cwd(), `/config`);
  const env = conf.get(`NODE_ENV`) || `development`;
  conf.file(env, join(basePats, `${env.toLowerCase()}.json`));
  conf.file(`default`, join(basePats, `./default.json`));
  return conf;
}
