import { configureStore } from "@reduxjs/toolkit";
import { contactAPI } from "./services/contactAPI";

const store = configureStore({
    reducer: {
        [contactAPI.reducerPath]: contactAPI.reducer,
    },
    // Adding the contactAPI middleware to the store
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(contactAPI.middleware)
});

export default store;