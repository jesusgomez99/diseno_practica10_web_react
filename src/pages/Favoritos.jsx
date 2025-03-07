import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGameDetails } from "../services/rawApi";

export function Favoritos() {
    const [favoriteGames, setFavoriteGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);

    // Cargar IDs de juegos favoritos desde localStorage
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                setLoading(true);
                // Obtener IDs de favoritos del localStorage
                const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
                setFavorites(savedFavorites);

                // Si no hay favoritos, terminar la carga
                if (savedFavorites.length === 0) {
                    setLoading(false);
                    return;
                }

                // Obtener detalles de cada juego favorito
                const gamesData = await Promise.all(
                    savedFavorites
                        .filter(id => id !== null) // Excluir el juego no deseado
                        .map(id => fetchGameDetails(id))
                );
                
                setFavoriteGames(gamesData);
            } catch (err) {
                setError("Error al cargar los juegos favoritos: " + err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();

        console.log(localStorage.getItem("favorites"));

    }, []);

    // Función para quitar un juego de favoritos
    const toggleFavorite = (gameId) => {
        let updatedFavorites = [...favorites];
        
        // Siempre quitamos el juego de favoritos en esta vista
        updatedFavorites = updatedFavorites.filter(id => id !== gameId);
        
        // Actualizar estado y localStorage
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        
        // Actualizar la lista de juegos mostrados
        setFavoriteGames(favoriteGames.filter(game => game.id !== gameId));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-2xl font-semibold text-gray-600">Cargando tus juegos favoritos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center mt-10 p-4 bg-red-100 rounded-lg max-w-2xl mx-auto">
                <p className="text-xl font-bold">Error</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <>
            {/* Encabezado */}
            <h1 className="text-center pt-6 pb-1 px-5 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Favoritos
            </h1>

            {/* Mensaje si no hay favoritos */}
            {favoriteGames.length === 0 ? (
                <div className="text-center mt-10 p-8 bg-gray-100 rounded-lg max-w-2xl mx-auto">
                    <p className="text-2xl font-semibold text-gray-600 mb-4">No tienes juegos favoritos</p>
                    <p className="text-gray-500 mb-6">Agrega juegos a tus favoritos para verlos aquí</p>
                    <Link 
                        to="/juegos" 
                        className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition duration-300"
                    >
                        Explorar juegos
                    </Link>
                </div>
            ) : (
                // Lista de juegos favoritos
                <div className="flex flex-wrap gap-8 justify-center mt-8 px-4">
                    {favoriteGames.map((game) => (
                        <div
                            key={game.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden w-80 transform hover:scale-105 transition duration-300"
                        >
                            <Link to={`/juego/${game.id}`} className="block">
                                <img
                                    src={game.background_image || "/placeholder.svg"}
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

                            {/* Botón para quitar de favoritos */}
                            <div className="p-4 flex">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(game.id);
                                    }}
                                    className="px-4 py-2 rounded-full font-semibold bg-red-500 text-white hover:bg-red-600 transition duration-300"
                                >
                                    Quitar de Favoritos
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
