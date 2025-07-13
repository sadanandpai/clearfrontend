import { ThemeProvider as NextThemeProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class">
      <Theme accentColor="green">{children}</Theme>
    </NextThemeProvider>
  );
}
