import { useState } from 'react'
import { ModuleFrame } from '../../components/ModuleFrame'

const CHAT_PROMPT = "간단한 '오늘의 할 일' 앱을 만들어줘. 항목을 추가하고 지울 수 있게 해줘."

const CODE_SNIPPET = `function TodoApp() {
  const [todos, setTodos] = useState(['물 마시기', '산책하기'])
  const [text, setText] = useState('')

  function addTodo() {
    if (!text.trim()) return
    setTodos([...todos, text])
    setText('')
  }

  return (
    <div>
      <h2>오늘의 할 일</h2>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTodo}>추가</button>
      <ul>
        {todos.map(t => <li>{t}</li>)}
      </ul>
    </div>
  )
}`

type ThemeKey = 'default' | 'blue' | 'green' | 'rose'

const THEMES: Record<ThemeKey, { bg: string; ring: string; label: string }> = {
  default: { bg: 'bg-surface', ring: 'ring-border', label: '기본' },
  blue: { bg: 'bg-sky-50', ring: 'ring-sky-300', label: '파란색' },
  green: { bg: 'bg-emerald-50', ring: 'ring-emerald-300', label: '초록색' },
  rose: { bg: 'bg-rose-50', ring: 'ring-rose-300', label: '분홍색' },
}

function detectThemeRequest(input: string): ThemeKey | null {
  const t = input.toLowerCase()
  if (/(파랑|파란|블루|blue)/.test(t)) return 'blue'
  if (/(초록|그린|green)/.test(t)) return 'green'
  if (/(분홍|핑크|빨강|레드|pink|red|rose)/.test(t)) return 'rose'
  return null
}

