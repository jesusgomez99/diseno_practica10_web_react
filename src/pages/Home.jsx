import React, { useState, useEffect } from "react";
import { Carrusel } from "../components/Carrusel";
import { CarruselEvent } from "../components/CarruselEvent";
import { fetchBetterGames } from "../services/rawApi";
import { fetchEvents } from "../services/events"; // Suponiendo que tienes un archivo para obtener los eventos

export function Home() {
  const [juegos, setJuegos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar juegos
    fetchBetterGames()
      .then((data) => {
        console.log(data); // Verifica la respuesta de la API
        if (Array.isArray(data) && data.length > 0) {
          setJuegos(data); // Asegúrate de que estás configurando el estado correctamente
        } else {
          setError("Invalid API response structure");
        }
      })
      .catch((err) => {
        setError(err.message);
      });

    // Cargar eventos
    fetchEvents()
      .then((data) => {
        setEventos(data); // Asegúrate de que estás configurando el estado correctamente para los eventos
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div>
      {/* Título principal */}
      <h1 className="text-center pt-10 pb-6 px-5 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        Bienvenido a GameAme
      </h1>

      {/* Descripción */}
      <p className="mb-10 text-center px-5 text-lg text-yellow-100 max-w-3xl mx-auto leading-relaxed">
        Descubre los videojuegos más destacados y explora un catálogo único.
        Utiliza nuestra potente herramienta de búsqueda para encontrar tus títulos favoritos
        y mantente al día con las últimas novedades del mundo gamer.
      </p>

      {/* Separador decorativo */}
      
      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-10"></div>

      {/* Carrusel de eventos */}
      <div className="max-w-5xl mx-auto px-5 mt-10">
        <CarruselEvent eventos={eventos} error={error} />
      </div>

      <p className="mt-7 mb-10 text-center px-5 text-lg text-purple-300 max-w-3xl mx-auto leading-relaxed">
          Nos enorgullece informaros sobre una emocionante actualización en nuestra página: hemos lanzado un nuevo apartado dedicado exclusivamente a los eventos del mundo de los videojuegos. Este nuevo espacio está diseñado para que puedas descubrir y seguir los mejores eventos, desde torneos hasta convenciones y lanzamientos.
      </p>

      {/* Separador decorativo */}
      <div className="mt-11 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-10"></div>

      {/* Carrusel de juegos */}
      <div className="max-w-5xl mx-auto px-5">
        <Carrusel juegos={juegos} error={error} />
      </div>


    </div>
  );
}
