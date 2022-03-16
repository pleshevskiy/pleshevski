import { createConfig } from "./config.mjs";
import { createServer } from "./server.mjs";

main();

function main(): void {
  const config = createConfig();
  createServer(config.server);
}
