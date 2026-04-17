const writeLog = (level, message, meta) => {
  const timestamp = new Date().toISOString();
  const payload = meta ? ` ${JSON.stringify(meta)}` : '';
  console.log(`[${timestamp}] [${level}] ${message}${payload}`);
};

const writeRaw = (message = '') => {
  console.log(message);
};

const divider = (char = '─', width = 58) => char.repeat(width);

const padLabel = (label, width = 14) => `${label.padEnd(width, ' ')}`;

export const logger = {
  info: (message, meta) => writeLog('INFO', message, meta),
  warn: (message, meta) => writeLog('WARN', message, meta),
  error: (message, meta) => writeLog('ERROR', message, meta),
  raw: writeRaw,
  startup: {
    banner: ({ title, subtitle }) => {
      writeRaw(divider());
      writeRaw(`${title}`);
      writeRaw(`${subtitle}`);
      writeRaw(divider());
    },
    section: (title) => {
      writeRaw('');
      writeRaw(title);
      writeRaw(divider('·', 24));
    },
    field: (label, value) => {
      writeRaw(`${padLabel(label)}: ${value}`);
    },
    service: (label, value) => {
      writeRaw(`- ${padLabel(label, 16)}: ${value}`);
    },
    ready: (message) => {
      writeRaw('');
      writeRaw(`Status`);
      writeRaw(divider('·', 24));
      writeRaw(`- ${message}`);
      writeRaw(divider());
    }
  }
};