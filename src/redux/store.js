import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice"; // Importa el reducer de eventos

export const store = configureStore({
  reducer: {
    events: eventReducer, // Añadimos el slice de eventos
  },
});