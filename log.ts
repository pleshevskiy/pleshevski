export function info(...args: unknown[]): void {
  console.log("[INFO]", ...args);
}

export function debug(...args: unknown[]): void {
  console.log("[DEBUG]", ...args);
}
