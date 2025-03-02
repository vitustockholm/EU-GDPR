import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import radar from "vite-plugin-radar";

export default defineConfig({
  plugins: [
    react(),
    radar({
      analytics: {
        googleAnalytics: localStorage.getItem("cookie_consent") === "accepted" ? "G-XXXXXXXXXX" : null,
        gtm: localStorage.getItem("cookie_consent") === "accepted" ? "GTM-XXXXXXX" : null,
        facebookPixel: localStorage.getItem("cookie_consent") === "accepted" ? "XXXXXXXXXX" : null,
        googleAds: localStorage.getItem("cookie_consent") === "accepted" ? "AW-XXXXXXXXXX" : null,
      },
    }),
  ],
});
