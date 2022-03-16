export function createConfig(): Config {
  return { server: { port: 30000 } };
}

export interface Config {
  server: ServerConfig;
}

export interface ServerConfig {
  port: number;
}
