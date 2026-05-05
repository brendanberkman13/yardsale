<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# React style

Avoid `useEffect` unless essential. Prefer Server Components for data, render-time derivation for computed values, event handlers for user-driven logic, and lazy initial state for one-time setup. If you reach for an effect, justify why none of those fit.
