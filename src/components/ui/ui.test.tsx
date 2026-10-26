import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  Button,
  Heading,
  IconButton,
  pixelPatterns,
  Rating,
  SocialLinks,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from ".";

describe("Button", () => {
  it("renders a button with the arrow hidden from assistive tech", () => {
    render(<Button withArrow>Agendar sessão</Button>);

    const button = screen.getByRole("button", { name: "Agendar sessão" });
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden");
  });

  it("renders its child element when asChild is set", () => {
    render(
      <Button asChild withArrow variant="accent">
        <a href="#agendar">Agendar sessão</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Agendar sessão" });
    expect(link).toHaveAttribute("href", "#agendar");
    expect(link).toHaveClass("bg-accent");
    expect(link.querySelector("svg")).toBeInTheDocument();
  });
  it("renders a single child with asChild and no arrow", () => {
    render(
      <Button asChild variant="link">
        <a href="#contato">Fale conosco</a>
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Fale conosco" })).toHaveClass(
      "underline",
    );
  });
});

describe("IconButton", () => {
  it("uses label as the accessible name", () => {
    render(<IconButton label="Abrir menu">×</IconButton>);
    expect(
      screen.getByRole("button", { name: "Abrir menu" }),
    ).toBeInTheDocument();
  });
});

describe("Heading", () => {
  it("keeps semantic level independent from visual size", () => {
    render(
      <Heading as="h3" size="2xl">
        Título
      </Heading>,
    );
    const heading = screen.getByRole("heading", { level: 3, name: "Título" });
    expect(heading).toHaveClass("text-display-2xl");
  });
});

describe("Avatar", () => {
  it("falls back to initials with the full name as accessible label", () => {
    render(<Avatar name="Ana Souza" />);
    expect(screen.getByRole("img", { name: "Ana Souza" })).toHaveTextContent(
      "AS",
    );
  });
});

describe("Rating", () => {
  it("announces the score", () => {
    render(<Rating value={4} />);
    expect(
      screen.getByRole("img", { name: "Avaliação: 4 de 5" }),
    ).toBeInTheDocument();
  });
});

describe("SocialLinks", () => {
  it("names each link after its network and opens it safely", () => {
    render(
      <SocialLinks
        links={[{ network: "instagram", href: "https://instagram.com" }]}
      />,
    );
    const link = screen.getByRole("link", { name: "Instagram" });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("PixelBand patterns", () => {
  it.each(Object.entries(pixelPatterns))(
    "%s has rows of equal length",
    (_, rows) => {
      const lengths = new Set(rows.map((row) => row.length));
      expect(lengths.size).toBe(1);
    },
  );
});

describe("Accordion", () => {
  it("opens one item at a time", async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="a">
          <AccordionTrigger>Pergunta A</AccordionTrigger>
          <AccordionContent>Resposta A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Pergunta B</AccordionTrigger>
          <AccordionContent>Resposta B</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const a = screen.getByRole("button", { name: "Pergunta A" });
    const b = screen.getByRole("button", { name: "Pergunta B" });

    await user.click(a);
    expect(a).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Resposta A")).toBeVisible();

    await user.click(b);
    expect(a).toHaveAttribute("aria-expanded", "false");
    expect(b).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Tabs", () => {
  it("switches panels", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="geral">
        <TabsList aria-label="Categorias">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
        </TabsList>
        <TabsContent value="geral">Conteúdo geral</TabsContent>
        <TabsContent value="pagamentos">Pix e cartão</TabsContent>
      </Tabs>,
    );

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Conteúdo geral");
    await user.click(screen.getByRole("tab", { name: "Pagamentos" }));
    expect(screen.getByRole("tab", { name: "Pagamentos" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Pix e cartão");
  });
});
