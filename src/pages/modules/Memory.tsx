import { useState } from 'react'
import { ModuleFrame } from '../../components/ModuleFrame'

interface MemoryItem {
  id: string
  category: string
  text: string
}

const FIRST_CHAT_MESSAGES = [
  '나는 매운 음식을 잘 못 먹어.',
  '요즘 회사 일과는 별개로 사이드 프로젝트로 리액트 공부하고 있어.',
]

const INITIAL_MEMORY: MemoryItem[] = [
  { id: 'food', category: '음식 취향', text: '매운 음식을 잘 못 먹음' },
  { id: 'project', category: '진행 중인 일', text: '사이드 프로젝트로 리액트 공부 중' },
]

const NEW_CHAT_QUESTION = '오늘 저녁 메뉴 뭐가 좋을까?'

const ANSWER_WITH_MEMORY =
  '매운 걸 잘 못 드신다고 하셨으니, 순한 크림파스타나 계란찜은 어때요? 그나저나 요즘 하고 계신다는 리액트 공부는 잘 되고 있어요?'

const ANSWER_WITHOUT_MEMORY =
  '오늘 저녁 메뉴로는 제육볶음, 크림파스타, 김치찌개 중에 골라보는 건 어떨까요? 특별히 좋아하시는 음식이나 못 드시는 게 있다면 알려주시면 더 맞춰서 추천해드릴게요.'

export function Memory() {
  const [chatEnded, setChatEnded] = useState(false)
  const [items, setItems] = useState<MemoryItem[]>(INITIAL_MEMORY)
  const [memoryEnabled, setMemoryEnabled] = useState(true)
  const [sent, setSent] = useState(false)

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <ModuleFrame moduleId="memory">
      <section>
        <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
          이 기능이 뭔가요?
        </h2>
        <p className="leading-relaxed text-ink-soft">
          클로드는 대화하다가 알게 된 내용을 <strong className="text-ink">메모리함</strong>에
          카테고리별로 정리해둬요. 그래서 다음에 새로운 대화를 시작해도 이전에
          말했던 취향이나 상황을 다시 설명할 필요가 없어요. 이 기능은 설정에서
          언제든 끄고 켤 수 있어요.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
          실습: 첫 대화에서 남긴 정보, 다음 대화에서 기억하는지 보기
        </h2>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="mb-3 text-xs font-semibold tracking-wide text-ink-soft uppercase">
            1단계 · 첫 번째 대화 (오늘)
          </p>
          <div className="mb-4 space-y-2">
            {FIRST_CHAT_MESSAGES.map((m) => (
              <div key={m} className="rounded-xl bg-surface-2 px-3 py-2 font-mono text-sm text-ink">
                {m}
              </div>
            ))}
          </div>
          {!chatEnded ? (
            <button
              type="button"
              onClick={() => setChatEnded(true)}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              대화 마치고 메모리함 확인하기
            </button>
          ) : (
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wide text-accent-2 uppercase">
                📋 메모리함에 자동으로 정리됨
              </p>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-accent-2/30 bg-accent-2-soft/40 px-3 py-2"
                  >
                    <div>
                      <span className="mr-2 rounded-full bg-surface px-2 py-0.5 text-xs text-ink-soft">
                        {item.category}
                      </span>
                      <span className="text-sm text-ink">{item.text}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`${item.text} 메모리에서 삭제`}
                      className="text-ink-soft hover:text-accent"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {items.length === 0 && (
                  <p className="text-sm text-ink-soft">
                    메모리함이 비었어요. 이제 클로드는 이 내용들을 기억하지 못해요.
                  </p>
                )}
              </div>
              <p className="mt-2 text-xs text-ink-soft">
                항목 옆의 ✕를 눌러 원하지 않는 기억을 지울 수 있어요. 실제
                클로드에서도 설정 &gt; Memory에서 항목별로 관리할 수 있어요.
              </p>
            </div>
          )}
        </div>

        {chatEnded && (
          <div className="mt-5 rounded-2xl border border-accent/30 bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                2단계 · 며칠 뒤, 새 대화 시작하기
              </p>
              <label className="flex items-center gap-2 text-xs text-ink-soft">
                <input
                  type="checkbox"
                  checked={memoryEnabled}
                  onChange={(e) => {
                    setMemoryEnabled(e.target.checked)
                    setSent(false)
                  }}
                  className="h-4 w-4 accent-accent"
                />
                메모리 사용
              </label>
            </div>
            <div className="mb-3 rounded-xl bg-surface-2 px-3 py-2 font-mono text-sm text-ink">
              {NEW_CHAT_QUESTION}
            </div>
            {!sent ? (
              <button
                type="button"
                onClick={() => setSent(true)}
                className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                보내기
              </button>
            ) : (
              <div>
                <div className="rounded-xl border border-accent-2/30 bg-accent-2-soft/40 p-4 text-sm leading-relaxed text-ink">
                  {memoryEnabled && items.length > 0 ? ANSWER_WITH_MEMORY : ANSWER_WITHOUT_MEMORY}
                </div>
                <p className="mt-2 text-xs text-ink-soft">
                  {memoryEnabled && items.length > 0
                    ? '이전 대화에서 말한 적 없는데도, 메모리함 덕분에 취향과 근황을 자연스럽게 반영했어요.'
                    : '메모리를 껐거나 항목을 지우면, 클로드는 이전 대화 내용을 모른 채 일반적인 답만 줄 수 있어요.'}
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </ModuleFrame>
  )
}
