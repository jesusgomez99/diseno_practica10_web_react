export function InfoJuego({ name, img, released, genres, platforms, rating, tags }) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-center pt-2 pb-10 px-5 text-6xl font-bold text-slate-600">{name}</h1>

      <div className="grid md:grid-cols-2 gap-8 bg-slate-50 p-10 rounded-lg shadow-lg">
        <div>
          <img
            src={img || "/placeholder.svg"}
            alt={name}
            width={500}
            height={300}
            className="rounded-lg shadow-md object-cover w-full h-[300px]"
          />
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
                <span key={genero.id} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
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
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag.id} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

