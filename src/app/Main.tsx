import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.js";

import { BrowserRouter } from "react-router-dom";
import { Provider as JotaiProvider } from "jotai";

import { ThemeProvider } from "./utils/ThemeProvider.js";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <JotaiProvider>
          <App />
        </JotaiProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
