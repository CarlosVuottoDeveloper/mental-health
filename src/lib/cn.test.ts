import { cn } from "./cn";

describe("cn", () => {
  it("keeps custom font-size tokens alongside text colors", () => {
    expect(cn("text-display-xl", "text-foreground")).toBe(
      "text-display-xl text-foreground",
    );
  });

  it("lets later font-size tokens override earlier ones", () => {
    expect(cn("text-body-md", "text-display-sm")).toBe("text-display-sm");
  });

  it("lets standard values override custom container and spacing tokens", () => {
    expect(cn("max-w-page px-gutter", "max-w-3xl px-0")).toBe("max-w-3xl px-0");
    expect(cn("py-section", "py-12")).toBe("py-12");
  });
});
