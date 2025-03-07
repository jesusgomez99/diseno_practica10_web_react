const API_KEY = "f4cb5777acdd43038828b39aaf26a3af";
const BASE_URL = "https://api.rawg.io/api"


export const fetchPublishers = async (page = 1,query) => {
  if(query){
    const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&search=${query}&page=${page}&page_size=40`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
    console.log(data)
    return data
  }
    const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&page=${page}&page_size=40`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
    return data
}

export const fetchPublisherDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/publishers/${id}?key=${API_KEY}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch publisher details')
  }
  const data = await response.json()
  return data
}

export const fetchPublisherGames = async (id) => {
  
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&publishers=${id}&ordering=-metacritic&page_size=20`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch publisher games')
    }
    const data = await response.json()
    return data.results
}

export const fetchRecentGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=20&ordering=released`)
    if (!response.ok) {
      throw new Error("Error en la solicitud a la API")
    }
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error fetching recent games:", error)
    throw error
  }
}

export const fetchBetterGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=20&ordering=-metacritic`)
    if (!response.ok) {
      throw new Error("Error en la solicitud a la API")
    }
    const data = await response.json()

    console.log(data.results)
    return data.results
  } catch (error) {
    console.error("Error fetching better games:", error)
    throw error
  }
}

export const fetchAllGames = async (pagina) => {
  try {
      const response = await fetch(`https://api.rawg.io/api/games?key=f4cb5777acdd43038828b39aaf26a3af&page=${pagina}`);
      
      if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      return data.results; // Devuelve los resultados para que puedan ser utilizados en el componente

  } catch (error) {
      console.error(error.message); // Maneja errores
      throw error; // Lanza el error para que pueda ser manejado en el componente que llama a esta función
  }
};

export const fetchAllGamesGenre = async (pagina, genreId) => {
  const url = genreId 
      ? `https://api.rawg.io/api/games?key=f4cb5777acdd43038828b39aaf26a3af&page=${pagina}&genres=${genreId}`
      : `https://api.rawg.io/api/games?key=f4cb5777acdd43038828b39aaf26a3af&page=${pagina}`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
      }
      const data = await response.json();
      return data.results; // Devuelve los resultados
  } catch (error) {
      console.error("Error fetching games:", error);
      throw error; // Lanza el error para que pueda ser manejado en el componente que llama a esta función
  }
};


export const fetchGameDetails = async (id) => {
  
  try {
    const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`)
    if (!response.ok) {
      throw new Error("Error en la solicitud a la API")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching game details:", error)
    throw error
  }
}

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data)
    return data.results; // Devuelve la lista de géneros
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error; // Lanza el error para que pueda ser manejado en otro lugar
  }
};

export const fetchTags = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tags?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data)
    return data.results; // Devuelve la lista de géneros
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error; // Lanza el error para que pueda ser manejado en otro lugar
  }
};

function localizarId(genres,genre){
  console.log(genres)
  const foundGenre = genres.find(g => g.name == genre);
  return foundGenre ? foundGenre.id : null;
}