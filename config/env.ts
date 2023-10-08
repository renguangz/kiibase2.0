export const PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const PUBLIC_SELF_API_HOST = process.env.NEXT_PUBLIC_SELF_API_HOST || 'http://localhost:3000/api';
export const PUBLIC_API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:2108/api';
export const PUBLIC_STORAGE_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:2108/storage';
export const PUBLIC_API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 5000;
export const PUBLIC_JWT_COOKIE_NAME = process.env.NEXT_PUBLIC_JWT_COOKIE_NAME || 'token';
