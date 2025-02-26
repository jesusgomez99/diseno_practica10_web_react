import { Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

export function Nav() {
  const location = useLocation(); // Obtiene la ruta actual

  return (
    <Navbar
      fluid
      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg"
    >
      {/* Nombre de la web siempre visible */}
      <Navbar.Brand>
        <span className="text-xl font-bold text-yellow-300">GameAme</span>
      </Navbar.Brand>

      {/* Botón de Toggle para dispositivos móviles */}
      <Navbar.Toggle />

      {/* Contenido del Navbar */}
      <Navbar.Collapse>
        {/* Enlace Home */}
        <Link
          to="/"
          className={`${
            location.pathname === "/"
              ? "text-yellow-300 font-bold"
              : "hover:text-yellow-200"
          } transition duration-300`}
        >
          Home
        </Link>

        {/* Enlace Lista de Juegos */}
        <Link
          to="/juegos"
          className={`${
            location.pathname === "/juegos"
              ? "text-yellow-300 font-bold"
              : "hover:text-yellow-200"
          } transition duration-300`}
        >
          Lista de Juegos
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}