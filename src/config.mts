export const config = createConfig();

export function createConfig(): Config {
  return {
    isDev: process.env.NODE_ENV === "develop",
    server: { port: 30000 },
  };
}

export interface Config {
  isDev: boolean;
  server: ServerConfig;
}

export interface ServerConfig {
  port: number;
}
