interface ShortcutTipProps {
  title?: string
  shortcuts: { keys: string[]; label: string }[]
}

export function ShortcutTip({ title = '알아두면 편한 단축키', shortcuts }: ShortcutTipProps) {
  return (
    <div className="rounded-xl border border-accent-2/30 bg-accent-2-soft/60 p-4 sm:p-5">
      <p className="mb-3 flex items-center gap-2 font-serif text-sm font-semibold text-ink">
        <span aria-hidden="true">⌨️</span>
        {title}
      </p>
      <ul className="space-y-2">
        {shortcuts.map((s) => (
          <li
            key={s.label}
            className="flex flex-wrap items-center gap-2 text-sm text-ink-soft"
          >
            <span className="flex items-center gap-1">
              {s.keys.map((k, i) => (
                <span key={k} className="flex items-center gap-1">
                  <kbd className="rounded-md border border-border bg-surface px-1.5 py-0.5 text-xs text-ink shadow-sm">
                    {k}
                  </kbd>
                  {i < s.keys.length - 1 && <span className="text-ink-soft">+</span>}
                </span>
              ))}
            </span>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
