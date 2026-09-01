import { useState } from 'react'
import { ModuleFrame } from '../../components/ModuleFrame'

type ModeKey = 'search' | 'think' | 'research'

const MODES: { key: ModeKey; emoji: string; label: string; when: string }[] = [
  { key: 'search', emoji: '🔍', label: '웹 검색', when: '지금 이 순간의 사실이 필요할 때 (날씨·환율·최신 뉴스·가격)' },
  { key: 'think', emoji: '🧠', label: '확장 사고', when: '조건이 여러 개 얽힌 복잡한 문제를 차근차근 풀어야 할 때' },
  { key: 'research', emoji: '📚', label: '리서치', when: '여러 출처를 모아 보고서 수준으로 종합해야 할 때 (5~45분 소요)' },
]

interface Scenario {
  id: number
  question: string
  correct: ModeKey
  explanation: string
  preview: string
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    question: '내일 제주도 여행 가는데 우산을 챙겨야 할까?',
    correct: 'search',
    explanation:
      '실시간 날씨 예보처럼 지금 시점의 사실 정보가 필요해요. 확장 사고나 리서치로는 알 수 없고, 웹에서 최신 정보를 가져와야 해요.',
    preview:
      '🔍 웹 검색 결과 (기상청, 2026.09.02 기준)\n내일 제주 강수확률 70%, 오후에 비 소식이 있어요. 우산을 챙기는 게 좋겠어요.',
  },
  {
    id: 2,
    question:
      '부모님, 배우자, 7살 아이와 함께 가는 3박 4일 여행인데, 예산 150만원 안에서 각자 원하는 걸 하나씩 넣어서 동선을 짜줘',
    correct: 'think',
    explanation:
      '예산, 인원별 취향, 일정이라는 여러 조건을 동시에 만족시켜야 하는 복잡한 문제예요. 새 정보 검색보다는 차근차근 따져보는 추론이 필요해요.',
    preview:
      '🧠 확장 사고 (생각 중 · 12초)\n1) 예산을 인원수와 일수로 나눠 하루 지출 상한을 먼저 정하고\n2) 아이가 있으니 이동 거리가 짧은 숙소를 먼저 고정한 뒤\n3) 부모님이 좋아하실 온천, 배우자가 원한 카페 투어를 하루씩 배정할게요…',
  },
  {
    id: 3,
    question: '국내 전기차 충전 인프라 시장 현황과 주요 업체별 강점을 정리한 보고서를 만들어줘',
    correct: 'research',
    explanation:
      '여러 출처(뉴스, 보고서, 공식 통계)를 찾아 읽고 종합해야 하는 조사예요. 시간이 좀 걸리더라도 폭넓게 훑어야 할 때 리서치를 사용해요.',
    preview:
      '📚 리서치 진행 중…\n출처 24개 확인 완료 · 예상 소요 시간 15분\n\n[초안 목차]\n1. 시장 규모와 성장 추이\n2. 주요 사업자별 충전기 보급 현황\n3. 완속/급속 비중과 지역별 격차\n4. 시사점',
  },
]

export function SearchModes() {
  const [answers, setAnswers] = useState<Record<number, ModeKey>>({})

  function choose(scenarioId: number, mode: ModeKey) {
    setAnswers((prev) => ({ ...prev, [scenarioId]: mode }))
  }

  return (
    <ModuleFrame moduleId="search-modes">
      <section>
        <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
          이 기능이 뭔가요?
        </h2>
        <p className="mb-4 leading-relaxed text-ink-soft">
          클로드는 질문의 성격에 따라 세 가지 방식으로 답을 준비할 수 있어요. 셋 다
          채팅창 근처의 토글이나 메뉴에서 켤 수 있고, 상황에 맞게 골라 쓰면 더 정확한
          답을 받을 수 있어요.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {MODES.map((m) => (
            <div key={m.key} className="rounded-xl border border-border bg-surface-2 p-4">
              <p className="mb-1 text-2xl" aria-hidden="true">
                {m.emoji}
              </p>
              <p className="mb-1 text-sm font-semibold text-ink">{m.label}</p>
              <p className="text-xs leading-relaxed text-ink-soft">{m.when}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-1 font-serif text-xl font-semibold text-ink">
          실습: 어떤 모드를 켜야 할까요?
        </h2>
        <p className="mb-4 text-sm text-ink-soft">
          아래 세 가지 상황을 보고, 어떤 모드를 켜야 할지 먼저 골라보세요.
        </p>

        <div className="space-y-5">
          {SCENARIOS.map((s) => {
            const chosen = answers[s.id]
            const isCorrect = chosen === s.correct
            return (
              <div key={s.id} className="rounded-2xl border border-border bg-surface p-5">
                <p className="mb-3 text-xs font-semibold tracking-wide text-ink-soft uppercase">
                  상황 {s.id}
                </p>
                <p className="mb-4 font-mono text-sm text-ink">&ldquo;{s.question}&rdquo;</p>
                <div className="mb-3 flex flex-wrap gap-2">
                  {MODES.map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => choose(s.id, m.key)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                        chosen === m.key
                          ? m.key === s.correct
                            ? 'border-accent-2 bg-accent-2-soft text-accent-2'
                            : 'border-accent bg-accent-soft text-accent'
                          : 'border-border text-ink-soft hover:border-accent/50'
                      }`}
                    >
                      {m.emoji} {m.label}
                    </button>
                  ))}
                </div>

                {chosen && (
                  <div>
                    <p
                      className={`mb-2 text-sm font-medium ${isCorrect ? 'text-accent-2' : 'text-accent'}`}
                    >
                      {isCorrect
                        ? '맞아요! 👍'
                        : `아쉬워요. 이 상황엔 ${MODES.find((m) => m.key === s.correct)?.label}가 더 잘 맞아요.`}
                    </p>
                    <p className="mb-3 text-sm leading-relaxed text-ink-soft">{s.explanation}</p>
                    <pre className="overflow-x-auto rounded-xl border border-border bg-surface-2 p-3 font-mono text-xs whitespace-pre-wrap text-ink">
                      {s.preview}
                    </pre>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </ModuleFrame>
  )
}
