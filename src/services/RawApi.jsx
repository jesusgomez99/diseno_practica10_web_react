const API_KEY = "f4cb5777acdd43038828b39aaf26a3af";

// Función que devuelve los datos de la API como una promesa
export function RawApi() {
  return fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al realizar la solicitud");
      }
      return response.json();
    })
    .then((data) => data) // Devuelve los datos
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
      throw error; // Lanza el error para manejarlo donde se use la función
    });
}