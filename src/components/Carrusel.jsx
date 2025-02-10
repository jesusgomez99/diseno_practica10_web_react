import { Carousel } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { RawApi } from '../services/RawApi';

export function Carrusel (){

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

    if (error) return <p>Error: {error}</p>;

    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 ">
          <Carousel>
            
            {games
                .filter((game) => game.rating>=4.5)
                .map((game) => (
                    <img 
                        key={game.id}
                        className="w-full h-full object-cover object-top"
                        src={game.background_image} 
                        alt={game.name}
                    />
                ))
            
            
            }

          </Carousel>
        </div>
    );
}