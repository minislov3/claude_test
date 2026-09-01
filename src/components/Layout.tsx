import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { essentialModules, optionalModules } from '../lib/modules'
import { useProgress } from '../lib/progress'
import { ProgressBar } from './ProgressBar'

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { isCompleted, completedCount, totalCount } = useProgress()

  const renderGroup = (title: string, items: typeof essentialModules) => (
    <div className="mb-6">
      <p className="mb-2 px-3 text-xs font-semibold tracking-wide text-ink-soft uppercase">
        {title}
      </p>
      <ul className="space-y-0.5">
        {items.map((m) => (
          <li key={m.id}>
            <NavLink
              to={m.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-accent-soft text-ink font-medium'
                    : 'text-ink-soft hover:bg-surface-2 hover:text-ink'
                }`
              }
            >
              <span
                className={`flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full border px-1 text-[10px] font-mono ${
                  isCompleted(m.id)
                    ? 'border-accent-2 bg-accent-2 text-white'
                    : 'border-border text-ink-soft'
                }`}
                aria-hidden="true"
              >
                {isCompleted(m.id) ? '✓' : m.emoji}
              </span>
              <span className="truncate">{m.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 pt-1 pb-4">
        <NavLink to="/" onClick={onNavigate} className="block">
          <p className="font-serif text-lg font-semibold text-ink">클로드 체험 튜토리얼</p>
          <p className="mt-0.5 text-xs text-ink-soft">직접 눌러보며 배우는 클로드</p>
        </NavLink>
      </div>
      <div className="px-3 pb-5">
        <ProgressBar completed={completedCount} total={totalCount} label="전체 진행률" />
      </div>
      <nav className="flex-1 overflow-y-auto px-0 pb-6">
        {renderGroup('필수 코스', essentialModules)}
        {renderGroup('더 알아보기', optionalModules)}
      </nav>
    </div>
  )
}

export function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        {/* 데스크톱 사이드바 */}
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-border bg-surface-2 md:block">
          <SidebarContent />
        </aside>

        {/* 모바일 상단 바 */}
        <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-border bg-surface/95 px-4 py-3 backdrop-blur md:hidden">
          <NavLink to="/" className="font-serif text-base font-semibold text-ink">
            클로드 체험 튜토리얼
          </NavLink>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink"
            aria-label="메뉴 열기"
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>

        {/* 모바일 드로어 */}
        {drawerOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              aria-label="메뉴 닫기"
              onClick={() => setDrawerOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-[85%] max-w-xs overflow-y-auto bg-surface-2 pt-4 shadow-2xl">
              <div className="flex justify-end px-3">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft"
                  aria-label="메뉴 닫기"
                >
                  ✕
                </button>
              </div>
              <SidebarContent onNavigate={() => setDrawerOpen(false)} />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 px-4 pt-20 pb-16 sm:px-8 md:pt-10 lg:px-14">
          <div className="mx-auto w-full max-w-3xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
