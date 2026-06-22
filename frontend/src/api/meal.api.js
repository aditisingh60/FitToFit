import { apiFetch, authHeaders } from './client'

export function getMeals(date) {
  return apiFetch(`/api/meal?date=${encodeURIComponent(date)}`, {
    headers: authHeaders(),
  })
}

export function logMeal(payload) {
  return apiFetch('/api/meal', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })
}

export function deleteMeal(id) {
  return apiFetch(`/api/meal/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
}

export function resetMeals(date) {
  return apiFetch(`/api/meal?date=${encodeURIComponent(date)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
}
