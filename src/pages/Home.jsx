import { Carrusel } from "../components/Carrusel";

export function Home() {
    return (
        <>
            <h1 className="text-center pt-6 pb-10 px-5 text-6xl font-bold text-slate-600">
                Bienvenido a GameExplorer
            </h1>
            <p className="mb-10 text-center px-5 text-lg text-slate-500">
                Descubre los videojuegos más destacados y explora un catálogo único. 
                Utiliza nuestra potente herramienta de búsqueda para encontrar tus títulos favoritos 
                y mantente al día con las últimas novedades del mundo gamer.
            </p>

            <h1 className="text-center pt-6 pb-5 px-5 text-3xl font-bold text-slate-600">
                Los mejores juegos:
            </h1>
            <Carrusel />
        </>
    );
}