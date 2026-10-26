import { render, screen } from "@testing-library/react";
import { WhatsAppButton } from "./whatsapp-button";

describe("WhatsAppButton", () => {
  it("opens WhatsApp in a new tab with a descriptive name", () => {
    render(
      <WhatsAppButton href="https://wa.me/1" label="Agendar pelo WhatsApp" />,
    );

    const link = screen.getByRole("link", { name: "Agendar pelo WhatsApp" });
    expect(link).toHaveAttribute("href", "https://wa.me/1");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).not.toHaveAttribute("inert");
  });

  it("starts hidden and out of the tab order when it has elements to hide over", () => {
    render(
      <WhatsAppButton
        href="https://wa.me/1"
        label="Agendar pelo WhatsApp"
        hideOverIds={["inicio"]}
      />,
    );

    const link = screen.getByRole("link", { hidden: true });
    expect(link).toHaveAttribute("inert");
    expect(link).toHaveClass("opacity-0");
  });
});
