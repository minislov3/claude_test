interface ProgressBarProps {
  completed: number
  total: number
  label?: string
}

export function ProgressBar({ completed, total, label }: ProgressBarProps) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-ink-soft">
          <span>{label}</span>
          <span>
            {completed} / {total} 완료
          </span>
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-border/70"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
