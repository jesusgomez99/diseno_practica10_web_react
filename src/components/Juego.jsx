import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Juego({ name, url, rating, platforms, genres, id }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false); // Estado para saber si el juego es favorito

  // Cargar el estado de favorito desde el localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(id)) {
      setIsFavorite(true);
    }
  }, [id]);

  // Función para manejar el clic en el ícono de favorito
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(id)) {
      // Si ya es favorito, lo eliminamos
      const newFavorites = favorites.filter((favId) => favId !== id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // Si no es favorito, lo agregamos
      favorites.push(id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <div
      className="cursor-pointer w-96 bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
      onClick={() => navigate(`/juego/${id}`)} //redirige al hacer click
    >
      <img className="w-full h-56 object-cover" src={url || "/placeholder.svg"} alt={name} />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{name}</h2>
        <div className="flex items-center mb-3">
          {/* Icono de favorito */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorite ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 text-red-500 mr-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Evitar que el clic también redirija al hacer clic en el ícono
              toggleFavorite();
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <span className="text-gray-600 font-semibold">{rating}/5</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {platforms.map((plataforma) => (
            <div
              className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
              key={plataforma.platform.id}
            >
              {plataforma.platform.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
