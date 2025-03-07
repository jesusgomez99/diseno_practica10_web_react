import { Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

export function Nav() {
  const location = useLocation(); // Obtiene la ruta actual

  return (
    <Navbar
      fluid
      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg lg:px-20 xl:px-32 2xl:px-44"
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

        {/* Enlace Lista de Favoritos */}
        <Link
          to="/favoritos"
          className={`${
            location.pathname === "/favoritos"
              ? "text-yellow-300 font-bold"
              : "hover:text-yellow-200"
          } transition duration-300`}
        >
          Favoritos
        </Link>

                {/* Enlace Lista de Eventos */}
                <Link
          to="/eventos"
          className={`${
            location.pathname === "/eventos"
              ? "text-yellow-300 font-bold"
              : "hover:text-yellow-200"
          } transition duration-300`}
        >
          Eventos
        </Link>

      </Navbar.Collapse>
    </Navbar>
  );
}