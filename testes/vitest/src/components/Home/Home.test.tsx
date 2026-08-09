import { render, screen } from "@testing-library/react";
import Home from "./Home";

it("verifica titulo header", () => {
  render(<Home />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Vitest Test",
  );
});

it("verifica assinatura minha", () => {
  const { container } = render(<Home />);

  expect(container.querySelector("p.home__signature")).toHaveTextContent(
    "Noix. Rogoo",
  );
});
