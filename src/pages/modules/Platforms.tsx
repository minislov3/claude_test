import { useState } from 'react'
import { ModuleFrame } from '../../components/ModuleFrame'
import { ShortcutTip } from '../../components/ShortcutTip'

type PlatformKey = 'web' | 'desktop' | 'mobile' | 'chrome'

interface Platform {
  key: PlatformKey
  emoji: string
  label: string
  desc: string
  feature: string
}

const PLATFORMS: Platform[] = [
  {
    key: 'web',
    emoji: '🌐',
    label: '웹 (claude.ai)',
    desc: '설치 없이 브라우저에서 바로 사용해요.',
    feature: '어떤 기기에서 로그인하든 대화 기록이 그대로 이어져요.',
  },
  {
    key: 'desktop',
    emoji: '🖥️',
    label: '데스크톱 앱 (Mac / Windows)',
    desc: '컴퓨터에 설치해서 쓰는 앱이에요.',
    feature: '내 컴퓨터 폴더의 파일을 직접 읽고 작업해주는 Claude Cowork와 연결돼요.',
  },
  {
    key: 'mobile',
    emoji: '📱',
    label: '모바일 앱 (iOS / Android)',
    desc: '휴대폰에서 쓰는 앱이에요.',
    feature: '이동 중에도 대화를 이어가고, 음성으로 바로 물어볼 수 있어요.',
  },
  {
    key: 'chrome',
    emoji: '🧩',
    label: '브라우저 확장 (Claude in Chrome)',
    desc: 'Chrome에 추가하는 확장 프로그램이에요.',
    feature: '지금 보고 있는 웹페이지 내용을 바로 참고하거나, 페이지 안에서 클릭·입력까지 대신해줘요.',
  },
]

interface Scenario {
  text: string
  match: PlatformKey
}

const SCENARIOS: Scenario[] = [
  { text: '이동 중에 짧게 질문만 하고 싶어요', match: 'mobile' },
  { text: '여러 파일을 오가며 작업까지 맡기고 싶어요', match: 'desktop' },
  { text: '지금 보고 있는 웹페이지에 대해 바로 물어보고 싶어요', match: 'chrome' },
  { text: '설치 없이 브라우저에서 바로 써보고 싶어요', match: 'web' },
]

export function Platforms() {
  const [selected, setSelected] = useState<PlatformKey | null>(null)
  const matchedPlatform = PLATFORMS.find((p) => p.key === selected)

  return (
    <ModuleFrame moduleId="platforms">
      <section>
        <h2 className="mb-2 font-serif text-xl font-semibold text-ink">
          이 기능이 뭔가요?
        </h2>
        <p className="leading-relaxed text-ink-soft">
          클로드는 웹 브라우저뿐 아니라 데스크톱 앱, 모바일 앱, 브라우저 확장
          프로그램으로도 쓸 수 있어요. 어디서 어떻게 쓰느냐에 따라 더 편한 방식이
          달라요.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl font-semibold text-ink">
          실습: 나에게 맞는 플랫폼 찾아보기
        </h2>
        <p className="mb-3 text-sm text-ink-soft">아래 상황 중 나와 가장 비슷한 걸 골라보세요.</p>
        <div className="mb-5 grid grid-cols-1 gap-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.text}
              type="button"
              onClick={() => setSelected(s.match)}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                selected === s.match
                  ? 'border-accent bg-accent-soft text-ink'
                  : 'border-border text-ink-soft hover:border-accent/50'
              }`}
            >
              {s.text}
            </button>
          ))}
        </div>

        {matchedPlatform && (
          <div className="rounded-2xl border border-accent-2/30 bg-accent-2-soft/40 p-5">
            <p className="mb-1 text-xs font-semibold tracking-wide text-accent-2 uppercase">
              추천 플랫폼
            </p>
            <p className="mb-1 flex items-center gap-2 font-serif text-lg font-semibold text-ink">
              <span aria-hidden="true">{matchedPlatform.emoji}</span>
              {matchedPlatform.label}
            </p>
            <p className="mb-2 text-sm text-ink-soft">{matchedPlatform.desc}</p>
            <p className="text-sm leading-relaxed text-ink">{matchedPlatform.feature}</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-serif text-lg font-semibold text-ink">한눈에 비교</h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="bg-surface-2 text-left text-ink">
                <th className="border border-border px-3 py-2">플랫폼</th>
                <th className="border border-border px-3 py-2">한 줄 특징</th>
              </tr>
            </thead>
            <tbody>
              {PLATFORMS.map((p) => (
                <tr key={p.key} className="text-ink-soft">
                  <td className="border border-border px-3 py-2 whitespace-nowrap text-ink">
                    {p.emoji} {p.label}
                  </td>
                  <td className="border border-border px-3 py-2">{p.feature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ShortcutTip
        title="데스크톱 앱에서 알아두면 편한 기능"
        shortcuts={[
          { keys: ['Option', 'Option'], label: 'Mac 데스크톱 앱에서 빠른 입력창 바로 열기 (연속 두 번)' },
        ]}
      />
    </ModuleFrame>
  )
}
