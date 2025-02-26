import { Juego } from "../components/Juego";
import { RawApi } from "../services/RawApi";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa useParams

export function TagsDetalles() {
    const { id } = useParams(); // Obtén el ID del tag de la URL
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const [tag, setTag] = useState(null);

    useEffect(() => {
        // Llama a la función RawApi para obtener los datos
        RawApi()
            .then((data) => {
                setGames(data.results); // Almacena los datos en el estado

                // Encuentra el primer juego que tenga el tag correspondiente
                const juegoConTag = data.results.find(game => 
                    game.tags.some(tag => tag.id.toString() === id)
                );

                // Si se encuentra un juego, establece el nombre del tag
                if (juegoConTag) {
                    const tagEncontrado = juegoConTag.tags.find(tag => tag.id.toString() === id);
                    if (tagEncontrado) {
                        setTag(tagEncontrado.name);
                    }
                }
            })
            .catch((error) => {
                setError(error.message); // Maneja errores
            });
    }, [id]); // Ejecuta solo una vez al montar el componente

    if (error) return <p>Error: {error}</p>;

    // Filtra los juegos según el término de búsqueda
    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        game.tags.some(tag => tag.id.toString() === id) // Filtra por tag
    );

    return (
        <>
            <h1 className="  text-center text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                {tag}</h1>

            {/* Campo de búsqueda */}
            <div className="flex justify-center mb-8 px-5">
                <div className="relative w-full max-w-xl">
                    <input
                        type="text"
                        placeholder="Buscar juegos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-slate-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out shadow-sm text-lg"
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-8 justify-center">
                {
                    filteredGames.map((game) => (
                        <Juego 
                            key={game.id} 
                            name={game.name} 
                            url={game.background_image}
                            rating={game.rating} 
                            platforms={game.platforms}
                            id={game.id}
                            tags={game.tags} // Pasar los tags al componente Juego
                        />
                    ))
                }
            </div>
        </>
    );
}