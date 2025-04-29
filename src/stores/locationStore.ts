
import { create } from 'zustand';

export interface AddressStructured {
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export type LocationSource = 'manual' | 'google' | 'geolocation';

export interface LocationState {
  addressStructured?: AddressStructured;
  coords?: Coordinates;
  source?: LocationSource;
  
  // Actions
  setLocation: (data: Partial<LocationState>) => void;
  setAddressComponent: (key: keyof AddressStructured, value: string) => void;
  resetLocation: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  // Initial state
  addressStructured: undefined,
  coords: undefined,
  source: undefined,
  
  // Actions
  setLocation: (data) => set((state) => ({
    ...state,
    ...data,
  })),
  
  setAddressComponent: (key, value) => set((state) => ({
    ...state,
    addressStructured: {
      ...(state.addressStructured || {}),
      [key]: value,
    },
  })),
  
  resetLocation: () => set({
    addressStructured: undefined,
    coords: undefined,
    source: undefined,
  }),
}));
