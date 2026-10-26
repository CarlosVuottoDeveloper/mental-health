import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/app/fonts";
import "../src/app/globals.css";

// Expose the next/font CSS variables to stories and MDX docs pages alike.
document.documentElement.classList.add(...fontVariables.split(" "));
document.documentElement.lang = "pt-BR";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        background: { name: "Background", value: "#fffaf0" },
        sunken: { name: "Surface sunken", value: "#f6f1e7" },
        inverse: { name: "Inverse", value: "#302f27" },
      },
    },
    a11y: {
      // Fail the a11y panel on violations instead of only listing them.
      test: "error",
    },
    options: {
      storySort: {
        order: [
          "Design System",
          [
            "Introdução",
            "Cores",
            "Tipografia",
            "Layout e forma",
            "Iconografia e movimento",
            "Voz e conteúdo",
          ],
          "Componentes",
          "Seções",
          "Páginas",
        ],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "background" },
  },
  tags: ["autodocs"],
};

export default preview;
