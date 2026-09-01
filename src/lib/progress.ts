import { useCallback, useEffect, useState } from 'react'
import { modules } from './modules'

const STORAGE_KEY = 'claude-tutorial-progress-v1'

type ProgressMap = Record<string, boolean>

function readStorage(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ProgressMap) : {}
  } catch {
    return {}
  }
}

function writeStorage(map: ProgressMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {
    // 저장 공간이 없거나 접근이 막힌 경우 조용히 무시합니다.
  }
}

// 같은 탭 안의 여러 컴포넌트가 진행 상황을 동시에 구독할 수 있도록
// 아주 단순한 pub/sub을 둡니다 (localStorage는 다른 탭에만 이벤트를 쏘기 때문).
const listeners = new Set<() => void>()
function notify() {
  listeners.forEach((fn) => fn())
}

export function useProgress() {
  const [map, setMap] = useState<ProgressMap>(() => readStorage())

  useEffect(() => {
    const listener = () => setMap(readStorage())
    listeners.add(listener)
    window.addEventListener('storage', listener)
    return () => {
      listeners.delete(listener)
      window.removeEventListener('storage', listener)
    }
  }, [])

  const isCompleted = useCallback((id: string) => Boolean(map[id]), [map])

  const setCompleted = useCallback((id: string, value: boolean) => {
    const next = { ...readStorage(), [id]: value }
    writeStorage(next)
    setMap(next)
    notify()
  }, [])

  const completedIds = Object.keys(map).filter((id) => map[id])
  const completedCount = modules.filter((m) => completedIds.includes(m.id)).length

  return {
    isCompleted,
    setCompleted,
    completedCount,
    totalCount: modules.length,
  }
}
