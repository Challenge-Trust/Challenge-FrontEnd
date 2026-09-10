import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer, Navigation } from './components/Layout'
import Contato from './pages/Contato'
import Conversao from './pages/Conversao'
import Faq from './pages/Faq'
import Home from './pages/Home'
import QuemSomos from './pages/QuemSomos'
import Sobre from './pages/Sobre'

const pageStyles: Record<string, string> = {
  '/sobre': '/css/sobre.css',
  '/quem-somos': '/css/quemSomos.css',
  '/faq': '/css/faq.css',
  '/contato': '/css/contato.css',
  '/conversao': '/css/conversao.css',
}

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    const href = pageStyles[pathname]
    if (!href) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.dataset.pageStyle = pathname
    document.head.appendChild(link)
    return () => link.remove()
  }, [pathname])

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/conversao" element={<Conversao />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
