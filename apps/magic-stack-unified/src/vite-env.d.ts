/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_WS_URL: string
  readonly VITE_BACKEND_URL: string
  // Ajouter d'autres variables d'environnement ici
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
