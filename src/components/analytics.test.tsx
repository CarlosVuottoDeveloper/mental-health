import { act, render } from "@testing-library/react";
import { writeConsent } from "@/lib/consent";
import { SiteAnalytics } from "./analytics";

vi.mock("@vercel/analytics/next", () => ({ Analytics: () => null }));
vi.mock("@vercel/speed-insights/next", () => ({ SpeedInsights: () => null }));

const disabled = () =>
  (window as unknown as Record<string, boolean>)["ga-disable-G-TEST"];

describe("SiteAnalytics", () => {
  beforeEach(() => window.localStorage.clear());

  it("keeps GA4 disabled until the visitor accepts cookies", () => {
    render(<SiteAnalytics gaMeasurementId="G-TEST" />);
    expect(disabled()).toBe(true);

    act(() => writeConsent("accepted"));
    expect(disabled()).toBe(false);
  });

  it("disables GA4 and clears its cookies when consent is withdrawn", () => {
    window.localStorage.setItem("lpc-cookie-consent", "accepted");
    document.cookie = "_ga=GA1.1.123; path=/";
    render(<SiteAnalytics gaMeasurementId="G-TEST" />);

    act(() => writeConsent("rejected"));
    expect(disabled()).toBe(true);
    expect(document.cookie).not.toContain("_ga=");
  });
});
