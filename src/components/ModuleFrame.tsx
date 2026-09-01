import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { getAdjacentModules, getModuleById } from '../lib/modules'
import { useProgress } from '../lib/progress'

interface ModuleFrameProps {
  moduleId: string
  children: ReactNode
}

export function ModuleFrame({ moduleId, children }: ModuleFrameProps) {
  const meta = getModuleById(moduleId)
  const { isCompleted, setCompleted } = useProgress()
  const { next } = getAdjacentModules(moduleId)
  const done = isCompleted(moduleId)

  if (!meta) return null

  return (
    <div className="pb-16">
      <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
        {meta.category === 'essential' ? '필수 코스' : '더 알아보기'} · {meta.emoji}
      </p>
      <h1 className="mb-3 font-serif text-2xl font-semibold text-ink sm:text-3xl">
        {meta.title}
      </h1>
      <p className="mb-8 max-w-xl text-base leading-relaxed text-ink-soft">
        {meta.shortDesc}
      </p>

      <div className="space-y-8">{children}</div>

      <div className="mt-10 rounded-2xl border border-border bg-surface-2 p-5 sm:p-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={done}
            onChange={(e) => setCompleted(moduleId, e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-accent"
          />
          <span>
            <span className="block font-medium text-ink">
              {done ? '이 코스를 완료했어요!' : '실습을 다 해봤다면 체크해주세요'}
            </span>
            <span className="block text-sm text-ink-soft">
              체크 표시는 이 브라우저에 자동 저장되고, 사이드바 진행률에 반영돼요.
            </span>
          </span>
        </label>
      </div>

      {next ? (
        <div className="mt-6">
          <p className="mb-2 text-xs font-medium tracking-wide text-ink-soft uppercase">
            다음엔 이런 것도 해보세요
          </p>
          <Link
            to={next.path}
            className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-12px_rgba(36,31,26,0.25)]"
          >
            <span>
              <span className="block font-serif text-lg font-semibold text-ink group-hover:text-accent">
                {next.title}
              </span>
              <span className="block text-sm text-ink-soft">{next.shortDesc}</span>
            </span>
            <span className="text-xl text-accent" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-accent/30 bg-accent-soft/30 p-5 text-center">
          <p className="mb-1 font-serif text-lg font-semibold text-ink">
            🎉 여기까지가 마지막 코스예요
          </p>
          <p className="text-sm text-ink-soft">
            준비된 코스를 모두 둘러봤어요. 언제든 대시보드에서 다시 골라볼 수 있어요.
          </p>
        </div>
      )}

      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-ink-soft hover:text-accent"
        >
          ← 전체 목차로 돌아가기
        </Link>
      </div>
    </div>
  )
}
