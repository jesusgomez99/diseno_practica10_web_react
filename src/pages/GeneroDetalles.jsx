import { fetchAllGamesGenre , fetchGenres} from "../services/rawApi"; // Asegúrate de que esta función esté correctamente implementada
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Paginacion } from "../components/Paginacion";

export function GeneroDetalles() {
    const { id } = useParams(); // Obtén el ID del género de la URL
    const [games, setGames] = useState([]);
    const [genreName, setGenreName] = useState(""); // Estado para almacenar el nombre del género
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const [pagina, setPagina] = useState(1); // Cambiado a 1 para empezar desde la primera página

    const atrasarPag = () => {
        if (pagina > 1) {
            setPagina(pagina - 1);
        }
    };

    useEffect(() => {
        const obtenerJuegosPorGenero = async () => {
            try {
                const data = await fetchAllGamesGenre(pagina, id); // Asegúrate de que esta función acepte el ID del género
                setGames(data); // Almacena los datos en el estado
            } catch (error) {
                setError(error.message); // Maneja errores
            }
        };

        const obtenerNombreGenero = async () => {
            try {
                const genres = await fetchGenres(); // Obtiene todos los géneros
                const genre = genres.find(g => g.id === parseInt(id)); // Busca el género por ID
                setGenreName(genre ? genre.name : "Desconocido"); // Guarda el nombre o "Desconocido" si no se encuentra
            } catch (error) {
                setError(error.message);
            }
        };

        obtenerNombreGenero();
        obtenerJuegosPorGenero(); // Llama a la función para obtener los juegos
        window.scrollTo(0, 0); // Desplaza la ventana hacia arriba
    }, [pagina, id]); // Ejecuta cada vez que cambia la página o el ID del género

    if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

    // Filtra los juegos según el término de búsqueda
    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Encabezado */}
            <h1 className="text-center pt-6 pb-1 px-5 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                {genreName}
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
                {
                    filteredGames.map((game) => (
                        <Link
                            to={`/juego/${game.id}`} // Redirige a la ruta con el ID del juego
                            key={game.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden w-80 transform hover:scale-105 transition duration-300"
                        >
                            <div>
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
                            </div>
                        </Link>
                    ))
                }
            </div>

            <Paginacion page={pagina} adelantar={() => setPagina(pagina + 1)} atrasar={atrasarPag} />
        </>
    );
}