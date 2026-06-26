export default function AnimatedShowcase() {
  return (
    <div className="w-full h-[500px] lg:h-[750px] overflow-hidden rounded-3xl relative marquee-mask-vertical -mt-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 h-[150%]">
        {/* Column 1: Down to Up */}
        <div className="animate-marquee-btt flex flex-col gap-4" style={{ animationDuration: '30s' }}>
          {[1, 2, 3].map((set) => (
            <div key={set} className="flex flex-col gap-4">
              {/* Card 1: Log your food */}
              <div className="bg-[#f06135] rounded-3xl overflow-hidden shadow-sm flex flex-col h-[280px]">
                <div className="h-48 w-full relative">
                  <img src="/images/citrus.png" alt="Citrus fruits" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <h3 className="font-bold text-slate-900 text-[15px]">Log your food</h3>
                </div>
              </div>

              {/* Card 2: Energy Rings */}
              <div className="bg-white rounded-3xl p-5 shadow-sm">
                <div className="flex justify-between items-center px-0.5">
                  <div className="flex flex-col items-center">
                    <div className="relative w-12 h-12 mb-2">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2dd4bf" strokeWidth="3" strokeDasharray="90, 100" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800">
                        <span className="font-extrabold text-[9px] leading-tight">1800</span>
                        <span className="text-[6px] text-slate-500 font-semibold">kcal</span>
                      </div>
                    </div>
                    <span className="text-[7px] font-bold text-slate-600">Consumed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative w-14 h-14 mb-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-full bg-white ring-4 ring-white">
                      <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#d946ef" strokeWidth="3" strokeDasharray="100, 100" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800 z-20">
                        <span className="font-extrabold text-[11px] leading-tight">2000</span>
                        <span className="text-[7px] text-slate-500 font-semibold">kcal</span>
                      </div>
                    </div>
                    <span className="text-[8px] font-bold text-slate-800">Burned</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative w-12 h-12 mb-2">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="10, 100" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800">
                        <span className="font-extrabold text-[9px] leading-tight">200</span>
                        <span className="text-[6px] text-slate-500 font-semibold">kcal</span>
                      </div>
                    </div>
                    <span className="text-[7px] font-bold text-slate-600">Remaining</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Healthy Habits */}
              <div className="bg-[#fbbf24] rounded-3xl overflow-hidden shadow-sm flex flex-col h-[280px]">
                <div className="h-48 w-full">
                  <img src="/images/running.png" alt="Couple running" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
                  <h3 className="font-bold text-slate-900 text-[15px] leading-tight">Develop healthy habits</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2: Up to Down */}
        <div className="animate-marquee-ttb flex flex-col gap-4" style={{ animationDuration: '35s' }}>
          {[1, 2, 3].map((set) => (
            <div key={set} className="flex flex-col gap-4">
              {/* Card 4: Diary Menu */}
              <div className="bg-white rounded-3xl shadow-sm p-4 pt-5">
                <div className="flex items-center justify-between px-2 mb-6">
                   <div className="flex items-center gap-2">
                     <span className="text-emerald-500 font-bold">+</span>
                     <span className="text-[11px] font-bold text-slate-800">Dinner</span>
                   </div>
                   <span className="text-slate-400 text-xs font-bold">v</span>
                </div>
                <div className="flex justify-between items-center px-1">
                  <div className="flex flex-col items-center gap-1.5 text-slate-400">
                    <div className="w-4 h-4 flex items-end gap-0.5 justify-center">
                      <div className="w-[3px] h-2 bg-current rounded-[1px]"></div>
                      <div className="w-[3px] h-4 bg-current rounded-[1px]"></div>
                      <div className="w-[3px] h-3 bg-current rounded-[1px]"></div>
                    </div>
                    <span className="text-[7px] font-bold">Discover</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-[#f06135]">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm3 3h6v2H9V9zm0 4h6v2H9v-2z"/></svg>
                    </div>
                    <span className="text-[7px] font-bold">Diary</span>
                  </div>
                  <div className="w-7 h-7 bg-[#f06135] rounded-full flex items-center justify-center text-white mb-1 shadow-md shadow-orange-500/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-slate-400">
                    <div className="w-4 h-4 flex items-center justify-center text-[10px] grayscale opacity-60">🍎</div>
                    <span className="text-[7px] font-bold">Foods</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-slate-400">
                    <div className="w-4 h-4 flex items-center justify-center gap-0.5">
                       <div className="w-1 h-1 bg-current rounded-full"></div>
                       <div className="w-1 h-1 bg-current rounded-full"></div>
                       <div className="w-1 h-1 bg-current rounded-full"></div>
                    </div>
                    <span className="text-[7px] font-bold">More</span>
                  </div>
                </div>
              </div>

              {/* Card 5: Macros */}
              <div className="bg-white rounded-3xl p-5 shadow-sm space-y-3.5">
                {[
                  { label: 'Energy', val: '1500 / 2000 kcal', pct: '75%', color: 'bg-[#f06135]' },
                  { label: 'Protein', val: '45 / 90 g', pct: '50%', color: 'bg-orange-300' },
                  { label: 'Net Carbs', val: '150 / 150 g', pct: '100%', color: 'bg-[#2dd4bf]' },
                  { label: 'Fat', val: '180 / 200 g', pct: '80%', color: 'bg-[#d946ef]' },
                ].map((macro) => (
                  <div key={macro.label}>
                    <div className="flex justify-between items-end mb-1.5">
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-bold text-slate-800">{macro.label}</span>
                         <span className="text-[9px] text-slate-400">{macro.val}</span>
                      </div>
                      <span className="text-[9px] text-slate-500 font-medium">{macro.pct}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${macro.color} rounded-full`} style={{ width: macro.pct }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card 6: Track Vitamins */}
              <div className="bg-[#67d58b] rounded-3xl overflow-hidden shadow-sm flex flex-col h-[320px]">
                <div className="h-56 w-full">
                   <img src="/images/salad.png" alt="Woman eating salad" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
                  <h3 className="font-bold text-slate-900 text-[15px] leading-tight">Track vitamins &<br/>minerals</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
