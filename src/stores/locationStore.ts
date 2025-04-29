
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

export type LocationSource = 'google';

export interface LocationState {
  addressStructured?: AddressStructured;
  coords?: Coordinates;
  source?: LocationSource;
  isVerified: boolean;  // Flag to track if address has been verified
  
  // Actions
  setLocation: (data: Partial<LocationState>) => void;
  setAddressComponent: (key: keyof AddressStructured, value: string) => void;
  resetLocation: () => void;
  setVerified: (verified: boolean) => void; 
}

export const useLocationStore = create<LocationState>((set) => ({
  // Initial state
  addressStructured: undefined,
  coords: undefined,
  source: 'google',  // Default to Google as the only source
  isVerified: false,
  
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
    isVerified: true, // Set verified when manually editing components
  })),
  
  resetLocation: () => set({
    addressStructured: undefined,
    coords: undefined,
    source: 'google',
    isVerified: false,
  }),

  setVerified: (verified) => set((state) => ({
    ...state,
    isVerified: verified,
  })),
}));
