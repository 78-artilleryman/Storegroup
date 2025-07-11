import { create } from "zustand";

export interface Place {
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  thumbnail_url?: string;
}

export interface ClusterPlace {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface ClusteringResult {
  [key: string]: ClusterPlace[];
}

export interface GroupingResponse {
  result: ClusteringResult;
}

interface SearchStore {
  places: Place[];
  // eslint-disable-next-line no-unused-vars
  setPlaces: (places: Place[]) => void;
  selectedPlaces: Place[];
  // eslint-disable-next-line no-unused-vars
  addSelectedPlace: (place: Place) => void;
  // eslint-disable-next-line no-unused-vars
  removeSelectedPlace: (place: Place) => void;
  // eslint-disable-next-line no-unused-vars
  isPlaceSelected: (place: Place) => boolean;
  groupingResult: GroupingResponse | null;
  // eslint-disable-next-line no-unused-vars
  setGroupingResult: (result: GroupingResponse) => void;
  clearGroupingResult: () => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  places: [],
  setPlaces: (places) => set({ places }),
  selectedPlaces: [],
  addSelectedPlace: (place) => {
    const isAlreadySelected = get().selectedPlaces.some(
      (p) =>
        p.place_name === place.place_name &&
        p.address_name === place.address_name
    );
    if (!isAlreadySelected) {
      set((state) => ({
        selectedPlaces: [...state.selectedPlaces, place],
      }));
    }
  },
  removeSelectedPlace: (place) =>
    set((state) => ({
      selectedPlaces: state.selectedPlaces.filter(
        (p) =>
          !(
            p.place_name === place.place_name &&
            p.address_name === place.address_name
          )
      ),
    })),
  isPlaceSelected: (place) => {
    const state = get();
    return state.selectedPlaces.some(
      (p) =>
        p.place_name === place.place_name &&
        p.address_name === place.address_name
    );
  },
  groupingResult: null,
  setGroupingResult: (result) => set({ groupingResult: result }),
  clearGroupingResult: () => set({ groupingResult: null }),
}));
