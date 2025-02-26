import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Nav } from './components/Nav.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home.jsx'
import { Prueba } from './pages/Prueba.jsx'
import { JuegoDetalles } from './pages/JuegoDetalles.jsx'
import { GeneroDetalles } from './pages/GeneroDetalles.jsx';
import { TagsDetalles } from './pages/TagsDetalles.jsx';
import { Footer } from './components/Footer.jsx'; // Importamos el Footer

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      {/* Navbar siempre visible */}
      <Nav />
      {/* Contenedor principal con flex: 1 */}
      <div className="container mx-auto mt-4">
        {/* Configuración de rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/juegos" element={<Prueba />} />
          <Route path="/juego/:id" element={<JuegoDetalles />} />
          <Route path="/genero/:id" element={<GeneroDetalles />} />
          <Route path="/tag/:id" element={<TagsDetalles />} />
        </Routes>
      </div>
      {/* Footer siempre visible */}
      <Footer />
    </Router>
  </StrictMode>,
)