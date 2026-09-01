import { useState } from 'react'
import { ModuleFrame } from '../../components/ModuleFrame'

type SceneKey = 'fridge' | 'chart'

interface FollowUp {
  question: string
  answer: string
}

interface Scene {
  key: SceneKey
  label: string
  caption: string
  initialQuestion: string
  initialAnswer: string
  followUps: FollowUp[]
}

const SCENES: Scene[] = [
  {
    key: 'fridge',
    label: '🧊 냉장고 사진',
    caption: '냉장고 안을 찍은 사진',
    initialQuestion: '이 재료들로 뭘 만들 수 있을까?',
    initialAnswer:
      '사진 속에 달걀, 당근, 양파, 대파, 두부가 보여요. 이 재료면 두부 야채볶음이나 계란말이를 만들 수 있어요. 지금 있는 재료만으로도 장을 더 안 봐도 될 것 같아요!',
    followUps: [
      {
        question: '유통기한이 짧아 보이는 재료는?',
        answer:
          '잎이 있는 대파와 두부는 냉장 보관 중이어도 며칠 안에 쓰는 게 좋아요. 당근과 양파는 비교적 오래 두고 먹을 수 있는 편이에요.',
      },
      {
        question: '매운 음식을 못 먹는데 추천해줄 요리 있어?',
        answer:
          '두부계란찜을 추천해요. 간장 양념만 살짝 곁들이면 맵지 않고 순한 맛으로 즐길 수 있어요.',
      },
    ],
  },
  {
    key: 'chart',
    label: '📊 그래프 사진',
    caption: '월별 매출 막대그래프를 찍은 사진',
    initialQuestion: '이 그래프에서 가장 높은 달은 언제야?',
    initialAnswer: '그래프를 보면 4월이 가장 높아요. 다른 달보다 매출이 눈에 띄게 늘었네요.',
    followUps: [
      {
        question: '1월과 비교하면 얼마나 늘었어?',
        answer: '1월이 40, 4월이 70이니 30만큼, 그러니까 약 75% 늘어난 셈이에요.',
      },
      {
        question: '이 추세라면 다음 달은 어떨까?',
        answer:
          '정확한 예측은 어렵지만, 4월에 정점을 찍고 5월에 다시 줄어드는 흐름이라 다음 달도 비슷하거나 소폭 감소할 가능성이 있어요. 그래프만으로는 원인까지 알 수 없으니, 실제 데이터를 더 살펴보는 걸 추천해요.',
      },
    ],
  },
]

const CHART_BARS = [
  { label: '1월', value: 40 },
  { label: '2월', value: 55 },
  { label: '3월', value: 30 },
  { label: '4월', value: 70 },
  { label: '5월', value: 50 },
]

function ScenePreview({ scene }: { scene: Scene }) {
  if (scene.key === 'fridge') {
    return (
      <div className="rounded-xl border border-border bg-surface-2 p-4">
        <div className="grid grid-cols-5 gap-2 text-3xl">
          {['🥚', '🥕', '🧅', '🌱', '🧊'].map((e, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-lg bg-paper"
              aria-hidden="true"
            >
              {e}
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-ink-soft">{scene.caption}</p>
      </div>
    )
  }
  const max = Math.max(...CHART_BARS.map((b) => b.value))
  return (
    <div className="rounded-xl border border-border bg-surface-2 p-4">
      <div className="flex h-32 items-end gap-3">
        {CHART_BARS.map((b) => (
          <div key={b.label} className="flex h-full flex-1 items-end">
            <div
              className={`w-full rounded-t-md ${b.value === max ? 'bg-accent' : 'bg-accent/40'}`}
              style={{ height: `${(b.value / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-3">
        {CHART_BARS.map((b) => (
          <span key={b.label} className="flex-1 text-center text-xs text-ink-soft">
            {b.label}
          </span>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-ink-soft">{scene.caption}</p>
    </div>
  )
}

export function Vision() {
  const [sceneKey, setSceneKey] = useState<SceneKey | null>(null)
  const [question, setQuestion] = useState('')
  const [asked, setAsked] = useState(false)
  const [followUpsAsked, setFollowUpsAsked] = useState<number[]>([])

  const scene = SCENES.find((s) => s.key === sceneKey)

  function pickScene(key: SceneKey) {
    setSceneKey(key)
    const next = SCENES.find((s) => s.key === key)
    setQuestion(next?.initialQuestion ?? '')
    setAsked(false)
    setFollowUpsAsked([])
  }

  const canAsk = question.trim().length >= 8

  return (
    <ModuleFrame moduleId="vision">
      <section>
        <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
          이 기능이 뭔가요?
        </h2>
        <p className="leading-relaxed text-ink-soft">
          클로드는 사진을 보고 <strong className="text-ink">글자를 읽는 것</strong>을
          넘어서, 사진 속 상황을 이해하고 질문에 답할 수 있어요. 냉장고 사진을 보고
          요리를 추천하거나, 그래프 이미지를 보고 수치를 비교해주는 식이에요. 다만
          아주 작은 글씨나 흐릿한 부분은 놓칠 수 있고, 사진만으로 알 수 없는 원인까지
          단정하지는 않아요.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
          실습: 사진 하나로 대화 이어가기
        </h2>
        <p className="mb-3 text-sm text-ink-soft">
          사진을 하나 골라서 질문을 보내보세요. 답을 받은 뒤에는 후속 질문도 이어서
          해볼 수 있어요.
        </p>
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SCENES.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => pickScene(s.key)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                sceneKey === s.key
                  ? 'border-accent bg-accent-soft/40'
                  : 'border-border bg-surface hover:border-accent/50'
              }`}
            >
              <span className="text-sm font-medium text-ink">{s.label}</span>
              <span className="mt-1 block text-xs text-ink-soft">{s.caption}</span>
            </button>
          ))}
        </div>

        {scene && (
          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-4">
              <ScenePreview scene={scene} />
            </div>

            <p className="mb-2 text-xs font-semibold tracking-wide text-ink-soft uppercase">
              사진과 함께 질문 보내기
            </p>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={2}
              className="mb-2 w-full rounded-xl border border-border bg-paper p-3 text-sm text-ink focus:border-accent focus:outline-none"
            />
            <div className="mb-3 text-xs text-ink-soft">
              {question.trim().length}자 · 8자 이상 써보세요
            </div>
            {!asked ? (
              <button
                type="button"
                onClick={() => setAsked(true)}
                disabled={!canAsk}
                className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                사진과 함께 보내기
              </button>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-accent-2/30 bg-accent-2-soft/40 p-4 text-sm leading-relaxed text-ink">
                  {scene.initialAnswer}
                </div>

                {scene.followUps.map((f, i) => (
                  <div key={f.question}>
                    {followUpsAsked.includes(i) ? (
                      <div className="rounded-xl border border-border bg-surface-2 p-3">
                        <p className="mb-1 font-mono text-xs text-ink-soft">
                          나: {f.question}
                        </p>
                        <p className="text-sm leading-relaxed text-ink">{f.answer}</p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setFollowUpsAsked((prev) => [...prev, i])}
                        className="rounded-full border border-border px-3 py-1.5 text-xs text-ink-soft hover:border-accent hover:text-accent"
                      >
                        후속 질문 해보기 · &ldquo;{f.question}&rdquo;
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </ModuleFrame>
  )
}
