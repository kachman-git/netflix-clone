import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { MyListProvider } from "@/lib/my-list-context";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionConfig } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Netflix Clone",
  description: "A Netflix clone built with Next.js and shadcn UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MotionConfig reducedMotion="user">
            <MyListProvider>
              <Header />
              <main className="container mx-auto px-4 py-8">{children}</main>
            </MyListProvider>
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
