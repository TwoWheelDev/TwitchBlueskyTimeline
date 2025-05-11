import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router'
import Panel from './Panel.tsx'
import Config from './Config.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter basename='/'>
    <Routes>
      <Route path='panel' element={<Panel />} />
      <Route path='config' element={<Config />} />
    </Routes>
    </HashRouter>
  </StrictMode>,
)
