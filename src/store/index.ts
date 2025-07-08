import { create } from "zustand";

interface Place {
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  thumbnail_url?: string;
}

interface SearchStore {
  places: Place[];
  // eslint-disable-next-line no-unused-vars
  setPlaces: (places: Place[]) => void;
  clearPlaces: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  places: [],
  setPlaces: (places) => set({ places }),
  clearPlaces: () => set({ places: [] }),
}));
