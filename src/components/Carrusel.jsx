import { Carousel } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { RawApi } from "../services/RawApi";

export function Carrusel() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llama a la función RawApi para obtener los datos
    RawApi()
      .then((data) => {
        setGames(data.results); // Almacena los datos en el estado
      })
      .catch((error) => {
        setError(error.message); // Maneja errores
      });
  }, []); // Ejecuta solo una vez al montar el componente

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="relative max-w-5xl mx-auto mt-10">
      <h2 className="text-center text-4xl font-bold text-yellow-100 mb-6">
        Juegos Destacados
      </h2>
      <div className="h-64 sm:h-80 xl:h-96 2xl:h-[500px] rounded-lg overflow-hidden shadow-lg">
        <Carousel
          slideInterval={3000} // Cambia cada 3 segundos
          indicators={true} // Muestra indicadores
          leftControl={
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2  text-white p-3 rounded-full  focus:outline-none "
              style={{ fontSize: "2rem" }} // Tamaño de la flecha
            >
              ◀
            </button>
          }
          rightControl={
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-3 rounded-full focus:outline-none  "
              style={{ fontSize: "2rem" }} // Tamaño de la flecha
            >
              ▶
            </button>
          }
        >
          {games
            .filter((game) => game.rating >= 4.5) // Filtra juegos con rating >= 4.5
            .map((game) => (
              <div key={game.id} className="relative w-full h-full bg-black">
                {/* Imagen del juego */}
                <img
                  className="w-full h-full object-cover opacity-80"
                  src={game.background_image}
                  alt={game.name}
                />
                {/* Información del juego */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
                  <h3 className="text-white text-xl font-bold">{game.name}</h3>
                  <p className="text-gray-300 text-sm">
                    Rating: {game.rating} ⭐
                  </p>
                </div>
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
}