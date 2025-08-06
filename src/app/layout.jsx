"use client";
import { LanguageProvider } from "@/context/languageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";


const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>{children}</LanguageProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
