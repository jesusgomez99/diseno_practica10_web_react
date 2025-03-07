import { QRCodeCanvas } from "qrcode.react"; // Import correcto
import { useEffect, useState } from "react";
import { fetchEvents } from "../services/events";
import { useDispatch, useSelector } from "react-redux";
import { joinEvent, leaveEvent } from "../redux/eventSlice";

export const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const userEvents = useSelector((state) => state.events.userEvents);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchEvents();
                setEvents(data);
            } catch (error) {
                console.error("Error al cargar eventos:", error);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    if (loading) {
        return <p className="text-center text-xl mt-10">Cargando eventos...</p>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-center pt-2 pb-5 px-5 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to pink-500">
                Eventos
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => {
                    const isJoined = userEvents.includes(event.id);
                    const eventURL = `${window.location.origin}/evento/${event.id}`;

                    return (
                        <div key={event.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src={event.image} alt={event.title} className="w-full h-72 object-cover" />
                            <div className="p-4">
                                <h2 className="text-2xl font-bold">{event.title}</h2>
                                <p className="text-gray-600">{event.location}</p>
                                <p className="mt-2">{event.descripcion}</p>

                                {/* Botón de Unirse/Salir */}
                                <button
                                    onClick={() => {
                                        if (isJoined) {
                                            dispatch(leaveEvent(event.id));
                                        } else {
                                            dispatch(joinEvent(event.id));
                                        }
                                    }}
                                    className={`mt-4 w-full px-4 py-2 font-semibold text-white rounded-lg ${
                                        isJoined ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                                    } transition duration-300`}
                                >
                                    {isJoined ? "Salir del evento" : "Unirse al evento"}
                                </button>

                                {/* Generador de QR */}
                                {isJoined && (
                                    <div className="mt-4 flex justify-center flex-col items-center font-bold text-green-500">
                                        <h1 className="mb-3">¡Apuntado! Compártelo</h1>
                                        <QRCodeCanvas value={eventURL} size={128} />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
