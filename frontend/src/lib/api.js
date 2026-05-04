// Central API base URL — uses VITE_API_URL in production, falls back to /api for local dev proxy
const API_BASE = import.meta.env.VITE_API_URL || "/api";

export default API_BASE;
