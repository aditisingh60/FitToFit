import { useState } from 'react'
import { useAuth } from '../store/authStore'
import { updateProfile } from '../api/user.api'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { MacroGrid } from '../components/dashboard/MacroCard'
import {
  ACTIVITY_LEVELS,
  GOALS,
  SEX_OPTIONS,
  previewMetrics,
} from '../utils/macros'

export default function Account() {
  const { user, profile, updateAuthProfile } = useAuth()

  const [form, setForm] = useState({
    age: profile?.age ?? '',
    sex: profile?.sex ?? 'male',
    heightCm: profile?.heightCm ?? '',
    weightKg: profile?.weightKg ?? '',
    activityFactor: profile?.activityFactor ?? 1.2,
    goal: profile?.goal ?? 'maintain',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    setSuccess('')
    setError('')
  }

  // Calculate live preview metrics
  const metrics = form.age && form.sex && form.heightCm && form.weightKg && form.activityFactor
    ? previewMetrics({
        age: Number(form.age),
        sex: form.sex,
        heightCm: Number(form.heightCm),
        weightKg: Number(form.weightKg),
        activityFactor: Number(form.activityFactor),
        goal: form.goal,
      })
    : null

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')

    try {
      const payload = {
        age: Number(form.age),
        sex: form.sex,
        heightCm: Number(form.heightCm),
        weightKg: Number(form.weightKg),
        activityFactor: Number(form.activityFactor),
        goal: form.goal,
      }

      const data = await updateProfile(payload)
      updateAuthProfile(data)
      setSuccess('Your profile has been updated successfully!')
    } catch (err) {
      setError(err.message || 'Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-svh bg-transparent flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Your Account</h1>
            <p className="mt-1 text-slate-500">
              Manage your personal info, body statistics, activity level, and targets.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Form */}
            <form onSubmit={handleSave} className="lg:col-span-3 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
                  Body Parameters & Profile Details
                </h2>

                {/* Read only info */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
                  <div>
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Name</span>
                    <p className="font-bold text-slate-800">{user?.name || 'User'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email</span>
                    <p className="font-bold text-slate-800">{user?.email || 'N/A'}</p>
                  </div>
                </div>

                {success && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 font-medium shadow-sm transition-all duration-300">
                    ✓ {success}
                  </div>
                )}

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium shadow-sm">
                    ⚠️ {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="age"
                    label="Age"
                    type="number"
                    placeholder="25"
                    value={form.age}
                    onChange={(e) => update('age', e.target.value)}
                    required
                  />

                  <div>
                    <p className="mb-1.5 text-sm font-medium text-slate-700">Sex</p>
                    <div className="grid grid-cols-2 gap-3">
                      {SEX_OPTIONS.map(({ id, label }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => update('sex', id)}
                          className={[
                            'rounded-xl border py-2.5 text-sm font-semibold transition cursor-pointer',
                            form.sex === id
                              ? 'border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-500/20 shadow-sm'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50',
                          ].join(' ')}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="height"
                    label="Height (cm)"
                    type="number"
                    placeholder="170"
                    value={form.heightCm}
                    onChange={(e) => update('heightCm', e.target.value)}
                    required
                  />

                  <Input
                    id="weight"
                    label="Weight (kg)"
                    type="number"
                    placeholder="70"
                    value={form.weightKg}
                    onChange={(e) => update('weightKg', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-slate-700">Activity Level</p>
                  <div className="space-y-2">
                    {ACTIVITY_LEVELS.map(({ value, label, description }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => update('activityFactor', String(value))}
                        className={[
                          'w-full rounded-xl border px-4 py-3 text-left transition cursor-pointer',
                          Number(form.activityFactor) === value
                            ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/20 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50',
                        ].join(' ')}
                      >
                        <p className="text-sm font-bold text-slate-900">{label}</p>
                        <p className="text-xs text-slate-500">{description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-slate-700">Goal</p>
                  <div className="space-y-2">
                    {GOALS.map(({ id, label, description }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => update('goal', id)}
                        className={[
                          'w-full rounded-xl border px-4 py-3 text-left transition cursor-pointer',
                          form.goal === id
                            ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/20 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50',
                        ].join(' ')}
                      >
                        <p className="text-sm font-bold text-slate-900">{label}</p>
                        <p className="text-xs text-slate-500">{description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving Changes...' : 'Save Profile Changes'}
                  </Button>
                </div>
              </div>
            </form>

            {/* Live Metrics Preview Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-24">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Calculated Target Preview
                </h3>

                {metrics ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-4 text-center">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">BMI</p>
                        <p className="text-base font-extrabold text-slate-800 mt-1">{metrics.bmi}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">BMR</p>
                        <p className="text-base font-extrabold text-slate-800 mt-1">{metrics.bmr} kcal</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">TDEE</p>
                        <p className="text-base font-extrabold text-slate-800 mt-1">{metrics.tdee} kcal</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Calories */}
                      <div className="rounded-xl border border-slate-100 p-4 bg-orange-50/30">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Calorie Goal</span>
                          <span className="text-xl font-black text-orange-600">{metrics.dailyCalorieGoal} kcal</span>
                        </div>
                      </div>

                      {/* Macros split */}
                      <div className="space-y-3 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Macro Split Preview</span>
                        
                        <div className="space-y-2.5">
                          {/* Protein */}
                          <div>
                            <div className="flex justify-between text-xs font-bold mb-1">
                              <span className="text-slate-600">Protein (30%)</span>
                              <span className="text-slate-800">{metrics.macros.protein}g</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full bg-orange-500 rounded-full" style={{ width: '30%' }} />
                            </div>
                          </div>

                          {/* Carbs */}
                          <div>
                            <div className="flex justify-between text-xs font-bold mb-1">
                              <span className="text-slate-600">Carbs (40%)</span>
                              <span className="text-slate-800">{metrics.macros.carbs}g</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full bg-orange-500 rounded-full" style={{ width: '40%' }} />
                            </div>
                          </div>

                          {/* Fat */}
                          <div>
                            <div className="flex justify-between text-xs font-bold mb-1">
                              <span className="text-slate-600">Fat (30%)</span>
                              <span className="text-slate-800">{metrics.macros.fat}g</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full bg-orange-500 rounded-full" style={{ width: '30%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-400">
                    <p className="text-sm">Please fill out all statistics to view your target calculations.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
