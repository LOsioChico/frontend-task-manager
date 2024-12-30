export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,
  },
};
