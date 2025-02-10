import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  parseISO,
  isToday,
  isPast,
  isWithinInterval,
  addHours,
} from "date-fns";
import api from "../api/api.js";

export interface Event {
  _id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: string;
  isFree: boolean;
  createdBy?: string;
  price: number | null;
  attending?: string[]; // Array of user IDs who are attending
}

interface EventState {
  events: Event[];
  userEvents: string[];
  loading: boolean;
  error: string;
  searchTerm: string;
  selectedCategory: string;
  selectedDate: Date | undefined;
  selectedTime: string;
  selectedStatus: string;
  selectedPriceFilter: string;
  currentUser: {
    id: string;
    role: "admin" | "user";
  } | null;
}

export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/events", userData);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const postEvents = createAsyncThunk(
  "event/postEvents",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/events/new-event", userData);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const updateEvents = createAsyncThunk(
  "event/updateEvents",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.patch("/events", userData);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const deleteEvents = createAsyncThunk<Event>(
  "event/deleteEvents",
  async (userData, { rejectWithValue }) => {
    try {
      // @ts-expect-error time
      const response = await api.delete(`/events?id=${userData?.id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const markAttendenceEvents = createAsyncThunk(
  "event/markAttendence",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/events/attendence`, userData);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const initialState: EventState = {
  events: [],
  userEvents: [],
  loading: false,
  error: "",
  searchTerm: "",
  selectedCategory: "all",
  selectedDate: undefined,
  selectedTime: "any",
  selectedStatus: "all",
  selectedPriceFilter: "all",
  currentUser: { id: "user123", role: "user" },
};

export const getEventStatus = (date: string, time: string) => {
  const eventDateTime = parseISO(`${date}T${time}`);
  const now = new Date();

  if (isToday(eventDateTime)) {
    const eventEndTime = addHours(eventDateTime, 2);
    if (isWithinInterval(now, { start: eventDateTime, end: eventEndTime })) {
      return "ongoing";
    }
    if (isPast(eventDateTime)) {
      return "ended";
    }
    return "today";
  }

  if (isPast(eventDateTime)) {
    return "past";
  }
  return "upcoming";
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    markAttendence: (state, action) => {
      const index = state.events.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.events[index].attendees = action.payload.attendees;
      }
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<Date | undefined>) => {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action: PayloadAction<string>) => {
      state.selectedTime = action.payload;
    },
    setSelectedStatus: (state, action: PayloadAction<string>) => {
      state.selectedStatus = action.payload;
    },
    setCurrentUser: (
      state,
      action: PayloadAction<{ id: string; role: "admin" | "user" }>
    ) => {
      state.currentUser = action.payload;
    },
    setSelectedPriceFilter: (state, action: PayloadAction<string>) => {
      state.selectedPriceFilter = action.payload;
    },
    addUserEvent: (state, action: PayloadAction<string>) => {
      state.userEvents.push(action.payload);
    },
    removeUserEvent: (state, action: PayloadAction<string>) => {
      state.userEvents = state.userEvents.filter(
        (item) => item !== action.payload
      );
    },
    toggleAttendance: (state, action: PayloadAction<number>) => {
      const event = state.events.find((event) => event._id === action.payload);
      if (event && state.currentUser) {
        const userId = state.currentUser.id;
        if (!event.attending) {
          event.attending = [];
        }
        const isAttending = event.attending.includes(userId);
        if (isAttending) {
          event.attending = event.attending.filter((id) => id !== userId);
          event.attendees -= 1;
        } else {
          event.attending.push(userId);
          event.attendees += 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.loading = false;
          // @ts-expect-error time
          state.events = action.payload.events;
          // @ts-expect-error time
          state.userEvents = action.payload.userEvents;
          state.error = null;
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(postEvents.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(postEvents.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        state.events.unshift(action.payload);
        state.error = null;
      })
      .addCase(postEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateEvents.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(
        updateEvents.fulfilled,
        (state, action: PayloadAction<Event>) => {
          state.loading = false;
          const index = state.events.findIndex(
            (item) => item._id === action.payload._id
          );
          if (index !== -1) {
            state.events[index] = action.payload; // Directly update the item
          }
          state.error = null;
        }
      )
      .addCase(updateEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(deleteEvents.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteEvents.fulfilled,
        (state, action: PayloadAction<Event>) => {
          state.loading = false;
          state.events = state.events.filter(
            (item) => item._id !== action.payload?._id
          );
          state.error = null;
        }
      )
      .addCase(deleteEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setSelectedDate,
  setSelectedTime,
  setSelectedStatus,
  setCurrentUser,
  setSelectedPriceFilter,
  toggleAttendance,
  markAttendence,
  addUserEvent,
  removeUserEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
