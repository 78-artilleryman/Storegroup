export interface StoreType {
  id: number;
  address?: string | null;
  name?: string | null;
  lat?: string | null;
  lag?: string | null;
}

export interface LocationType {
  lat?: string | null;
  lng?: string | null;
  zoom?: number | null;
}

export interface SearchType {
  q?: string;
  district?: string;
}
