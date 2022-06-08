export function info(...args: unknown[]): void {
  console.log("[INFO]", ...args);
}

export function debug(...args: unknown[]): void {
  // choose better name for this env
  if (Deno.env.get("DEBUG") === "1") {
    console.log("[DEBUG]", ...args);
  }
}
