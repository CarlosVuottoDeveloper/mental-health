import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { readConsent } from "@/lib/consent";
import { CookieBanner, CookiePreferencesButton } from "./cookie-banner";

describe("CookieBanner", () => {
  beforeEach(() => window.localStorage.clear());

  it("asks for consent when there is no stored choice", () => {
    render(<CookieBanner policyHref="/politica-de-privacidade" />);
    expect(
      screen.getByRole("region", { name: "Preferências de cookies" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Política de privacidade" }),
    ).toHaveAttribute("href", "/politica-de-privacidade");
  });

  it.each([
    ["Recusar", "rejected"],
    ["Aceitar", "accepted"],
  ])("stores the choice when clicking %s and hides", async (label, stored) => {
    const user = userEvent.setup();
    render(<CookieBanner policyHref="/politica-de-privacidade" />);

    await user.click(screen.getByRole("button", { name: label }));

    expect(readConsent()).toBe(stored);
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("reopens from the footer preferences button", async () => {
    window.localStorage.setItem("lpc-cookie-consent", "rejected");
    const user = userEvent.setup();
    render(
      <>
        <CookieBanner policyHref="/politica-de-privacidade" />
        <CookiePreferencesButton />
      </>,
    );
    expect(screen.queryByRole("region")).not.toBeInTheDocument();

    await act(() =>
      user.click(
        screen.getByRole("button", { name: "Preferências de cookies" }),
      ),
    );
    expect(screen.getByRole("region")).toBeInTheDocument();
  });
});
