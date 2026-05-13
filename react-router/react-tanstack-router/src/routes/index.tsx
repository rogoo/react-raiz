import { createFileRoute } from "@tanstack/react-router";

export const HomeComponent = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>This is the home page.</p>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const Route = createFileRoute("/")({
  component: HomeComponent,
});
