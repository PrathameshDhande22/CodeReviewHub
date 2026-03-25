import Navbar from "@/components/Navbar";
import "./globals.css";
import { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";

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
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
