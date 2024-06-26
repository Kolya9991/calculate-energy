import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {SessionProvider} from "next-auth/react";
import {auth} from "@/auth";
import {ReactNode} from "react";
import {Toaster} from "@/components/ui/sonner";
import {clsx} from "clsx";
import {ThemeProvider} from "@/components/theme-provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Єко плюс",
  description: "Калькулятор енергоефективності",
  icons: './favicon.ico'
};


export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
      <body className={clsx(inter.className, 'px-3 py-2')}>
      <ThemeProvider attribute="class"
                     defaultTheme="dark"
                     enableSystem>
        <Toaster/>
        {children}
      </ThemeProvider>
      </body>
      </html>
    </SessionProvider>
  );
}
