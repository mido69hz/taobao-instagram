"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import localFont from "next/font/local";
import "./globals.css";
import { UserContextProvider } from "./contexts/user-context";
import { Header } from "./common/Header";
import { Footer } from "./common/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[430px] mx-auto w-full`}
      >
        <UserContextProvider>
          <Header />
          <main className="pt-20 pb-[54px]">{children}</main>
          <Footer />
        </UserContextProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
