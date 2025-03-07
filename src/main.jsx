import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";  // 🔹 Importamos Provider
import { store } from "./redux/store";   // 🔹 Importamos el store

import './index.css';
import { Nav } from './components/Nav.jsx';
import { Home } from './pages/Home.jsx';
import { Prueba } from './pages/Prueba.jsx';
import { JuegoDetalles } from './pages/JuegoDetalles.jsx';
import { GeneroDetalles } from './pages/GeneroDetalles.jsx';
import { TagsDetalles } from './pages/TagsDetalles.jsx';
import { PublisherDetalles } from './pages/PublisherDetalles.jsx';
import { Favoritos } from './pages/Favoritos.jsx';
import { Footer } from './components/Footer.jsx';
import {EventsPage} from './pages/EventsPage.jsx'
import {EventRegister} from "./pages/EventRegister.jsx"; 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* 🔹 Envolvemos la app con Redux */}
      <Router>
        <Nav />
        <div className="container mx-auto mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/juegos" element={<Prueba />} />
            <Route path="/juego/:id" element={<JuegoDetalles />} />
            <Route path="/genero/:id" element={<GeneroDetalles />} />
            <Route path="/tag/:id" element={<TagsDetalles />} />
            <Route path="/publisher/:id" element={<PublisherDetalles />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/eventos" element={<EventsPage/>}/>
            <Route path="/evento/:id" element={<EventRegister />} /> 

          </Routes>
        </div>
        <Footer />
      </Router>
    </Provider>
  </StrictMode>
);
