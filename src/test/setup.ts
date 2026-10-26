import "@testing-library/jest-dom/vitest";

// Node 25+ ships its own (file-backed) localStorage global, which shadows
// jsdom's and is undefined without --localstorage-file. Use jsdom's storage.
const { jsdom } = globalThis as typeof globalThis & {
  jsdom?: { window: Window };
};
if (jsdom) {
  for (const name of ["localStorage", "sessionStorage"] as const) {
    Object.defineProperty(globalThis, name, {
      configurable: true,
      value: jsdom.window[name],
    });
  }
}
