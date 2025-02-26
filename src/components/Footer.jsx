import React from "react";

export function Footer() {
  return (
    <footer className=" mt-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Sección superior */}
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo e información */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-2xl font-bold">GameAme</h1>
            <p className="text-sm mt-2">
              Construyendo experiencias digitales únicas.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="flex flex-col md:flex-row gap-4">
            <a href="#about" className="hover:underline">
              Sobre Nosotros
            </a>
            <a href="#services" className="hover:underline">
              Servicios
            </a>
            <a href="#contact" className="hover:underline">
              Contacto
            </a>
            <a href="#faq" className="hover:underline">
              FAQ
            </a>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="my-6 border-gray-300" />

        {/* Sección inferior */}
        <div className="flex flex-wrap justify-between items-center">
          {/* Redes sociales */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.591l-.467 3.622h-3.124V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.94 13.94 0 011.671 3.149a4.916 4.916 0 001.523 6.573 4.897 4.897 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.918 4.918 0 004.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.756 0 8.332.013 7.052.072 5.773.131 4.548.392 3.465 1.475 2.382 2.558 2.121 3.783 2.062 5.062.013 8.332 0 8.756 0 12s.013 3.668.072 4.948c.059 1.279.32 2.504 1.403 3.587 1.083 1.083 2.308 1.344 3.587 1.403 1.279.059 1.703.072 4.948.072s3.668-.013 4.948-.072c1.279-.059 2.504-.32 3.587-1.403 1.083-1.083 1.344-2.308 1.403-3.587.059-1.279.072-1.703.072-4.948s-.013-3.668-.072-4.948c-.059-1.279-.32-2.504-1.403-3.587-1.083-1.083-2.308-1.344-3.587-1.403C15.668.013 15.244 0 12 0z" />
                <circle cx="12" cy="12" r="3.5" />
              </svg>
            </a>
          </div>

          {/* Derechos reservados */}
          <p className="text-sm mt-6 md:mt-0">
            © {new Date().getFullYear()} GameAme. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}