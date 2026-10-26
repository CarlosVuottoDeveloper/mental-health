import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  careStepsContent,
  faqContent,
  professional,
  whatsappHref,
} from "@/content/landing";
import { LandingPage } from "@/components/landing-page";
import { CareStepsSection } from "./care-steps-section";
import { FaqSection } from "./faq-section";
import { SiteHeader } from "./site-header";

describe("CareStepsSection", () => {
  it("renders the steps as an ordered list with a heading each", () => {
    render(<CareStepsSection {...careStepsContent} />);

    const steps = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(steps).toHaveLength(3);
    expect(
      within(steps[0]).getByRole("heading", {
        level: 3,
        name: "Primeira consulta",
      }),
    ).toBeInTheDocument();
  });

  it("ends with the booking call to action", () => {
    render(<CareStepsSection {...careStepsContent} />);
    expect(
      screen.getByRole("link", { name: "Agendar primeira consulta" }),
    ).toHaveAttribute("href", whatsappHref);
  });
});

describe("FaqSection", () => {
  it("renders a single category without tabs", () => {
    render(<FaqSection {...faqContent} />);
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(8);
  });

  it("keeps closed answers in the HTML, hidden by CSS", () => {
    const { container } = render(<FaqSection {...faqContent} />);
    const [, closed] = faqContent.categories[0].items;

    const answer = screen.getByText(closed.answer);
    expect(answer.closest("[data-state]")).toHaveAttribute(
      "data-state",
      "closed",
    );
    expect(container.textContent).toContain(closed.answer);
  });

  it("groups several categories in tabs", () => {
    const items = faqContent.categories[0].items;
    render(
      <FaqSection
        {...faqContent}
        categories={[
          { id: "a", label: "Consulta", items: items.slice(0, 2) },
          { id: "b", label: "Tratamento", items: items.slice(2, 4) },
        ]}
      />,
    );
    expect(screen.getAllByRole("tab")).toHaveLength(2);
  });
});

describe("SiteHeader", () => {
  const props = {
    links: [
      { label: "Sobre", href: "/#sobre" },
      { label: "Dúvidas", href: "/#duvidas" },
    ],
    contact: { label: "Agendar pelo WhatsApp", href: "https://wa.me/1" },
  };

  async function openMenu() {
    const user = userEvent.setup();
    render(<SiteHeader {...props} />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    return user;
  }

  it("toggles the mobile menu", async () => {
    await openMenu();
    expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(document.getElementById("site-menu")).toBeInTheDocument();
  });

  it("closes the menu with Escape and returns focus to the toggle", async () => {
    const user = await openMenu();
    await user.keyboard("{Escape}");

    const toggle = screen.getByRole("button", { name: "Abrir menu" });
    expect(document.getElementById("site-menu")).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it("keeps Tab inside the open menu", async () => {
    const user = await openMenu();
    const menu = within(document.getElementById("site-menu")!);
    const lastItem = menu.getByRole("link", { name: "Agendar pelo WhatsApp" });

    lastItem.focus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveFocus();

    await user.tab({ shift: true });
    expect(lastItem).toHaveFocus();
  });

  it("closes the menu after choosing a section", async () => {
    const user = await openMenu();
    const menu = within(document.getElementById("site-menu")!);
    await user.click(menu.getByRole("link", { name: "Sobre" }));
    expect(document.getElementById("site-menu")).not.toBeInTheDocument();
  });

  it("is solid by default", () => {
    const { container } = render(<SiteHeader {...props} />);
    expect(container.querySelector("header")).toHaveClass("bg-background/95");
  });

  it("starts transparent when it floats over an overlay target", () => {
    const { container } = render(
      <SiteHeader {...props} overlayTargetId="inicio" />,
    );
    expect(container.querySelector("header")).not.toHaveClass(
      "bg-background/95",
    );
  });
});

describe("LandingPage", () => {
  it("renders a single h1 and every section heading", () => {
    render(<LandingPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    for (const name of [
      "Como funciona o acompanhamento",
      "Perguntas frequentes",
      "Cuidar da sua saúde mental começa com uma boa conversa",
    ]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
  });

  it("shows CRM and RQE in the hero, the about section and the footer", () => {
    render(<LandingPage />);
    expect(
      screen.getAllByText(
        new RegExp(`${professional.crm}.*${professional.rqe}`),
      ),
    ).toHaveLength(3);
  });

  // Automated part of the CFM 2.336/2023 checklist (LPC-23); the full review is manual.
  it.each([
    ["depoimentos", /depoimento/i],
    ["promessa de cura", /\bcura\b/i],
    ["garantia de resultado", /garant/i],
    ["superlativos", /\b(o|a) melhor\b|refer[êe]ncia em|n[º°] ?1/i],
    ["preços", /R\$\s?\d/],
    ["número de pacientes", /\d+\s*mil\s+(pessoas|pacientes)/i],
  ])("has no %s in the copy", (_, pattern) => {
    const { container } = render(<LandingPage />);
    expect(container.textContent).not.toMatch(pattern);
  });
});
