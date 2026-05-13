import { createFileRoute } from "@tanstack/react-router";

export const AboutComponent = () => {
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page.</p>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const Route = createFileRoute("/about")({
  component: AboutComponent,
});
