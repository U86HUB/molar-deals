
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

export type LocationSource = 'manual' | 'google';

export interface LocationState {
  addressStructured?: AddressStructured;
  coords?: Coordinates;
  source?: LocationSource;
  isVerified: boolean;  // New flag to track if address has been verified
  
  // Actions
  setLocation: (data: Partial<LocationState>) => void;
  setAddressComponent: (key: keyof AddressStructured, value: string) => void;
  resetLocation: () => void;
  setVerified: (verified: boolean) => void;  // New action
}

export const useLocationStore = create<LocationState>((set) => ({
  // Initial state
  addressStructured: undefined,
  coords: undefined,
  source: undefined,
  isVerified: false,  // New field defaults to false
  
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
    isVerified: false,  // Reset verified status
  }),

  setVerified: (verified) => set((state) => ({
    ...state,
    isVerified: verified,
  })),
}));
