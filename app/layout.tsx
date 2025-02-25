"use client";

import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "./store";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {!hideLayout && <Header />}
          <main className={hideLayout ? "" : "pt-[80px]"}>{children}</main>
          {!hideLayout && <Footer />}{" "}
        </Provider>
      </body>
    </html>
  );
}
