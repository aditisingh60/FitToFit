import { apiFetch, authHeaders } from './client'

export function getWater(date) {
  return apiFetch(`/api/water?date=${encodeURIComponent(date)}`, {
    headers: authHeaders(),
  })
}

export function logWater(payload) {
  return apiFetch('/api/water', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })
}

export function resetWater(date) {
  return apiFetch(`/api/water?date=${encodeURIComponent(date)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
}
