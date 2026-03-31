const rawApiUrl = import.meta.env.VITE_API_URL?.trim() || 'http://localhost:4000';
const normalizedBase = rawApiUrl.replace(/\/+$/, '');
const API_BASE_URL = /\/api$/i.test(normalizedBase) ? normalizedBase : `${normalizedBase}/api`;

function normalizePath(path) {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  return withLeadingSlash.replace(/^\/api(?=\/|$)/i, '') || '/';
}

export async function apiRequest(path, options = {}) {
  const { method = 'GET', body, token } = options;

  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${normalizePath(path)}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
