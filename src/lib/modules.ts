export type ModuleCategory = 'essential' | 'optional'

export interface ModuleMeta {
  id: string
  path: string
  category: ModuleCategory
  emoji: string
  title: string
  shortDesc: string
  minutes: number
}

export const modules: ModuleMeta[] = [
  {
    id: 'prompting',
    path: '/tutorial/prompting',
    category: 'essential',
    emoji: '01',
    title: '기본 대화 & 프롬프트 작성법',
    shortDesc: '좋은 질문과 나쁜 질문의 차이를 직접 비교해봐요.',
    minutes: 4,
  },
  {
    id: 'artifacts',
    path: '/tutorial/artifacts',
    category: 'essential',
    emoji: '02',
    title: 'Artifacts (아티팩트)',
    shortDesc: '코드나 문서를 옆 패널에 바로 띄워서 확인해요.',
    minutes: 5,
  },
  {
    id: 'files',
    path: '/tutorial/files',
    category: 'essential',
    emoji: '03',
    title: '파일 업로드 및 분석',
    shortDesc: '문서·이미지·표를 올리면 클로드가 무엇을 해주는지 체험해요.',
    minutes: 4,
  },
  {
    id: 'vision',
    path: '/tutorial/vision',
    category: 'essential',
    emoji: '04',
    title: '이미지 인식/분석',
    shortDesc: '사진 한 장을 클로드가 어떻게 읽어내는지 살펴봐요.',
    minutes: 3,
  },
  {
    id: 'search-modes',
    path: '/tutorial/search-modes',
    category: 'essential',
    emoji: '05',
    title: '웹 검색 vs 확장 사고 vs 리서치',
    shortDesc: '세 가지 모드 중 언제 무엇을 눌러야 할지 감을 잡아요.',
    minutes: 5,
  },
  {
    id: 'projects',
    path: '/tutorial/projects',
    category: 'essential',
    emoji: '06',
    title: 'Projects (프로젝트)',
    shortDesc: '자료를 모아두고 지침을 미리 정해두는 작업 공간을 만들어봐요.',
    minutes: 5,
  },
  {
    id: 'memory',
    path: '/tutorial/memory',
    category: 'essential',
    emoji: '07',
    title: '메모리 기능',
    shortDesc: '클로드가 이전 대화를 어떻게 기억하는지 체험해요.',
    minutes: 4,
  },
  {
    id: 'styles',
    path: '/tutorial/styles',
    category: 'essential',
    emoji: '08',
    title: '스타일 / 커스텀 지침',
    shortDesc: '답변의 말투와 형식을 내 취향대로 바꿔봐요.',
    minutes: 4,
  },
  {
    id: 'claude-code',
    path: '/tutorial/claude-code',
    category: 'optional',
    emoji: '09',
    title: 'Claude Code 소개',
    shortDesc: '터미널에서 코드를 직접 작성해주는 에이전트를 알아봐요.',
    minutes: 3,
  },
  {
    id: 'mcp-connectors',
    path: '/tutorial/mcp-connectors',
    category: 'optional',
    emoji: '10',
    title: 'MCP 커넥터 개념',
    shortDesc: '외부 서비스와 클로드를 연결하는 원리를 체험해요.',
    minutes: 4,
  },
  {
    id: 'platforms',
    path: '/tutorial/platforms',
    category: 'optional',
    emoji: '11',
    title: '플랫폼별 접근 방법',
    shortDesc: '모바일 앱, 데스크톱 앱, 브라우저 확장을 비교해봐요.',
    minutes: 3,
  },
  {
    id: 'cowork',
    path: '/tutorial/cowork',
    category: 'optional',
    emoji: '12',
    title: 'Claude Cowork 소개',
    shortDesc: '내 파일을 직접 다루며 작업을 끝내는 에이전트를 알아봐요.',
    minutes: 3,
  },
]

export const essentialModules = modules.filter((m) => m.category === 'essential')
export const optionalModules = modules.filter((m) => m.category === 'optional')

export function getModuleById(id: string): ModuleMeta | undefined {
  return modules.find((m) => m.id === id)
}

export function getAdjacentModules(id: string): {
  prev: ModuleMeta | undefined
  next: ModuleMeta | undefined
} {
  const index = modules.findIndex((m) => m.id === id)
  if (index === -1) return { prev: undefined, next: undefined }
  return { prev: modules[index - 1], next: modules[index + 1] }
}
