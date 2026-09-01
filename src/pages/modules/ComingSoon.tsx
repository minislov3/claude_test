import { Link, useParams } from 'react-router-dom'
import { getModuleById } from '../../lib/modules'

export function ComingSoon() {
  const { moduleId } = useParams()
  const meta = moduleId ? getModuleById(moduleId) : undefined

  return (
    <div className="pb-10">
      <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
        {meta?.emoji ?? '00'}
      </p>
      <h1 className="mb-3 font-serif text-2xl font-semibold text-ink sm:text-3xl">
        {meta?.title ?? '준비 중인 코스'}
      </h1>
      <p className="mb-8 max-w-xl text-base leading-relaxed text-ink-soft">
        이 코스는 아직 준비 중이에요. 곧 실습과 함께 채워질 예정이니 다른 코스부터
        먼저 둘러봐 주세요.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
      >
        ← 대시보드로 돌아가기
      </Link>
    </div>
  )
}
