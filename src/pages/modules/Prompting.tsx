import { useState } from 'react'
import { ModuleFrame } from '../../components/ModuleFrame'
import { ShortcutTip } from '../../components/ShortcutTip'

const BAD_PROMPT = '여행 계획 좀 짜줘'
const BAD_ANSWER = `물론이죠! 여행 계획을 세우려면 몇 가지 정보가 더 필요해요.

- 어디로 여행을 가시나요?
- 며칠 동안 가시나요?
- 예산은 어느 정도로 생각하시나요?
- 누구와 함께 가시나요?

이 정보를 알려주시면 더 구체적인 계획을 세워드릴 수 있어요!`

const GOOD_PROMPT_TEMPLATE =
  '11월에 2박 3일로 혼자 부산 여행을 가려고 해. 예산은 40만원 정도이고, 사진 찍기 좋은 골목이나 바다 뷰 카페를 좋아해. 하루 일정표를 아침/점심/저녁으로 나눠서 표로 만들어줘.'

const GOOD_ANSWER = `좋아요! 11월 부산 2박 3일, 예산 40만원 기준 일정표예요.

| 일차 | 아침 | 점심 | 저녁 |
|---|---|---|---|
| 1일차 | 서면 도착, 짐 풀기 | 전포카페거리 브런치 | 광안리 야경 + 바다 뷰 카페 |
| 2일차 | 감천문화마을 사진 산책 | 국제시장 근처 맛집 | 흰여울문화마을 골목 투어 |
| 3일차 | 태종대 산책 | 자갈치시장 회 한 끼 | 귀가 전 남포동 쇼핑 |

예산은 숙소(1박 4만원대 게스트하우스 기준)와 식비 위주로 40만원 안에 맞췄어요.
혹시 카페 리스트를 더 구체적으로 뽑아드릴까요?`

function useRevealed() {
  const [revealed, setRevealed] = useState(false)
  return { revealed, reveal: () => setRevealed(true) }
}

export function Prompting() {
  const bad = useRevealed()
  const [goodInput, setGoodInput] = useState('')
  const good = useRevealed()
  const canReveal = goodInput.trim().length >= 15

  return (
    <ModuleFrame moduleId="prompting">
      <section>
        <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
          이 기능이 뭔가요?
        </h2>
        <p className="leading-relaxed text-ink-soft">
          클로드는 채팅창에 글을 쓰면 그 내용을 바탕으로 답을 만들어주는 대화형
          AI예요. 이때 우리가 쓰는 질문이나 요청을 <strong className="text-ink">프롬프트(prompt)</strong>라고
          불러요. 프롬프트에 상황, 목적, 원하는 형식을 구체적으로 담을수록 클로드는
          되묻는 대신 바로 쓸 수 있는 답을 줘요. 즉, 좋은 프롬프트를 쓰는 건 클로드를
          잘 쓰는 가장 빠른 방법이에요.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
          실습: 나쁜 질문 vs 좋은 질문
        </h2>

        <div className="mb-5 rounded-2xl border border-border bg-surface p-5">
          <p className="mb-2 text-xs font-semibold tracking-wide text-ink-soft uppercase">
            1단계 · 막연한 프롬프트
          </p>
          <div className="mb-3 rounded-xl bg-surface-2 px-4 py-3 font-mono text-sm text-ink">
            {BAD_PROMPT}
          </div>
          <button
            type="button"
            onClick={bad.reveal}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            이렇게 물어보면 클로드가 뭐라고 할까요?
          </button>
          {bad.revealed && (
            <div className="mt-4 rounded-xl border border-border bg-paper p-4 text-sm leading-relaxed whitespace-pre-line text-ink-soft">
              {BAD_ANSWER}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-accent/30 bg-surface p-5">
          <p className="mb-2 text-xs font-semibold tracking-wide text-accent uppercase">
            2단계 · 구체적인 프롬프트 직접 써보기
          </p>
          <p className="mb-3 text-sm text-ink-soft">
            아래 <strong className="text-ink">목적 · 조건 · 형식</strong>을 채워서 나만의
            프롬프트를 적어보세요. 예시를 그대로 써도 좋아요.
          </p>
          <textarea
            value={goodInput}
            onChange={(e) => setGoodInput(e.target.value)}
            placeholder={GOOD_PROMPT_TEMPLATE}
            rows={4}
            className="mb-2 w-full rounded-xl border border-border bg-paper p-3 font-mono text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none"
          />
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setGoodInput(GOOD_PROMPT_TEMPLATE)}
              className="text-xs font-medium text-ink-soft underline decoration-dotted underline-offset-2 hover:text-accent"
            >
              예시로 채우기
            </button>
            <span className="text-xs text-ink-soft">
              {goodInput.trim().length}자 · 15자 이상 써보세요
            </span>
          </div>
          <button
            type="button"
            onClick={good.reveal}
            disabled={!canReveal}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            미리보기 보기
          </button>
          {good.revealed && (
            <div className="mt-4 rounded-xl border border-accent-2/30 bg-accent-2-soft/40 p-4 text-sm leading-relaxed whitespace-pre-line text-ink">
              {GOOD_ANSWER}
            </div>
          )}
        </div>

        {bad.revealed && good.revealed && (
          <p className="mt-4 text-sm text-ink-soft">
            같은 &ldquo;여행 계획&rdquo; 요청이지만, 조건을 구체적으로 준 두 번째
            프롬프트에서는 클로드가 되묻지 않고 바로 표까지 만들어줬죠? 이게 프롬프트
            품질의 차이예요.
          </p>
        )}
      </section>

      <ShortcutTip
        shortcuts={[
          { keys: ['Enter'], label: '메시지 보내기' },
          { keys: ['Shift', 'Enter'], label: '줄바꿈 (메시지 안 보내고 다음 줄로)' },
          { keys: ['Esc'], label: '클로드가 답변을 만드는 중일 때 생성 멈추기' },
        ]}
      />
    </ModuleFrame>
  )
}
