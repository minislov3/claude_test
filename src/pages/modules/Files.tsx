import { useState } from 'react'
import { ModuleFrame } from '../../components/ModuleFrame'
import { ShortcutTip } from '../../components/ShortcutTip'

type FileType = 'doc' | 'image' | 'sheet'

interface FileOption {
  type: FileType
  emoji: string
  label: string
  filename: string
  size: string
}

const FILE_OPTIONS: FileOption[] = [
  { type: 'doc', emoji: '📄', label: '문서', filename: '인턴십_안내문.pdf', size: '312KB' },
  { type: 'image', emoji: '🧾', label: '이미지', filename: '영수증_사진.jpg', size: '1.8MB' },
  { type: 'sheet', emoji: '📊', label: '스프레드시트', filename: '9월_가계부.xlsx', size: '48KB' },
]

const ANALYSIS: Record<FileType, { title: string; body: string }> = {
  doc: {
    title: '문서 요약',
    body: `**핵심 요약**
- 모집 대상: 대학교 3~4학년, 인턴 기간 8주
- 지원 마감: 접수 시작일로부터 2주 이내
- 근무 형태: 주 4일, 재택 병행 가능

**주의할 점**
- 서류 통과자에 한해 화상 면접이 진행돼요.
- 자기소개서에 "지원 동기"와 "협업 경험"을 반드시 포함해야 해요.

문서 안에 표나 각주가 있어도 클로드가 놓치지 않고 같이 읽어줘요.`,
  },
  image: {
    title: '영수증 이미지 읽기',
    body: `사진 속 글자를 읽어서 표로 정리했어요.

| 항목 | 수량 | 금액 |
|---|---|---|
| 아메리카노 | 2 | 8,600원 |
| 크루아상 | 1 | 4,200원 |
| 텀블러 할인 | -1 | -500원 |

**합계: 12,300원**

사진이 살짝 흐리거나 기울어져 있어도 대체로 잘 읽어내지만, 글자가 너무 작거나
겹쳐 있으면 다시 확인을 요청할 수 있어요.`,
  },
  sheet: {
    title: '가계부 스프레드시트 분석',
    body: `9월 지출을 카테고리별로 합산했어요.

| 카테고리 | 지출액 | 비중 |
|---|---|---|
| 식비 | 412,000원 | 41% |
| 교통 | 98,000원 | 10% |
| 구독 서비스 | 47,000원 | 5% |
| 기타 | 443,000원 | 44% |

식비 지출이 지난달보다 늘었어요. 특히 배달 항목이 절반 이상을 차지하고
있어서, 이 부분을 줄이면 눈에 띄게 절약할 수 있을 것 같아요.`,
  },
}

function AnalysisBody({ text }: { text: string }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed text-ink">
      {text.split('\n\n').map((block, i) => {
        if (block.includes('|')) {
          const rows = block.trim().split('\n').filter((r) => !r.includes('---'))
          return (
            <div key={i} className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <tbody>
                  {rows.map((row, ri) => {
                    const cells = row
                      .split('|')
                      .map((c) => c.trim())
                      .filter(Boolean)
                    return (
                      <tr key={ri} className={ri === 0 ? 'font-medium text-ink' : 'text-ink-soft'}>
                        {cells.map((c, ci) => (
                          <td key={ci} className="border border-border px-3 py-1.5">
                            {c}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        }
        return (
          <p key={i} className="whitespace-pre-line">
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
        )
      })}
    </div>
  )
}

export function Files() {
  const [selected, setSelected] = useState<FileType | null>(null)
  const [sent, setSent] = useState(false)

  const option = FILE_OPTIONS.find((o) => o.type === selected)

  function selectFile(type: FileType) {
    setSelected(type)
    setSent(false)
  }

  return (
    <ModuleFrame moduleId="files">
      <section>
        <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
          이 기능이 뭔가요?
        </h2>
        <p className="leading-relaxed text-ink-soft">
          채팅창의 <strong className="text-ink">첨부 버튼(+)</strong>을 누르거나
          파일을 끌어다 놓으면, 클로드는 문서(PDF, Word 등)의 글을 읽고, 이미지
          속 글자나 상황을 파악하고, 스프레드시트의 표를 분석할 수 있어요. 파일
          내용을 직접 옮겨 적을 필요 없이, 파일 그대로 올리기만 하면 돼요.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
          실습: 파일 하나 첨부해서 분석 요청해보기
        </h2>
        <p className="mb-3 text-sm text-ink-soft">
          아래 세 가지 예시 파일 중 하나를 골라 첨부해보세요.
        </p>
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {FILE_OPTIONS.map((f) => (
            <button
              key={f.type}
              type="button"
              onClick={() => selectFile(f.type)}
              className={`flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-colors ${
                selected === f.type
                  ? 'border-accent bg-accent-soft/40'
                  : 'border-border bg-surface hover:border-accent/50'
              }`}
            >
              <span className="text-2xl" aria-hidden="true">
                {f.emoji}
              </span>
              <span className="text-sm font-medium text-ink">{f.label}</span>
              <span className="font-mono text-xs text-ink-soft">{f.filename}</span>
            </button>
          ))}
        </div>

        {option && (
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="mb-2 text-xs font-semibold tracking-wide text-ink-soft uppercase">
              채팅창 미리보기
            </p>
            <div className="mb-3 flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-3 py-2">
              <span className="text-xl" aria-hidden="true">
                {option.emoji}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{option.filename}</p>
                <p className="text-xs text-ink-soft">{option.size} · 첨부됨</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="첨부 취소"
                className="text-ink-soft hover:text-accent"
              >
                ✕
              </button>
            </div>
            <div className="mb-3 rounded-xl bg-paper px-3 py-2 font-mono text-sm text-ink">
              이 파일 좀 분석해줘
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
              <div className="mt-2 rounded-xl border border-accent-2/30 bg-accent-2-soft/40 p-4">
                <p className="mb-2 text-xs font-semibold tracking-wide text-accent-2 uppercase">
                  {ANALYSIS[option.type].title}
                </p>
                <AnalysisBody text={ANALYSIS[option.type].body} />
              </div>
            )}
          </div>
        )}
      </section>

      <ShortcutTip
        shortcuts={[
          { keys: ['Ctrl', 'V'], label: '복사해둔 이미지를 채팅창에 바로 붙여넣기 (Mac은 Cmd+V)' },
        ]}
      />
    </ModuleFrame>
  )
}
