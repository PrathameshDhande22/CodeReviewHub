import Navbar from "@/components/Navbar";
import "./globals.css";
import { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import Providers from "@/providers/provider";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

//#region SEO Metadata
export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
};

export const metadata: Metadata = {
  title: {
    default: "CodeReview Hub - The Digital Architect",
    template: "%s | CodeReview Hub",
  },
  description: "The Digital Architect",
  robots: {
    follow: true,
    index: true,
    googleBot: {
      index: true,
    },
  },
  applicationName: "CodeReviewHub - The Digital Architect",
  authors: [
    { name: "Prathamesh", url: "https://github.com/PrathameshDhande22" },
  ],
  creator: "Prathamesh Dhande",
};
//#endregion

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", inter.variable)}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-hero text-white">
        <Providers>
          <Navbar />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            limit={3}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
