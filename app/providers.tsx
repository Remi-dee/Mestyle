"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "@/app/composables/provider";

// Client-side providers, split out so the root layout can stay a server
// component (required for Next's `metadata` / `viewport` exports).
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={true} attribute="class">
        {children}
      </ThemeProvider>
    </Provider>
  );
}
