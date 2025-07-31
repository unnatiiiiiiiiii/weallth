/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

const BASE_URL = 'https://weallth-backend.onrender.com/api';

/**
 * Fetch from /api/demo
 */
export async function fetchDemo(): Promise<DemoResponse> {
  const response = await fetch(`${BASE_URL}/demo`);
  if (!response.ok) {
    throw new Error('Failed to fetch /demo');
  }
  return response.json();
}

/**
 * Fetch from /api/ping
 */
export async function fetchPing(): Promise<{ message: string }> {
  const response = await fetch(`${BASE_URL}/ping`);
  if (!response.ok) {
    throw new Error('Failed to fetch /ping');
  }
  return response.json();
}
