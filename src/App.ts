import Widget from "@/app/Widget";

export default class App {
  static mount() {
    customElements.define("my-widget", Widget);
    document.body.appendChild(new Widget());
  }
}
