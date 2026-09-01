import { useState } from 'react'
import { ModuleFrame } from '../../components/ModuleFrame'

type PresetKey = 'normal' | 'concise' | 'explanatory' | 'formal'

const QUESTION = '이직을 고민 중인데 조언해줘'

const PRESETS: { key: PresetKey; label: string; desc: string; answer: string }[] = [
  {
    key: 'normal',
    label: '일반',
    desc: '무난하고 균형 잡힌 기본 답변',
    answer:
      '이직은 여러 요인을 종합적으로 고려해야 하는 결정이에요. 먼저 지금 회사에서 아쉬운 점이 정확히 뭔지 적어보세요. 연봉, 성장 가능성, 조직 문화 중 어떤 게 부족한지에 따라 다음 스텝이 달라져요. 이직 제안이 있다면 조건을 꼼꼼히 비교해보고, 없다면 이력서부터 정리해보는 것도 좋은 시작이에요.',
  },
  {
    key: 'concise',
    label: '간결',
    desc: '핵심만 짧게',
    answer: '세 가지만 체크해보세요.\n1. 지금 회사에서 아쉬운 점\n2. 이직 시 얻을 수 있는 것\n3. 이직 없이도 해결 가능한지\n답이 명확하면 결정도 쉬워져요.',
  },
  {
    key: 'explanatory',
    label: '설명형',
    desc: '배경과 이유를 자세히 풀어서',
    answer:
      '이직을 고민할 때는 보통 세 가지 축으로 나눠서 생각하면 도움이 돼요.\n\n**1. 무엇이 불만족스러운가**\n연봉, 성장, 문화, 워라밸 중 무엇이 가장 큰 이유인지 파악하면, 이직이 정말 해결책인지 구분할 수 있어요.\n\n**2. 이직으로 얻는 것과 잃는 것**\n새 회사가 주는 이점과 함께, 적응 비용이나 불확실성도 같이 고려해야 해요.\n\n**3. 타이밍**\n지금 당장 결정할 필요는 없어요. 준비 기간을 두고 이력서를 정리하면서 시장 상황을 살펴보는 것도 방법이에요.',
  },
  {
    key: 'formal',
    label: '격식체',
    desc: '정중하고 딱딱한 존댓말',
    answer:
      '이직을 고려하고 계시다면, 다음과 같은 사항을 검토해 보시길 권해 드립니다. 첫째, 현재 직장에서 느끼시는 불만족 요인을 구체적으로 파악하시기 바랍니다. 둘째, 이직을 통해 얻을 수 있는 이점과 감수해야 할 리스크를 비교 분석하시기 바랍니다. 셋째, 충분한 준비 기간을 두고 신중하게 결정하시는 것을 권해 드립니다.',
  },
]

const CUSTOM_TEMPLATE = '이모지를 많이 쓰고, 친한 친구처럼 편하게 반말로 답해줘.'

const CUSTOM_ANSWER =
  '음 이직 고민 중이구나 🤔 일단 지금 회사에서 뭐가 제일 별로인지부터 생각해봐! 연봉이야, 성장이야, 아니면 사람들이야? 그거 알면 답 훨씬 쉬워짐 😊 이직 제안이 있으면 그거 비교해보고, 없으면 이력서부터 슬슬 정리해두자!'

function AnswerBlock({ text }: { text: string }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed whitespace-pre-line text-ink">
      {text.split('\n\n').map((block, i) => (
        <p key={i}>
          {block.split('**').map((part, pi) =>
            pi % 2 === 1 ? (
              <strong key={pi} className="text-ink">
                {part}
              </strong>
            ) : (
              <span key={pi}>{part}</span>
            ),
          )}
        </p>
      ))}
    </div>
  )
}

export function Styles() {
  const [preset, setPreset] = useState<PresetKey | null>(null)
  const [customText, setCustomText] = useState('')
  const [customApplied, setCustomApplied] = useState(false)

  const activePreset = PRESETS.find((p) => p.key === preset)
  const canApplyCustom = customText.trim().length >= 10

  return (
    <ModuleFrame moduleId="styles">
      <section>
        <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
          이 기능이 뭔가요?
        </h2>
        <p className="leading-relaxed text-ink-soft">
          <strong className="text-ink">스타일(Style)</strong>은 클로드가 답을
          &ldquo;어떤 말투와 형식으로&rdquo; 전달할지 정하는 기능이에요. 같은
          질문이라도 스타일에 따라 짧게 요약해주거나, 자세히 설명해주거나, 격식을
          갖춰 답해줄 수 있어요. Projects의 지침이 특정 작업 공간에만 적용된다면,
          스타일은 대화창에서 바로 켜고 끌 수 있어서 더 가볍게 쓸 수 있어요.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
          실습: 같은 질문, 다른 스타일로 받아보기
        </h2>

        <div className="mb-4 rounded-2xl border border-border bg-surface-2 px-4 py-3">
          <p className="mb-1 text-xs font-semibold tracking-wide text-ink-soft uppercase">
            질문
          </p>
          <p className="font-mono text-sm text-ink">{QUESTION}</p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPreset(p.key)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                preset === p.key
                  ? 'border-accent bg-accent-soft text-accent'
                  : 'border-border text-ink-soft hover:border-accent/50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {activePreset && (
          <div className="mb-6 rounded-2xl border border-accent-2/30 bg-accent-2-soft/40 p-5">
            <p className="mb-1 text-xs font-semibold tracking-wide text-accent-2 uppercase">
              {activePreset.label} 스타일 · {activePreset.desc}
            </p>
            <AnswerBlock text={activePreset.answer} />
          </div>
        )}

        <div className="rounded-2xl border border-accent/30 bg-surface p-5">
          <p className="mb-2 text-xs font-semibold tracking-wide text-accent uppercase">
            나만의 커스텀 스타일 만들어보기
          </p>
          <p className="mb-3 text-sm text-ink-soft">
            말투나 형식을 자유롭게 문장으로 적어보세요. 특별한 규칙 없이 평소
            말하듯 적으면 돼요.
          </p>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder={CUSTOM_TEMPLATE}
            rows={2}
            className="mb-2 w-full rounded-xl border border-border bg-paper p-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none"
          />
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setCustomText(CUSTOM_TEMPLATE)}
              className="text-xs font-medium text-ink-soft underline decoration-dotted underline-offset-2 hover:text-accent"
            >
              예시로 채우기
            </button>
            <span className="text-xs text-ink-soft">
              {customText.trim().length}자 · 10자 이상 써보세요
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCustomApplied(true)}
            disabled={!canApplyCustom}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            이 스타일로 답 받아보기
          </button>
          {customApplied && (
            <div>
              <div className="mt-4 rounded-xl border border-accent-2/30 bg-accent-2-soft/40 p-4 text-sm leading-relaxed text-ink">
                {CUSTOM_ANSWER}
              </div>
              <p className="mt-2 text-xs text-ink-soft">
                실습에서는 미리 준비된 예시를 보여드려요. 실제 클로드에서는 방금
                적은 지침 내용이 그대로 반영돼요.
              </p>
            </div>
          )}
        </div>
      </section>
    </ModuleFrame>
  )
}