export function Artifacts() {
  const [built, setBuilt] = useState(false)
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [todos, setTodos] = useState(['물 마시기', '산책하기'])
  const [newTodo, setNewTodo] = useState('')
  const [theme, setTheme] = useState<ThemeKey>('default')
  const [editRequest, setEditRequest] = useState('')
  const [editNote, setEditNote] = useState<string | null>(null)

  function addTodo() {
    if (!newTodo.trim()) return
    setTodos((prev) => [...prev, newTodo.trim()])
    setNewTodo('')
  }

  function removeTodo(index: number) {
    setTodos((prev) => prev.filter((_, i) => i !== index))
  }

  function applyEditRequest() {
    if (!editRequest.trim()) return
    const found = detectThemeRequest(editRequest)
    if (found) {
      setTheme(found)
      setEditNote(`요청을 반영해서 배경을 ${THEMES[found].label}으로 바꿨어요. 코드도 함께 업데이트돼요.`)
    } else {
      setEditNote(
        '실제 클로드라면 요청대로 코드를 고쳐줄 거예요. 이 실습에서는 색상 관련 요청(예: "파란색으로 바꿔줘")만 시뮬레이션할 수 있어요.',
      )
    }
    setEditRequest('')
  }

  const themeStyle = THEMES[theme]

  return (
    <ModuleFrame moduleId="artifacts">
      <section>
        <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
          이 기능이 뭔가요?
        </h2>
        <p className="leading-relaxed text-ink-soft">
          클로드에게 코드, 문서, 다이어그램처럼 &ldquo;결과물&rdquo;이 될 만한 걸
          부탁하면, 채팅 옆에 <strong className="text-ink">아티팩트(Artifact)</strong>라는
          별도 패널이 열려요. 이 패널은 실제로 실행되는 미리보기와, 그 안의 코드를
          바로 확인할 수 있어요. 대화를 이어가며 &ldquo;이 부분 바꿔줘&rdquo;라고
          하면, 새 패널이 또 열리는 게 아니라 <strong className="text-ink">같은
          아티팩트가 그 자리에서 업데이트</strong>돼요.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
          실습: 할 일 목록 앱 만들어보기
        </h2>

        <div className="mb-4 rounded-2xl border border-border bg-surface-2 px-4 py-3">
          <p className="mb-1 text-xs font-semibold tracking-wide text-ink-soft uppercase">
            내가 보낸 메시지
          </p>
          <p className="font-mono text-sm text-ink">{CHAT_PROMPT}</p>
        </div>

        {!built && (
          <button
            type="button"
            onClick={() => setBuilt(true)}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            클로드에게 만들어달라고 하기
          </button>
        )}

        {built && (
          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2">
              <p className="text-sm font-medium text-ink">📋 오늘의 할 일 · 아티팩트</p>
              <div className="flex overflow-hidden rounded-full border border-border text-xs">
                <button
                  type="button"
                  onClick={() => setTab('preview')}
                  className={`px-3 py-1 ${tab === 'preview' ? 'bg-accent text-white' : 'bg-surface text-ink-soft'}`}
                >
                  미리보기
                </button>
                <button
                  type="button"
                  onClick={() => setTab('code')}
                  className={`px-3 py-1 ${tab === 'code' ? 'bg-accent text-white' : 'bg-surface text-ink-soft'}`}
                >
                  코드
                </button>
              </div>
            </div>

            {tab === 'preview' ? (
              <div className={`${themeStyle.bg} p-5 transition-colors`}>
                <div className={`rounded-xl bg-white p-4 ring-1 ${themeStyle.ring}`}>
                  <h3 className="mb-3 font-serif text-lg font-semibold text-ink">
                    오늘의 할 일
                  </h3>
                  <div className="mb-3 flex gap-2">
                    <input
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                      placeholder="할 일을 입력하고 Enter"
                      className="flex-1 rounded-lg border border-border px-3 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={addTodo}
                      className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                    >
                      추가
                    </button>
                  </div>
                  <ul className="space-y-1.5">
                    {todos.map((t, i) => (
                      <li
                        key={`${t}-${i}`}
                        className="flex items-center justify-between rounded-lg bg-paper px-3 py-1.5 text-sm text-ink"
                      >
                        <span>{t}</span>
                        <button
                          type="button"
                          onClick={() => removeTodo(i)}
                          aria-label={`${t} 삭제`}
                          className="text-ink-soft hover:text-accent"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                    {todos.length === 0 && (
                      <li className="text-sm text-ink-soft">
                        할 일을 다 지웠어요. 위에서 새로 추가해보세요.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <pre className="overflow-x-auto bg-[#1e1b16] p-4 text-xs leading-relaxed text-[#e8e1d1]">
                <code>{CODE_SNIPPET}</code>
              </pre>
            )}
          </div>
        )}

        {built && (
          <div className="mt-4 rounded-2xl border border-accent/30 bg-surface p-5">
            <p className="mb-2 text-xs font-semibold tracking-wide text-accent uppercase">
              이어서 수정 요청해보기
            </p>
            <p className="mb-3 text-sm text-ink-soft">
              실제 대화처럼 &ldquo;이 부분 바꿔줘&rdquo;라고 요청해보세요. 새 패널이
              열리지 않고, 위 아티팩트가 바로 바뀌는 걸 확인할 수 있어요.
            </p>
            <div className="mb-2 flex flex-wrap gap-2">
              {['배경을 파란색으로 바꿔줘', '배경을 초록색으로 바꿔줘', '배경을 분홍색으로 바꿔줘'].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setEditRequest(suggestion)}
                    className="rounded-full border border-border px-3 py-1 text-xs text-ink-soft hover:border-accent hover:text-accent"
                  >
                    {suggestion}
                  </button>
                ),
              )}
            </div>
            <div className="flex gap-2">
              <input
                value={editRequest}
                onChange={(e) => setEditRequest(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && applyEditRequest()}
                placeholder="예: 배경을 파란색으로 바꿔줘"
                className="flex-1 rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                onClick={applyEditRequest}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                보내기
              </button>
            </div>
            {editNote && <p className="mt-3 text-sm text-ink-soft">{editNote}</p>}
          </div>
        )}
      </section>
    </ModuleFrame>
  )
}
