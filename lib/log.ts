/* lib/log.ts */
// Simple structured logger with log level gating

type LogLevel = "debug" | "info" | "warn" | "error";

const levels: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function currentLevel(): LogLevel {
  const lvl = (process.env.NEXT_PUBLIC_LOG_LEVEL || "debug").toLowerCase();
  if (lvl === "info" || lvl === "warn" || lvl === "error") return lvl;
  return "debug";
}

function shouldLog(level: LogLevel): boolean {
  return levels[level] >= levels[currentLevel()];
}

function stamp() {
  return new Date().toISOString();
}

export function logDebug(message: string, context?: unknown) {
  if (!shouldLog("debug")) return;
  // eslint-disable-next-line no-console
  console.debug(`[DEBUG ${stamp()}] ${message}`, context ?? "");
}

export function logInfo(message: string, context?: unknown) {
  if (!shouldLog("info")) return;
  // eslint-disable-next-line no-console
  console.info(`[INFO  ${stamp()}] ${message}`, context ?? "");
}

export function logWarn(message: string, context?: unknown) {
  if (!shouldLog("warn")) return;
  // eslint-disable-next-line no-console
  console.warn(`[WARN  ${stamp()}] ${message}`, context ?? "");
}

export function logError(message: string, context?: unknown) {
  if (!shouldLog("error")) return;
  // eslint-disable-next-line no-console
  console.error(`[ERROR ${stamp()}] ${message}`, context ?? "");
}


