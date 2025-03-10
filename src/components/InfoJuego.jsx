import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function InfoJuego({ name, img, released, genres, platforms, rating, tags, publisher, id }) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]); // Estado para los juegos favoritos
  const [isFavorite, setIsFavorite] = useState(false); // Estado específico para este juego

  // Cargar juegos favoritos desde localStorage y verificar si este juego está en favoritos
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
    setIsFavorite(savedFavorites.includes(id));
  }, [id]); 

  // Escuchar cambios en localStorage (para sincronizar entre pestañas)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(updatedFavorites);
      setIsFavorite(updatedFavorites.includes(id));
    };

    window.addEventListener("storage", handleStorageChange);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [id]);

  const toggleFavorite = () => {
    let updatedFavorites = [...favorites];
  
    if (updatedFavorites.includes(id)) {
      updatedFavorites = updatedFavorites.filter((gameId) => gameId !== id);
      setIsFavorite(false);
    } else {
      updatedFavorites.push(id);
      setIsFavorite(true);
    }
  
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-5 text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        {name}
      </h1>

      <div className="grid md:grid-cols-2 gap-8 bg-slate-400 p-10 rounded-lg shadow-lg">
        <div>
          <img
            src={img || "/placeholder.svg"}
            alt={name}
            width={500}
            height={300}
            className="border-4 border-slate-400 rounded-lg shadow-lg transition-transform transform object-cover w-full h-[300px]"          
          />
          {/* Botón de Favorito justo debajo de la imagen */}
          <div className="mt-4">
            <button
              onClick={toggleFavorite}
              className={`px-4 py-2 rounded-full font-semibold ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {isFavorite ? "Favorito" : "Agregar a Favoritos"}
            </button>
          </div>
          <p className="mt-4 text-lg text-gray-600">
            <span className="font-semibold">Lanzamiento:</span> {released}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Valoración</h2>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-yellow-500">{rating}</span>
              <span className="text-xl text-gray-500 ml-1">/5</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Géneros</h2>
            <div className="flex flex-wrap gap-2">
              {genres.map((genero) => (
                <span key={genero.id} 
                  className="cursor-pointer hover:bg-indigo-200 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                  onClick={() => navigate(`/genero/${genero.id}`)}
                >
                  {genero.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Plataformas</h2>
            <div className="flex flex-wrap gap-2">
              {platforms.map((plat) => (
                <span key={plat.platform.id} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {plat.platform.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Publisher</h2>
            <div className="flex flex-wrap gap-2">
              <span className="cursor-pointer px-3 py-1 hover:bg-red-200 bg-red-100 text-red-800 rounded-full text-sm"
                onClick={() => navigate(`/publisher/${publisher.id}`)}
              >{publisher.name}</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag.id} 
                  className="cursor-pointer hover:bg-gray-200 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  onClick={() => navigate(`/tag/${tag.id}`)}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
