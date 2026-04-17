const writeLog = (level, message, meta) => {
  const timestamp = new Date().toISOString();
  const payload = meta ? ` ${JSON.stringify(meta)}` : '';
  console.log(`[${timestamp}] [${level}] ${message}${payload}`);
};

export const logger = {
  info: (message, meta) => writeLog('INFO', message, meta),
  warn: (message, meta) => writeLog('WARN', message, meta),
  error: (message, meta) => writeLog('ERROR', message, meta)
};