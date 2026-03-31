import dotenv from 'dotenv';

dotenv.config();

const rawClientUrl = (process.env.CLIENT_URL || '').trim();
const fallbackDevClientUrl = 'http://localhost:5173';
const resolvedClientUrl = rawClientUrl || (process.env.NODE_ENV === 'production' ? '' : fallbackDevClientUrl);
const clientUrls = resolvedClientUrl
  .split(',')
  .map(url => url.trim())
  .filter(Boolean);

export const env = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: resolvedClientUrl,
  clientUrls,
  mongodbUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || ''
};

if (!env.mongodbUri) {
  throw new Error('Missing required environment variable: MONGODB_URI');
}

if (!env.jwtSecret) {
  throw new Error('Missing required environment variable: JWT_SECRET');
}

if (env.clientUrls.length === 0) {
  throw new Error('Missing required environment variable: CLIENT_URL');
}
