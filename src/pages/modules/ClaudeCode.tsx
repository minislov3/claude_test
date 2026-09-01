import { useState } from 'react'
import { ModuleFrame } from '../../components/ModuleFrame'

const TASK = '회원가입 페이지에 이용약관 체크박스를 추가해줘'

const LOG_LINES = [
  '📂 회원가입 페이지 파일을 찾는 중... src/pages/Signup.tsx 발견',
  '🔍 기존 폼 구조를 읽어보는 중...',
  '✏️ 이용약관 체크박스와 유효성 검사 코드를 추가하는 중...',
  '🧪 테스트 실행 중... 12개 테스트 통과',
  '✅ 완료! 체크하지 않으면 가입 버튼이 비활성화되도록 만들었어요.',
]

const DIFF_BEFORE = `<button disabled={!email || !password}>
  가입하기
</button>`

const DIFF_AFTER = `<label>
  <input type="checkbox" checked={agreed} onChange={...} />
  이용약관에 동의합니다
</label>
<button disabled={!email || !password || !agreed}>
  가입하기
</button>`

export function ClaudeCode() {
  const [ran, setRan] = useState(false)

  return (
    <ModuleFrame moduleId="claude-code">
      <section>
        <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
          이 기능이 뭔가요?
        </h2>
        <p className="mb-3 leading-relaxed text-ink-soft">
          <strong className="text-ink">Claude Code</strong>는 터미널이나 코드
          편집기 안에서 실행되는 코딩 에이전트예요. 채팅으로 코드를 받아서
          직접 복사해 붙여넣는 대신, 클로드가 여러분의 프로젝트 폴더 안 파일을
          직접 읽고, 수정하고, 테스트까지 실행해줘요. 주로 개발자가 사용하는
          도구이지만, 어떤 식으로 동작하는지 개념만 가볍게 살펴볼게요.
        </p>
        <div className="rounded-xl border border-border bg-surface-2 p-4 text-sm text-ink-soft">
          <strong className="text-ink">일반 대화와 다른 점 —</strong> 일반 채팅은
          코드를 &ldquo;보여주기&rdquo;만 하지만, Claude Code는 실제 파일을
          &ldquo;고치고 실행&rdquo;까지 해요.
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
          실습: 터미널에 요청 하나 보내보기
        </h2>
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent/60" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-2/60" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-soft/40" aria-hidden="true" />
            <span className="ml-2 font-mono text-xs text-ink-soft">~/my-project — claude</span>
          </div>
          <div className="bg-[#1e1b16] p-4 font-mono text-sm text-[#e8e1d1]">
            <p className="mb-3">
              <span className="text-[#8fd18f]">&gt;</span> {TASK}
            </p>
            {!ran ? (
              <button
                type="button"
                onClick={() => setRan(true)}
                className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
              >
                Claude에게 시키기
              </button>
            ) : (
              <div className="space-y-1.5">
                {LOG_LINES.map((line) => (
                  <p key={line} className="text-xs leading-relaxed text-[#c9c2ae]">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {ran && (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-semibold tracking-wide text-ink-soft uppercase">
                수정 전
              </p>
              <pre className="overflow-x-auto rounded-xl border border-border bg-surface-2 p-3 text-xs leading-relaxed text-ink-soft">
                <code>{DIFF_BEFORE}</code>
              </pre>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold tracking-wide text-accent-2 uppercase">
                수정 후
              </p>
              <pre className="overflow-x-auto rounded-xl border border-accent-2/30 bg-accent-2-soft/40 p-3 text-xs leading-relaxed text-ink">
                <code>{DIFF_AFTER}</code>
              </pre>
            </div>
          </div>
        )}
      </section>
    </ModuleFrame>
  )
}
