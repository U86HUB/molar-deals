
/// <reference types="vite/client" />

// Add declarations for global Vite variables
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SENTRY_DSN?: string;
  readonly APP_VERSION?: string;
  // Add other env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Add declaration for Vite's WebSocket token
declare const __WS_TOKEN__: string;
