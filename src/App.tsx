import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Artifacts } from './pages/modules/Artifacts'
import { ComingSoon } from './pages/modules/ComingSoon'
import { Files } from './pages/modules/Files'
import { Prompting } from './pages/modules/Prompting'
import { Vision } from './pages/modules/Vision'

function NotFound() {
  return (
    <div className="pb-10">
      <h1 className="mb-3 font-serif text-2xl font-semibold text-ink">
        페이지를 찾을 수 없어요
      </h1>
      <p className="text-ink-soft">주소를 다시 확인해 주세요.</p>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tutorial/prompting" element={<Prompting />} />
        <Route path="/tutorial/artifacts" element={<Artifacts />} />
        <Route path="/tutorial/files" element={<Files />} />
        <Route path="/tutorial/vision" element={<Vision />} />
        <Route path="/tutorial/:moduleId" element={<ComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
