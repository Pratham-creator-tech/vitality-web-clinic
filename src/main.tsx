
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "@/components/ui/theme-provider"
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="vitality-theme">
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
