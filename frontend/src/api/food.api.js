import { apiFetch, authHeaders } from './client'

export function searchFood(query) {
  return apiFetch(`/api/food/search?q=${encodeURIComponent(query || '')}`, {
    headers: authHeaders(),
  })
}

export function createCustomFood(payload) {
  return apiFetch('/api/food/custom', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })
}
