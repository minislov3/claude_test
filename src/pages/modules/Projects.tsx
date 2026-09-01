import { useState } from 'react'
import { ModuleFrame } from '../../components/ModuleFrame'
import { ShortcutTip } from '../../components/ShortcutTip'

const SAMPLE_DOCS = ['브랜드_톤앤매너.pdf', '지난_원고_모음.docx', '타겟_독자_리서치.pdf']

const INSTRUCTION_TEMPLATE =
  '친근한 반말로 써줘. 문단은 3~4문장으로 짧게 끊고, 마지막엔 항상 한 줄 요약을 붙여줘.'

const CHAT_QUESTION = '이번 주제로 초안 하나 써줘'

const CHAT_ANSWER = `이번 주제로 초안 써봤어. 브랜드 톤앤매너 자료 보니까 너무 딱딱하지 않게, 친구한테 설명하듯 쓰는 게 핵심이더라. 그래서 이번 글도 편하게 반말로 풀어봤어. 지난 원고들이랑 문단 길이도 비슷하게 맞췄고.

(본문 내용은 생략할게. 실제로는 여기에 초안 전체가 이어져.)

📌 한 줄 요약: 지난 원고 스타일과 브랜드 가이드를 반영해서, 친근한 반말 톤으로 초안을 작성했어.`

export function Projects() {
  const [name, setName] = useState('')
  const [created, setCreated] = useState(false)
  const [addedDocs, setAddedDocs] = useState<string[]>([])
  const [instructions, setInstructions] = useState('')
  const [sent, setSent] = useState(false)

  function toggleDoc(doc: string) {
    setAddedDocs((prev) => (prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]))
  }

  return (
    <ModuleFrame moduleId="projects">
      <section>
        <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
          이 기능이 뭔가요?
        </h2>
        <p className="leading-relaxed text-ink-soft">
          <strong className="text-ink">Project(프로젝트)</strong>는 같은 주제로 계속
          이어지는 작업을 위한 전용 공간이에요. 참고할 자료(지식 베이스)를 미리
          올려두고, &ldquo;이렇게 답해줘&rdquo;라는 지침을 한 번만 정해두면, 이
          프로젝트 안의 모든 대화에서 매번 다시 설명하지 않아도 그 맥락이 자동으로
          적용돼요.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
          실습: 나만의 프로젝트 만들어보기
        </h2>

        {!created ? (
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="mb-2 text-xs font-semibold tracking-wide text-ink-soft uppercase">
              1단계 · 프로젝트 이름 정하기
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 블로그 원고 작업"
                className="flex-1 rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                disabled={name.trim().length < 2}
                onClick={() => setCreated(true)}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                프로젝트 만들기
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="rounded-2xl border border-accent/30 bg-accent-soft/30 px-5 py-3">
              <p className="text-sm font-medium text-ink">📁 {name}</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="mb-1 text-xs font-semibold tracking-wide text-ink-soft uppercase">
                2단계 · 지식 베이스에 자료 추가하기
              </p>
              <p className="mb-3 text-sm text-ink-soft">
                이 프로젝트와 관련된 참고 파일을 올려두면, 대화마다 다시 첨부하지
                않아도 클로드가 참고해요.
              </p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_DOCS.map((doc) => {
                  const added = addedDocs.includes(doc)
                  return (
                    <button
                      key={doc}
                      type="button"
                      onClick={() => toggleDoc(doc)}
                      className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                        added
                          ? 'border-accent-2 bg-accent-2-soft text-accent-2'
                          : 'border-border text-ink-soft hover:border-accent/50'
                      }`}
                    >
                      {added ? '✓ ' : '+ '}
                      {doc}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="mb-1 text-xs font-semibold tracking-wide text-ink-soft uppercase">
                3단계 · 이 프로젝트만의 지침 쓰기
              </p>
              <p className="mb-3 text-sm text-ink-soft">
                이 프로젝트 안에서는 항상 지켜줬으면 하는 규칙을 적어보세요.
              </p>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder={INSTRUCTION_TEMPLATE}
                rows={3}
                className="mb-2 w-full rounded-xl border border-border bg-paper p-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setInstructions(INSTRUCTION_TEMPLATE)}
                className="text-xs font-medium text-ink-soft underline decoration-dotted underline-offset-2 hover:text-accent"
              >
                예시로 채우기
              </button>
            </div>

            {addedDocs.length > 0 && instructions.trim().length >= 10 && (
              <div className="rounded-2xl border border-accent/30 bg-surface p-5">
                <p className="mb-2 text-xs font-semibold tracking-wide text-accent uppercase">
                  4단계 · 이 프로젝트 안에서 새 대화 시작해보기
                </p>
                <div className="mb-3 rounded-xl bg-surface-2 px-3 py-2 font-mono text-sm text-ink">
                  {CHAT_QUESTION}
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
                    <div className="rounded-xl border border-accent-2/30 bg-accent-2-soft/40 p-4 text-sm leading-relaxed whitespace-pre-line text-ink">
                      {CHAT_ANSWER}
                    </div>
                    <p className="mt-2 text-xs text-ink-soft">
                      질문에는 톤이나 형식을 다시 설명하지 않았지만, 방금 만든
                      지침과 지식 베이스가 자동으로 반영됐어요.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      <ShortcutTip
        shortcuts={[
          { keys: ['Ctrl', 'K'], label: '프로젝트·대화 목록을 검색해서 빠르게 이동하기 (Mac은 Cmd+K)' },
        ]}
      />
    </ModuleFrame>
  )
}
