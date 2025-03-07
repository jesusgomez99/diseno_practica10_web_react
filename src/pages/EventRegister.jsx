import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joinEvent } from "../redux/eventSlice";

export function EventRegister() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [successMessage, setSuccessMessage] = useState(false); // Estado para el mensaje de éxito
    const [loadingDots, setLoadingDots] = useState('.'); // Estado para los puntos de carga

    useEffect(() => {
        if (id) {
            dispatch(joinEvent(Number(id))); // Apuntar al usuario al evento
            setSuccessMessage(true); // Mostrar mensaje de éxito
            
            // Función para actualizar los puntos de carga
            let dotCount = 1; // Contador de puntos
            const interval = setInterval(() => {
                setLoadingDots('.'.repeat(dotCount)); // Mostrar puntos según el contador
                dotCount = dotCount < 3 ? dotCount + 1 : 1; // Incrementar hasta 3, luego reiniciar a 1
            }, 500); // Cambiar cada 500 ms

            setTimeout(() => {
                clearInterval(interval); // Limpiar el intervalo
                setSuccessMessage(false); // Ocultar mensaje después de 5 segundos
                navigate("/eventos"); // Redirigir a la lista de eventos
            }, 5000); // 5 segundos
        }
    }, [id, dispatch, navigate]);

    return (
        <div>
            {successMessage && (
                <div className="text-center bg-green-500 text-white p-4 rounded-md">
                    Registrando Evento
                    {loadingDots}
                </div>
            )}
        </div>
    );
}