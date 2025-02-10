import { Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

export function Nav() {
  const location = useLocation(); // Obtiene la ruta actual

  return (
    <Navbar fluid className="bg-slate-200">
      {/* Botón de Toggle para dispositivos móviles */}
      <Navbar.Toggle />

      {/* Contenido del Navbar */}
      <Navbar.Collapse>

        <Navbar.Link as={Link} to="/" active={location.pathname === "/"}>
          Home
        </Navbar.Link>
        
        <Navbar.Link as={Link} to="/listajuegos" active={location.pathname === "/listajuegos"}>
          Lista de Juegos
        </Navbar.Link>
      
      </Navbar.Collapse>
    </Navbar>
  );
}