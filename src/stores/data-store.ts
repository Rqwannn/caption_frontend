import { create } from "zustand";

interface PredictionResponse {
  message: string;
  description: string;
  original_image: string;
}

interface DataStore {
  data: PredictionResponse;
  setData: (data: PredictionResponse) => void;
}

export const useData = create<DataStore>((set) => ({
  data: {
    message: "",
    description: "",
    original_image: "",
  },
  setData: (data) => set({ data }),
}));
