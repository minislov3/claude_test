import { useState } from 'react'
import { ModuleFrame } from '../../components/ModuleFrame'

const TASK = '이 폴더 좀 정리하고, 전체 내용 요약 문서도 하나 만들어줘'

const LOG_LINES = [
  '📁 폴더를 살펴보는 중... 파일 8개 발견',
  '🗂️ 파일 종류와 이름 패턴을 보고 분류하는 중...',
  '📝 문서 내용을 하나씩 읽고 핵심을 정리하는 중...',
  '✅ 완료! 하위 폴더 4개로 정리했고, 요약.docx 파일을 새로 만들었어요.',
]

const BEFORE_FILES = [
  '제안서_v1.docx',
  '제안서_최종.docx',
  '제안서_진짜최종.docx',
  '예산안.xlsx',
  '회의록_0812.docx',
  '회의록_0819.docx',
  '로고.png',
  '참고자료.pdf',
]

const AFTER_TREE = [
  { label: '📁 문서/', items: ['제안서_v1.docx', '제안서_최종.docx', '제안서_진짜최종.docx'] },
  { label: '📁 예산/', items: ['예산안.xlsx'] },
  { label: '📁 회의록/', items: ['회의록_0812.docx', '회의록_0819.docx'] },
  { label: '📁 참고자료/', items: ['로고.png', '참고자료.pdf'] },
]

export function Cowork() {
  const [ran, setRan] = useState(false)

  return (
    <ModuleFrame moduleId="cowork">
      <section>
        <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
          이 기능이 뭔가요?
        </h2>
        <p className="mb-3 leading-relaxed text-ink-soft">
          <strong className="text-ink">Claude Cowork</strong>는 데스크톱(그리고
          모바일·웹으로도 점점 확장되고 있는)에서 실행되는 에이전트예요. 지정한
          폴더 안의 파일을 읽고, 정리하고, 새 문서를 만들 수 있는 권한을 줘서,
          &ldquo;방법을 설명해주는 것&rdquo;이 아니라 실제 결과물을 완성해줘요.
        </p>
        <div className="rounded-xl border border-border bg-surface-2 p-4 text-sm text-ink-soft">
          <strong className="text-ink">Claude Code와 다른 점 —</strong> Claude
          Code가 개발자를 위해 소스 코드를 다룬다면, Cowork는 문서·스프레드시트
          정리처럼 일반적인 사무 작업의 결과물을 만들어줘요.
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
          실습: 어질러진 폴더 정리 맡겨보기
        </h2>

        <div className="mb-4 rounded-2xl border border-border bg-surface p-5">
          <p className="mb-2 text-xs font-semibold tracking-wide text-ink-soft uppercase">
            정리 전 폴더
          </p>
          <div className="flex flex-wrap gap-2">
            {BEFORE_FILES.map((f) => (
              <span
                key={f}
                className="rounded-lg bg-surface-2 px-2.5 py-1 font-mono text-xs text-ink-soft"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent/60" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-2/60" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-soft/40" aria-hidden="true" />
            <span className="ml-2 font-mono text-xs text-ink-soft">Claude Cowork</span>
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
                Cowork에게 맡기기
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
          <div className="mt-4 rounded-2xl border border-accent-2/30 bg-accent-2-soft/40 p-5">
            <p className="mb-3 text-xs font-semibold tracking-wide text-accent-2 uppercase">
              정리 후 폴더 구조
            </p>
            <div className="space-y-2">
              {AFTER_TREE.map((folder) => (
                <div key={folder.label}>
                  <p className="font-mono text-sm text-ink">{folder.label}</p>
                  <ul className="ml-5 space-y-0.5">
                    {folder.items.map((item) => (
                      <li key={item} className="font-mono text-xs text-ink-soft">
                        └ {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="font-mono text-sm text-ink">📄 요약.docx <span className="text-xs text-accent-2">(새로 생성됨)</span></p>
            </div>
          </div>
        )}
      </section>
    </ModuleFrame>
  )
}
