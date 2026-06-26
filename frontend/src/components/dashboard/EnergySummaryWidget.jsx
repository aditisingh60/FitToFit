import { useState } from 'react'

export default function EnergySummaryWidget() {
  const [isBreakfastOpen, setIsBreakfastOpen] = useState(true)

  return (
    <div className="w-full bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col h-[750px]">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-slate-100/60">
        <button className="text-slate-400 hover:text-brand-600 transition cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <div className="flex items-center gap-4 text-slate-800 font-bold">
          <button className="text-slate-400 hover:text-slate-600 cursor-pointer">&lt;</button>
          <span className="text-sm">Today</span>
          <button className="text-slate-400 hover:text-slate-600 cursor-pointer">&gt;</button>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <button className="hover:text-brand-600 transition cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="hover:text-brand-600 transition cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          </button>
        </div>
      </div>

      {/* Energy Summary */}
      <div className="p-6 pb-2">
        <div className="flex justify-between items-center mb-6 text-xs font-bold text-slate-800 tracking-wider">
          <div className="flex items-center gap-1 cursor-pointer hover:text-brand-600 transition">
            <span>ENERGY SUMMARY</span>
            <span className="text-brand-500">&gt;</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-brand-600 transition">
            <span>TARGET</span>
            <span className="text-brand-500 text-lg leading-none mb-0.5">⤢</span>
          </div>
        </div>

        <div className="flex justify-between items-center px-1">
          {/* Consumed Ring */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 mb-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2dd4bf" strokeWidth="3" strokeDasharray="90, 100" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800">
                <span className="font-extrabold text-sm leading-tight">1800</span>
                <span className="text-[9px] text-slate-500 font-semibold">kcal</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-600">Consumed</span>
          </div>

          {/* Expenditure Ring */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-2 -mt-2 shadow-sm rounded-full bg-white ring-8 ring-white">
              <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#d946ef" strokeWidth="3" strokeDasharray="100, 100" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800 z-20">
                <span className="font-extrabold text-base leading-tight">2000</span>
                <span className="text-[10px] text-slate-500 font-semibold">kcal</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-slate-800">Expenditure</span>
          </div>

          {/* Remaining Ring */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 mb-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="10, 100" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800">
                <span className="font-extrabold text-sm leading-tight">200</span>
                <span className="text-[9px] text-slate-500 font-semibold">kcal</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-600">Remaining</span>
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-6">
           <span className="text-slate-300 text-[10px] cursor-pointer hover:text-slate-500">&lt;</span>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
           <span className="text-slate-300 text-[10px] cursor-pointer hover:text-slate-500">&gt;</span>
        </div>
      </div>

      {/* Diary List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
        {/* Breakfast Section */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div 
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-100/50 transition"
            onClick={() => setIsBreakfastOpen(!isBreakfastOpen)}
          >
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-bold text-lg leading-none">+</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">Breakfast</span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide">357 kcals, 29 g protein, 39 g carbs, 7 g fat</span>
              </div>
            </div>
            <svg className={`w-4 h-4 text-slate-400 transition-transform ${isBreakfastOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </div>
          
          {isBreakfastOpen && (
            <div className="bg-white px-4 py-2 border-t border-slate-100/60 divide-y divide-slate-50">
              <div className="py-3 flex justify-between items-center group cursor-pointer">
                <div className="flex items-start gap-3">
                  <span className="text-lg grayscale group-hover:grayscale-0 transition">🍴</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition">Strawberries, Yogurt & Homemade Gr...</span>
                    <span className="text-[10px] text-slate-400">🕒 9:00 am - 1 full recipe</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-700">356.6</span>
                  <span className="text-[10px] text-slate-400">kcal</span>
                </div>
              </div>
              <div className="py-3 flex justify-between items-center group cursor-pointer">
                <div className="flex items-start gap-3">
                  <span className="text-lg grayscale group-hover:grayscale-0 transition">🍎</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition">Protein Shake</span>
                    <span className="text-[10px] text-slate-400">🕒 9:00 am - 1 Scoop</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-700">50.0</span>
                  <span className="text-[10px] text-slate-400">kcal</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Running Section */}
        <div className="bg-white rounded-2xl border border-slate-100 px-4 py-3 shadow-sm cursor-pointer hover:bg-slate-50 transition">
          <div className="flex justify-between items-center group">
            <div className="flex items-start gap-3">
              <span className="text-lg text-cyan-500 grayscale group-hover:grayscale-0 transition">🏃</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 group-hover:text-cyan-600 transition">Running (Garmin)</span>
                <span className="text-[10px] text-slate-400">🕒 8:00 am - 35.0 mins - Moderate</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-pink-500">-350</span>
              <span className="text-[10px] text-slate-400">kcal</span>
            </div>
          </div>
        </div>

        {/* Lunch Section */}
        <div className="bg-white rounded-2xl border border-slate-100 px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-bold text-lg leading-none">+</span>
            <span className="text-sm font-bold text-slate-800">Lunch</span>
          </div>
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Dinner Section */}
        <div className="bg-white rounded-2xl border border-slate-100 px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition shadow-sm mb-4">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-bold text-lg leading-none">+</span>
            <span className="text-sm font-bold text-slate-800">Dinner</span>
          </div>
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="border-t border-slate-100 px-6 py-4 bg-white flex justify-between items-center relative z-20">
        <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-700 transition cursor-pointer">
          <div className="w-6 h-6 flex items-end gap-0.5 justify-center">
            <div className="w-1.5 h-3 bg-current rounded-[2px]"></div>
            <div className="w-1.5 h-5 bg-current rounded-[2px]"></div>
            <div className="w-1.5 h-4 bg-current rounded-[2px]"></div>
          </div>
          <span className="text-[9px] font-bold">Discover</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-orange-500 transition cursor-pointer">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm3 3h6v2H9V9zm0 4h6v2H9v-2z"/></svg>
          </div>
          <span className="text-[9px] font-bold">Diary</span>
        </button>
        
        {/* Center Add Button */}
        <div className="relative -top-6">
          <button className="w-14 h-14 bg-[#f97316] hover:bg-[#ea580c] rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/30 transition transform hover:scale-105 cursor-pointer">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        
        <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-700 transition cursor-pointer">
          <div className="w-6 h-6 flex items-center justify-center text-lg grayscale opacity-60">
            🍎
          </div>
          <span className="text-[9px] font-bold">Foods</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-700 transition cursor-pointer">
          <div className="w-6 h-6 flex items-center justify-center gap-1">
             <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
             <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
             <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
          </div>
          <span className="text-[9px] font-bold">More</span>
        </button>
      </div>
    </div>
  )
}
