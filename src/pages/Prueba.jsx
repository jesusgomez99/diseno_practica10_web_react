import { fetchAllGames } from "../services/rawApi"; // Asegúrate de que esta función esté correctamente implementada
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Paginacion } from "../components/Paginacion";

export function Prueba() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const [pagina, setPagina] = useState(1); // Cambiado a 1 para empezar desde la primera página
    const [favorites, setFavorites] = useState([]); // Estado para los juegos favoritos

    const atrasarPag = () => {
        if (pagina > 1) {
            setPagina(pagina - 1);
        }
    };

    // Cargar juegos desde el API
    useEffect(() => {
        const obtenerJuegos = async () => {
            try {
                const data = await fetchAllGames(pagina); // Asegúrate de que esta función devuelva los datos correctamente
                setGames(data); // Almacena los datos en el estado
            } catch (error) {
                setError(error.message); // Maneja errores
            }
        };

        obtenerJuegos(); // Llama a la función para obtener los juegos
        window.scrollTo(0, 0); // Desplaza la ventana hacia arriba
    }, [pagina]); // Ejecuta cada vez que cambia la página

    // Cargar juegos favoritos desde el localStorage al inicio
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    }, []);

    // Función para agregar o quitar juegos de favoritos
    const toggleFavorite = (gameId) => {
        let updatedFavorites = [...favorites];

        if (updatedFavorites.includes(gameId)) {
            // Si ya está en favoritos, lo eliminamos
            updatedFavorites = updatedFavorites.filter((id) => id !== gameId);
        } else {
            // Si no está, lo agregamos
            updatedFavorites.push(gameId);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

    // Filtra los juegos según el término de búsqueda
    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Encabezado */}
            <h1 className="text-center pt-6 pb-1 px-5 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Lista de Juegos
            </h1>

            {/* Campo de búsqueda */}
            <div className="flex justify-center mb-8 px-5">
                <div className="relative w-full max-w-xl">
                    <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16l-4-4m0 0l4-4m-4 4h16"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar juegos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-300 ease-in-out shadow-sm text-lg"
                    />
                </div>
            </div>

            {/* Lista de juegos */}
            <div className="flex flex-wrap gap-8 justify-center">
                {filteredGames.map((game) => (
                    <div
                        key={game.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden w-80 transform hover:scale-105 transition duration-300"
                    >
                        <Link to={`/juego/${game.id}`} className="block">
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-gray-800">{game.name}</h2>
                                <p className="text-gray-600 mt-2">Rating: {game.rating}</p>
                                <p className="text-gray-600 mt-2">
                                    Platforms: {game.platforms.map(p => p.platform.name).join(", ")}
                                </p>
                            </div>
                        </Link>

                        {/* Botón de favorito */}
                        <div className="p-4 flex">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita que se redirija al hacer clic en el botón
                                    toggleFavorite(game.id);
                                }}
                                className={`px-4 py-2 rounded-full font-semibold ${
                                    favorites.includes(game.id)
                                        ? "bg-red-500 text-white"
                                        : "bg-gray-300 text-gray-700"
                                }`}
                            >
                                {favorites.includes(game.id) ? "Favorito" : "Agregar a Favoritos"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <Paginacion page={pagina} adelantar={() => setPagina(pagina + 1)} atrasar={atrasarPag} />
        </>
    );
}
