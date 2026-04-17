import { db } from '../../config/db.js';

export const checkHealth = async () => {
  await db.query('SELECT 1');

  return {
    status: 'ok',
    service: 'api',
    timestamp: new Date().toISOString()
  };
};