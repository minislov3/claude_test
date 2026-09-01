import { useState } from 'react'
import { ModuleFrame } from '../../components/ModuleFrame'

interface Connector {
  key: string
  emoji: string
  label: string
}

const CONNECTORS: Connector[] = [
  { key: 'calendar', emoji: '📅', label: 'Google Calendar' },
  { key: 'gmail', emoji: '✉️', label: 'Gmail' },
  { key: 'slack', emoji: '💬', label: 'Slack' },
  { key: 'github', emoji: '🐙', label: 'GitHub' },
  { key: 'notion', emoji: '📝', label: 'Notion' },
]

const QUESTION = '이번 주에 회의 몇 개 있어?'

const ANSWER_NOT_CONNECTED =
  '아직 캘린더에 연결되어 있지 않아서 일정을 확인할 수 없어요. Customize → Connectors에서 Google Calendar를 연결하면 이런 질문에도 답해드릴 수 있어요.'

export function McpConnectors() {
  const [connected, setConnected] = useState<string[]>([])
  const [sent, setSent] = useState(false)

  function toggleConnector(key: string) {
    setConnected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
    setSent(false)
  }

  const calendarConnected = connected.includes('calendar')

  return (
    <ModuleFrame moduleId="mcp-connectors">
      <section>
        <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
          이 기능이 뭔가요?
        </h2>
        <p className="leading-relaxed text-ink-soft">
          클로드는 원래 여러분의 캘린더나 이메일, 사내 문서 같은 개인 데이터를
          볼 수 없어요. <strong className="text-ink">MCP 커넥터</strong>는 이런
          외부 서비스와 클로드를 연결해주는 통로예요. 설정의{' '}
          <strong className="text-ink">Customize → Connectors</strong>에서 원하는
          서비스를 연결하면, 그 서비스의 실제 데이터를 바탕으로 답해줄 수 있어요.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
          실습: 캘린더를 연결하고 질문해보기
        </h2>

        <p className="mb-2 text-xs font-semibold tracking-wide text-ink-soft uppercase">
          Customize → Connectors
        </p>
        <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {CONNECTORS.map((c) => {
            const isConnected = connected.includes(c.key)
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => toggleConnector(c.key)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                  isConnected
                    ? 'border-accent-2 bg-accent-2-soft/50'
                    : 'border-border bg-surface hover:border-accent/50'
                }`}
              >
                <span className="flex items-center gap-2 text-sm text-ink">
                  <span aria-hidden="true">{c.emoji}</span>
                  {c.label}
                </span>
                <span
                  className={`text-xs font-medium ${isConnected ? 'text-accent-2' : 'text-ink-soft'}`}
                >
                  {isConnected ? '✓ 연결됨' : '연결하기'}
                </span>
              </button>
            )
          })}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="mb-2 text-xs font-semibold tracking-wide text-ink-soft uppercase">
            채팅에서 물어보기
          </p>
          <div className="mb-3 rounded-xl bg-surface-2 px-3 py-2 font-mono text-sm text-ink">
            {QUESTION}
          </div>
          {!sent ? (
            <button
              type="button"
              onClick={() => setSent(true)}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              보내기
            </button>
          ) : calendarConnected ? (
            <div className="space-y-2 rounded-xl border border-accent-2/30 bg-accent-2-soft/40 p-4 text-sm leading-relaxed text-ink">
              <p>Google Calendar를 확인해보니 이번 주에 회의가 3개 있어요.</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    <tr className="font-medium text-ink">
                      <td className="border border-border px-3 py-1.5">날짜</td>
                      <td className="border border-border px-3 py-1.5">일정</td>
                    </tr>
                    <tr className="text-ink-soft">
                      <td className="border border-border px-3 py-1.5">화요일 오전 10시</td>
                      <td className="border border-border px-3 py-1.5">주간 팀 싱크</td>
                    </tr>
                    <tr className="text-ink-soft">
                      <td className="border border-border px-3 py-1.5">수요일 오후 3시</td>
                      <td className="border border-border px-3 py-1.5">디자인 리뷰</td>
                    </tr>
                    <tr className="text-ink-soft">
                      <td className="border border-border px-3 py-1.5">금요일 오전 11시</td>
                      <td className="border border-border px-3 py-1.5">클라이언트 미팅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>목요일은 비어 있어서 집중 작업하기 좋을 것 같아요.</p>
            </div>
          ) : (
            <div className="rounded-xl border border-accent/30 bg-accent-soft/40 p-4 text-sm leading-relaxed text-ink">
              {ANSWER_NOT_CONNECTED}
            </div>
          )}
        </div>
        {!calendarConnected && (
          <p className="mt-2 text-xs text-ink-soft">
            힌트: 위에서 📅 Google Calendar를 연결한 뒤 다시 보내보세요.
          </p>
        )}
      </section>
    </ModuleFrame>
  )
}
