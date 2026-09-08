const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://mangesh-solution-pvt-ltd-o542.vercel.app/api';

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('mangesh_token');

  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {})
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}