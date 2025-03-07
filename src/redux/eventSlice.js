import { createSlice } from "@reduxjs/toolkit";

// Cargar eventos guardados en localStorage
const storedEvents = JSON.parse(localStorage.getItem("userEvents")) || [];

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    userEvents: storedEvents, // Eventos en los que el usuario está apuntado
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    joinEvent: (state, action) => {
      if (!state.userEvents.includes(action.payload)) {
        state.userEvents.push(action.payload);
        localStorage.setItem("userEvents", JSON.stringify(state.userEvents));
      }
    },
    leaveEvent: (state, action) => {
      state.userEvents = state.userEvents.filter(id => id !== action.payload);
      localStorage.setItem("userEvents", JSON.stringify(state.userEvents));
    },
  },
});

export const { setEvents, joinEvent, leaveEvent } = eventSlice.actions;
export default eventSlice.reducer;
