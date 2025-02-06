import { create } from "zustand";

export const useportstore = create((set) => {
    return {
        port : null,
        setport : (port) => {
            set({
                port
            })
        }

    }
});