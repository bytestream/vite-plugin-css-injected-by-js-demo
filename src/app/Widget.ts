import AppComponent from "@/components/App.vue";
import { createApp } from "vue";
import type { App as VueApp } from "vue";

export default class Widget extends HTMLElement {
  connectedCallback() {
    const app: VueApp = createApp(AppComponent);

    const dom =
      process.env.NODE_ENV === "production"
        ? this.attachShadow({ mode: "open" })
        : this;

    app.mount(dom);
  }
}
