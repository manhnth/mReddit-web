import { config } from 'dotenv';
// config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { VITE_APP_API_URL } = import.meta.env;

// config token expires time
export const EXPIRES_IN = 60 * 15 * 1000; // 15m
export const REFRESH_EXPIRES_IN = 60 * 60 * 24 * 7 * 1000; // 7 days
