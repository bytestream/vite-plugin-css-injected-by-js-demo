import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin({
      styleId: "custom-css",
      topExecutionPriority: false,
      injectCodeFunction: async function injectCodeCustomRuntimeFunction(
        cssCode: string,
      ) {
        function waitForElm(selector: string): Promise<Element | null> {
          return new Promise((resolve) => {
            if (document.querySelector(selector)) {
              return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(() => {
              if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
              }
            });

            observer.observe(document.body, {
              childList: true,
              subtree: true,
            });
          });
        }

        try {
          if (typeof document !== "undefined") {
            const elementStyle = document.createElement("style");
            elementStyle.id = "custom-css";
            elementStyle.appendChild(document.createTextNode(cssCode));
            const elm = await waitForElm("my-widget");
            elm?.shadowRoot?.appendChild(elementStyle);
          }
        } catch (e) {
          console.error("vite-plugin-css-injected-by-js", e);
        }
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    "process.env.NODE_ENV": '"' + process.env.NODE_ENV + '"',
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "App",
      fileName: "app",
      formats: ["umd"],
    },
  },
  esbuild: {
    legalComments: "none",
  },
});
