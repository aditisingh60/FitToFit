import { create } from 'zustand'
import { getProfile } from '../api/user.api'

const getInitialUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
}

const getInitialProfile = () => {
  try {
    return JSON.parse(localStorage.getItem('profile'))
  } catch {
    return null
  }
}

export const useAuth = create((set, get) => ({
  user: getInitialUser(),
  profile: getInitialProfile()?.profile || null,
  macros: getInitialProfile()?.macros || null,
  onboardingDone: localStorage.getItem('onboardingDone') === 'true',
  loading: true,

  loadProfile: async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      set({ loading: false })
      return
    }

    try {
      const data = await getProfile()
      set({
        profile: data.profile,
        macros: data.macros,
        onboardingDone: data.onboardingDone,
      })
      localStorage.setItem('onboardingDone', String(data.onboardingDone))
      localStorage.setItem('profile', JSON.stringify(data))
    } catch (err) {
      if (err.message === 'Profile not found') {
        set({
          onboardingDone: false,
          profile: null,
          macros: null,
        })
        localStorage.setItem('onboardingDone', 'false')
      } else {
        const cached = localStorage.getItem('profile')
        if (cached) {
          const parsed = JSON.parse(cached)
          set({
            profile: parsed.profile,
            macros: parsed.macros,
            onboardingDone: parsed.onboardingDone ?? true,
          })
        } else {
          set({ onboardingDone: localStorage.getItem('onboardingDone') === 'true' })
        }
      }
    } finally {
      set({ loading: false })
    }
  },

  login: (authData) => {
    localStorage.setItem('token', authData.token)
    localStorage.setItem('user', JSON.stringify(authData.user))
    localStorage.setItem('onboardingDone', String(authData.onboardingDone))

    set({
      user: authData.user,
      onboardingDone: authData.onboardingDone,
    })

    if (authData.onboardingDone) {
      get().loadProfile()
    } else {
      set({
        profile: null,
        macros: null,
        loading: false,
      })
    }
  },

  completeOnboarding: (data) => {
    set({
      profile: data.profile,
      macros: data.macros,
      onboardingDone: true,
    })
    localStorage.setItem('onboardingDone', 'true')
    localStorage.setItem('profile', JSON.stringify(data))
  },
  //logout
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('onboardingDone')
    localStorage.removeItem('profile')

    set({
      user: null,
      profile: null,
      macros: null,
      onboardingDone: false,
    })
  },
}))
