import { Carrusel } from "../components/Carrusel";

export function Home() {
    return (
        <div >
            {/* Título principal */}
            <h1 className="text-center pt-10 pb-6 px-5 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Bienvenido a GameAme
            </h1>

            {/* Descripción */}
            <p className="mb-10 text-center px-5 text-lg text-yellow-100 max-w-3xl mx-auto leading-relaxed">
                Descubre los videojuegos más destacados y explora un catálogo único. 
                Utiliza nuestra potente herramienta de búsqueda para encontrar tus títulos favoritos 
                y mantente al día con las últimas novedades del mundo gamer.
            </p>

            {/* Separador decorativo */}
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-10"></div>


            {/* Carrusel */}
            <div className="max-w-5xl mx-auto px-5">
                <Carrusel />
            </div>
        </div>
    );
}