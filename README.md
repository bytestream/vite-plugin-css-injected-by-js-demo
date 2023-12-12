# Install Dependencies

Run `npm ci`

# Development

Run `npm run dev` and open the specified URL.

Observe that the `cssInjectedByJsPlugin` plugin has not run, and the
CSS is within the `<head>`.

# Production

Run `npm run build` and then open `index-prod.html` in your browser.

Observe that the custom `injectCodeFunction` (see `vite.config.js`) has run, the CSS
is within the shadow dom, and `<head>` is empty. The conditional logic for this
behaviour can be found in `src/app/Widget.ts`:

```typescript
process.env.NODE_ENV === "production"
        ? this.attachShadow({ mode: "open" })
        : this;
```