import { Carousel } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { fetchBetterGames } from "../services/rawApi";

export function Carrusel({juegos, error}) {

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
            <div
              className="absolute top-1/2 left-4 transform -translate-y-1/2  text-white p-3 rounded-full  focus:outline-none "
              style={{ fontSize: "2rem" }} // Tamaño de la flecha
            >
              ◀
            </div>
          }
          rightControl={
            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-3 rounded-full focus:outline-none  "
              style={{ fontSize: "2rem" }} // Tamaño de la flecha
            >
              ▶
            </div>
          }
        >
          {juegos.map((game) => (
            <div key={game.id} className="relative w-full h-full bg-black">
              {game.background_image ? (
                <img
                  className="w-full h-full object-cover opacity-80"
                  src={game.background_image}
                  alt={game.name}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <p className="text-white">Imagen no disponible</p>
                </div>
              )}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
                <h3 className="text-white text-xl font-bold">{game.name}</h3>
                {game.rating && (
                  <p className="text-gray-300 text-sm">
                    Rating: {game.rating} ⭐
                  </p>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}