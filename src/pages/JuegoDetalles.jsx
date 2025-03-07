"use client"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { InfoJuego } from "../components/InfoJuego"
import { fetchGameDetails } from "../services/rawApi"

export function JuegoDetalles() {
  const { id } = useParams() // Obtén el parámetro dinámico de la URL
  const [juego, setJuego] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const obtenerJuego = async () => {
      try {
        const data = await fetchGameDetails(id)
        setJuego(data)
      } catch (error) {
        setError("Error al cargar los datos")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    obtenerJuego()
  }, [id])

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!juego) {
    return <p>Juego no encontrado</p>
  }

  const publisher = juego.publishers?.length > 0 ? juego.publishers[0] : null

  return (
    <div className="container mx-auto mt-8">
      <InfoJuego
        id={Number.parseInt(id)} // Aquí está el cambio clave: pasar el ID al componente InfoJuego
        name={juego.name}
        img={juego.background_image}
        released={juego.released}
        genres={juego.genres}
        platforms={juego.platforms}
        rating={juego.rating}
        tags={juego.tags}
        publisher={publisher}
      />
    </div>
  )
}