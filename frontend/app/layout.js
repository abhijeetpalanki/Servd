import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Header from "../components/header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Servd",
  description:
    "AI Recipe Platform using Next JS, Tailwind, Strapi, Neon DB, and Shadcn UI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: neobrutalism }}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" />
        </head>
        <body className={`${inter.variable} antialiased`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="py-8 px-4 border-t">
            <div className="max-w-6xl mx-auto flex justify-center items-center">
              <p className="text-stone-500 text-sm">
                Made with 💖 by Abhijeet Palanki.
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
