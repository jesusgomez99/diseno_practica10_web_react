// src/services/events.js
export const events = [
    {
        id: 1,
        title: "React, una gran LIBRERÍA",
        location: "Las 300 viviendas, Sevilla",
        image: "https://sevilla.abc.es/Media/201206/07/diego-cigala-sevilla--644x362.jpg",
        descripcion: "En este evento, Diego 'el Cigala' nos proporcionará una gran charla sobre por qué React es una librería y NO un framework."
    },
    {
        id: 2,
        title: "Como ser un NPC",
        location: "Fuentealbilla, Albacete",
        image: "https://i.blogs.es/7a1f9d/photo-output-29/840_560.jpeg",
        descripcion: "Andrés Iniesta impartirá cátedra de cómo parecer un NPC en el mundo real y nos cuenta sus beneficios."
    },
    {
        id: 3,
        title: "El bug de la vida",
        location: "Vallecas, Madrid",
        image: "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/12/07/16704157474699.jpg",
        descripcion: "El Langui compartirá su experiencia personal sobre cómo se bugueó su propio cuerpo."
    },
];

// Simula una petición API con retraso
export const fetchEvents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(events);
        }, 500); // Simula un retraso de 500ms
    });
};
