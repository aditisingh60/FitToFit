import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/authStore'

export default function Navbar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="mx-auto flex flex-wrap max-w-[90rem] items-center justify-between gap-y-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap w-full md:w-auto items-center justify-between md:justify-start gap-4 sm:gap-6">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e6e6e6] overflow-hidden">
              <img src="/image.png" alt="FoodToFit Logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-lg font-bold text-slate-900">FoodToFit</span>
          </Link>
          <nav className="flex gap-3 sm:gap-4 border-l-0 sm:border-l border-slate-200 pl-0 sm:pl-6 overflow-x-auto w-full sm:w-auto justify-center sm:justify-start">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `text-sm font-semibold transition ${isActive ? 'text-brand-600' : 'text-slate-500 hover:text-slate-800'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/tracker"
              className={({ isActive }) =>
                `text-sm font-semibold transition ${isActive ? 'text-brand-600' : 'text-slate-500 hover:text-slate-800'
                }`
              }
            >
              Tracker
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `text-sm font-semibold transition ${isActive ? 'text-brand-600' : 'text-slate-500 hover:text-slate-800'
                }`
              }
            >
              Blog
            </NavLink>
          </nav>
        </div>
        <div className="flex w-full md:w-auto items-center justify-center md:justify-end gap-3">
          <NavLink
            to="/account"
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 text-sm font-semibold transition ${isActive
                ? 'bg-brand-50 text-brand-700'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              }`
            }
          >
            Account
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
