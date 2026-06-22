import { apiFetch, authHeaders } from './client'

export function getDailyStatus() {
  return apiFetch('/api/analytics/daily-status', {
    headers: authHeaders(),
  })
}

export function getWeeklyHistory() {
  return apiFetch('/api/analytics/weekly-history', {
    headers: authHeaders(),
  })
}
