import { Link } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { essentialModules, optionalModules, type ModuleMeta } from '../lib/modules'
import { useProgress } from '../lib/progress'

function ModuleCard({ module: m }: { module: ModuleMeta }) {
  const { isCompleted } = useProgress()
  const done = isCompleted(m.id)
  return (
    <Link
      to={m.path}
      className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-12px_rgba(36,31,26,0.25)]"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-ink-soft">{m.emoji}</span>
        {done && (
          <span className="rounded-full bg-accent-2-soft px-2 py-0.5 text-xs font-medium text-accent-2">
            완료 ✓
          </span>
        )}
      </div>
      <h3 className="font-serif text-lg font-semibold text-ink group-hover:text-accent">
        {m.title}
      </h3>
      <p className="text-sm leading-relaxed text-ink-soft">{m.shortDesc}</p>
      <p className="mt-1 text-xs text-ink-soft">약 {m.minutes}분 소요</p>
    </Link>
  )
}

export function Dashboard() {
  const { completedCount, totalCount, isCompleted } = useProgress()
  const nextModule =
    essentialModules.find((m) => !isCompleted(m.id)) ?? essentialModules[0]

  return (
    <div className="pb-10">
      <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
        Claude Interactive Tutorial
      </p>
      <h1 className="mb-4 font-serif text-3xl font-semibold text-ink sm:text-4xl">
        말로만 듣던 클로드,
        <br />
        직접 눌러보며 익혀요
      </h1>
      <p className="mb-8 max-w-xl text-base leading-relaxed text-ink-soft">
        설명만 읽고 끝나지 않아요. 각 기능마다 짧은 설명 → 직접 해보는 미니 실습 →
        완료 체크로 이어지는 카드가 준비되어 있어요. 순서대로 따라가도 좋고, 필요한
        기능만 골라서 봐도 괜찮아요.
      </p>

      <div className="mb-10 rounded-2xl border border-border bg-surface-2 p-5 sm:p-6">
        <ProgressBar
          completed={completedCount}
          total={totalCount}
          label="전체 진행 상황"
        />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-soft">
            {completedCount === 0
              ? '아직 시작 전이에요. 첫 번째 코스부터 가볍게 시작해봐요.'
              : completedCount === totalCount
                ? '모든 코스를 완료했어요! 언제든 다시 돌아와서 복습할 수 있어요.'
                : '진행 상황은 이 브라우저에 자동으로 저장돼요.'}
          </p>
          <Link
            to={nextModule.path}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {completedCount === 0 ? '처음부터 시작하기' : '이어서 하기'} →
          </Link>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="mb-1 font-serif text-xl font-semibold text-ink">필수 코스</h2>
        <p className="mb-4 text-sm text-ink-soft">
          클로드를 처음 쓴다면 이 순서대로 따라가는 걸 추천해요.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {essentialModules.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-1 font-serif text-xl font-semibold text-ink">더 알아보기</h2>
        <p className="mb-4 text-sm text-ink-soft">
          여유가 있다면 이런 것도 있다는 걸 알아두면 좋아요.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {optionalModules.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>
      </section>
    </div>
  )
}
