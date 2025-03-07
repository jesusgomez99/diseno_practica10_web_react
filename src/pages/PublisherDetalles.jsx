import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPublisherDetails, fetchPublisherGames } from "../services/rawApi";

export function PublisherDetalles() {
  const { id } = useParams(); // Obtiene el ID del publisher desde la URL
  const [publisher, setPublisher] = useState(null); // Estado para almacenar los detalles del publisher
  const [juegos, setJuegos] = useState([]); // Estado para almacenar los juegos del publisher
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const obtenerPublisher = async () => {
      try {
        // Primero obtenemos los detalles del publisher
        const publisherData = await fetchPublisherDetails(id);
        console.log(publisherData)
        // Luego obtenemos los juegos del publisher
        const gamesData = await fetchPublisherGames(id);

        if (!publisherData || Object.keys(publisherData).length === 0) {
          throw new Error("No se encontraron datos del publisher");
        }

        setPublisher(publisherData);
        setJuegos(gamesData || []); // Si no hay juegos, simplemente no mostramos nada
      } catch (error) {
        setError("Error al cargar los datos del publisher");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    obtenerPublisher();
  }, [id]); // Asegúrate de que el `id` se pase correctamente como dependencia

  // Mostrar mensajes de carga, error o publisher no encontrado
  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!publisher) return <p className="text-center">Publisher no encontrado</p>;

  return (
    <div className="container mx-auto mt-8 p-4 bg-slate-400 rounded-xl">
      {/* Información del publisher */}
      <div className="flex flex-col items-center text-center">
        {publisher.image_background && (
          <img
            src={publisher.image_background}
            alt={publisher.name}
            className="w-full max-w-2xl h-64 object-cover rounded-lg shadow-lg"
          />
        )}
        <h1 className="text-3xl font-bold mt-4 text-slate-700">{publisher.name}</h1>
        <p className="text-blue-700 mt-2">Juegos publicados: {publisher.games_count}</p>
      </div>

      <div
        className="mt-4 text-gray-700"
        dangerouslySetInnerHTML={{ __html: publisher.description }}
        />

      {/* Lista de juegos del publisher */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3 text-slate-700">Top 20 juegos:</h2>
        {juegos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {juegos.map((juego) => (
              <Link
                key={juego.id}
                to={`/juego/${juego.id}`}
                className="bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700 flex flex-col items-center"
              >
                {juego.background_image && (
                  <img
                    src={juego.background_image}
                    alt={juego.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
                <p className="mt-2 font-semibold">{juego.name}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay juegos disponibles.</p>
        )}
      </div>
    </div>
  );
}
