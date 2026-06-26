const COLORS = {
  calories: {
    bg: 'bg-[#8E6549]/5',
    ring: 'ring-[#8E6549]/20',
    text: 'text-[#8E6549]',
    bar: 'bg-[#8E6549]',
  },
  protein: {
    bg: 'bg-[#8E6549]/5',
    ring: 'ring-[#8E6549]/20',
    text: 'text-[#8E6549]',
    bar: 'bg-[#8E6549]',
  },
  carbs: {
    bg: 'bg-[#8E6549]/5',
    ring: 'ring-[#8E6549]/20',
    text: 'text-[#8E6549]',
    bar: 'bg-[#8E6549]',
  },
  fat: {
    bg: 'bg-[#8E6549]/5',
    ring: 'ring-[#8E6549]/20',
    text: 'text-[#8E6549]',
    bar: 'bg-[#8E6549]',
  },
}

export default function MacroCard({ type, value, unit = 'g', subtitle }) {
  const colors = COLORS[type]

  return (
    <div className={`rounded-2xl ${colors.bg} p-5 ring-1 ${colors.ring}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{type}</p>
          <p className={`mt-1 text-3xl font-bold ${colors.text}`}>
            {value}
            <span className="ml-0.5 text-lg font-semibold">{unit}</span>
          </p>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

export function MacroGrid({ macros }) {
  if (!macros) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4">
      <MacroCard type="calories" value={macros.calories} unit="kcal" subtitle="Daily target" />
      <MacroCard type="protein" value={macros.protein} subtitle="30% of calories" />
      <MacroCard type="carbs" value={macros.carbs} subtitle="40% of calories" />
      <MacroCard type="fat" value={macros.fat} subtitle="30% of calories" />
    </div>
  )
}
