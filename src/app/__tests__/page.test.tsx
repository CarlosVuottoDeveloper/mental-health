import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home", () => {
  it("renders the landing page hero as the only h1", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Acompanhamento psiquiátrico para quem está pronto para pedir ajuda",
      }),
    ).toBeInTheDocument();
  });
});
