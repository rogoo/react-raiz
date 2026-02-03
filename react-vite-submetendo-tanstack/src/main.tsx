import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router";
import ErrorFallback from "./components/error/ErrorFallback.tsx";
import "./index.css";
import { appRoutes } from "./routes.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RouterProvider router={appRoutes} />
    </ErrorBoundary>
  </StrictMode>,
);
