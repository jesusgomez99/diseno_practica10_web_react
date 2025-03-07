import React from "react";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";

const EventShare = () => {
  const { eventId } = useParams();
  const eventUrl = `${window.location.origin}/event/${eventId}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Comparte este evento</h1>
      <QRCode value={eventUrl} size={200} className="mt-4" />
      <p className="mt-4 text-gray-600">{eventUrl}</p>
    </div>
  );
};

export default EventShare;
