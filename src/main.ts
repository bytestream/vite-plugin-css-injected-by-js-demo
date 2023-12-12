import App from "@/App";

// Register events to fire the async init function.
if (typeof window.asyncInit === "undefined") {
  throw new Error("asyncInit function is not defined.");
} else {
  window["App"] = App;

  if (document.readyState === "complete") {
    window.asyncInit();
  } else {
    window.addEventListener("load", () => {
      window.asyncInit();
    });
  }
}
