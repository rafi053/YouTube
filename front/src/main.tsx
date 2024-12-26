import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);
