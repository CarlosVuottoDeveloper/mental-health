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
});
