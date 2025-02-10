import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Nav } from './components/Nav.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home.jsx'
import { Prueba } from './pages/Prueba.jsx'
import { JuegoDetalles } from './pages/JuegoDetalles.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode className="bg-slate-300">

    <Router>
          {/* Navbar siempre visible */}
          <Nav />
          <div className="container mx-auto mt-4">
            {/* Configuración de rutas */}
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/juegos" element={<Prueba/>} />
              <Route path="/juego/:id" element={<JuegoDetalles/>} />
            </Routes>
          </div>
    </Router>

  </StrictMode>,
)
