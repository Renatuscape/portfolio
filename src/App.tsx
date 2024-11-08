import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Guestbook } from './pages/Guestbook'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'

function App() {

  return (
    <>
      <div className='viewport-grid'>
        <Header />
        <Routes>
          <Route path={"/portfolio/"} element={<Home />} />
          <Route path={"/portfolio/guestbook"} element={<Guestbook />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
