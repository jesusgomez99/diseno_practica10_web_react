import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { InfoJuego } from "../components/InfoJuego";
import { RawApi } from "../services/RawApi";

export function JuegoDetalles() {
  const { id } = useParams(); // Obtén el parámetro dinámico de la URL
  const [juego, setJuego] = useState(null); // Estado para almacenar los datos del juego
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Llama a la API para obtener los datos
    RawApi()
      .then((data) => {
        // Busca el juego correspondiente al ID
        const juegoEncontrado = data.results.find((juego) => juego.id.toString() === id);
        
        if (juegoEncontrado) {
          setJuego(juegoEncontrado); // Guarda el juego en el estado
        } else {
          setError("Juego no encontrado");
        }
      })
      .catch((error) => {
        setError("Error al cargar los datos");
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Finaliza el estado de carga
      });

  }, [id]);

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Muestra un mensaje de error si ocurre algún problema
  if (error) {
    return <p>{error}</p>;
  }

  if (juego) {
    console.log(juego)
  }

  // Si no hay juego, muestra un mensaje
  if (!juego) {
    return <p>Juego no encontrado</p>;
  }

  // Renderiza el componente InfoJuego con los datos del juego
  return (

    

    <div className="container mx-auto mt-8">
      <InfoJuego
        name={juego.name}
        img={juego.background_image}
        released={juego.released}
        genres={juego.genres}
        platforms={juego.platforms}
        rating={juego.rating}
        tags={juego.tags}
      />
    </div>
  );
}