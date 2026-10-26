import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LandingPageExample } from "@/design-system/examples/landing-page";
import { testimonials } from "@/design-system/examples/landing-content";
import { SiteHeader } from "./site-header";
import { TestimonialCard } from "./testimonial-card";

describe("TestimonialCard", () => {
  it("cycles through testimonials in both directions", async () => {
    const user = userEvent.setup();
    render(<TestimonialCard testimonials={testimonials} />);

    expect(screen.getByText(testimonials[0].name)).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Próximo depoimento" }),
    );
    expect(screen.getByText(testimonials[1].name)).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Próximo depoimento" }),
    );
    expect(screen.getByText(testimonials[0].name)).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Depoimento anterior" }),
    );
    expect(screen.getByText(testimonials[1].name)).toBeInTheDocument();
  });

  it("hides navigation when there is a single testimonial", () => {
    render(<TestimonialCard testimonials={testimonials.slice(0, 1)} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

describe("SiteHeader", () => {
  it("toggles the mobile menu", async () => {
    const user = userEvent.setup();
    render(
      <SiteHeader
        links={[{ label: "Sobre", href: "#sobre" }]}
        contact={{ label: "Fale conosco", href: "#contato" }}
      />,
    );

    const toggle = screen.getByRole("button", { name: "Abrir menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(document.getElementById("site-menu")).toBeInTheDocument();
  });
});

describe("LandingPageExample", () => {
  it("renders a single h1 and every section heading", () => {
    render(<LandingPageExample />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: "Perguntas frequentes" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Volte para o que faz você se sentir bem",
      }),
    ).toBeInTheDocument();

    const main = screen.getByRole("main");
    expect(within(main).getAllByRole("tab")).toHaveLength(4);
  });
});
