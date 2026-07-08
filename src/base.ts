// Backend URLs. In development they come from .env.development (localhost:8080).
// In production builds no env values are set, so the app falls back to the
// origin it is served from — the reverse proxy forwards /api and /ws to the backend.
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || '/api';
export const API_BROKER_URL =
  (import.meta.env.VITE_API_BROKER_URL as string) ||
  `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws`;
