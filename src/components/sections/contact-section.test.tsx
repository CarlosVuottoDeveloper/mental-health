import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactSection } from "./contact-section";

const props = {
  label: "Contato",
  title: "Prefere que a gente entre em contato?",
  description: "Deixe seus dados.",
  privacyHref: "/politica-de-privacidade",
  whatsappHref: "https://wa.me/1",
};

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Nome"), "Ana Souza");
  await user.type(screen.getByLabelText("E-mail"), "ana@exemplo.com");
  await user.type(screen.getByLabelText("Telefone com DDD"), "11912345678");
  await user.click(screen.getByLabelText("Online"));
  await user.click(screen.getByLabelText("Tarde"));
  await user.click(screen.getByRole("checkbox"));
}

describe("ContactSection", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("shows accessible errors when submitted empty", async () => {
    const user = userEvent.setup();
    render(<ContactSection {...props} />);

    await user.click(screen.getByRole("button", { name: "Solicitar retorno" }));

    const name = screen.getByLabelText("Nome");
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription("Informe seu nome.");
    expect(
      screen.getByRole("group", { name: "Preferência de atendimento" }),
    ).toHaveAccessibleDescription("Escolha presencial ou online.");
    expect(name).toHaveFocus();
  });

  it("does not ask for the reason of the visit or free text", () => {
    render(<ContactSection {...props} />);
    expect(
      screen.queryByRole("textbox", { name: /motivo|mensagem/i }),
    ).toBeNull();
    expect(document.querySelector("textarea")).toBeNull();
  });

  it("posts the data with anti-spam fields and confirms", async () => {
    const fetchSpy = vi
      .fn()
      .mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchSpy);
    const user = userEvent.setup();
    render(<ContactSection {...props} />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Solicitar retorno" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Retorno solicitado",
    );
    const body = JSON.parse(fetchSpy.mock.calls[0][1].body);
    expect(body).toMatchObject({
      name: "Ana Souza",
      preference: "online",
      consent: true,
    });
    expect(body.startedAt).toEqual(expect.any(Number));
    expect(body.website).toBeUndefined();
  });

  it("moves focus to the confirmation and offers WhatsApp", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    );
    const user = userEvent.setup();
    render(<ContactSection {...props} />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Solicitar retorno" }));

    expect(
      await screen.findByRole("heading", { name: "Retorno solicitado" }),
    ).toHaveFocus();
    expect(
      screen.getByRole("link", {
        name: "Prefere falar agora? Chamar no WhatsApp",
      }),
    ).toHaveAttribute("href", props.whatsappHref);
  });

  it("offers WhatsApp when sending fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("{}", { status: 502 })),
    );
    const user = userEvent.setup();
    render(<ContactSection {...props} />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Solicitar retorno" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Não foi possível enviar agora");
    expect(
      screen.getByRole("link", { name: "chame no WhatsApp" }),
    ).toHaveAttribute("href", "https://wa.me/1");
  });
});
