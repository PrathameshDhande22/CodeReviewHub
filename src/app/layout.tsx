import Navbar from "@/components/Navbar";
import "./globals.css";
import { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import Providers from "@/providers/provider";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { canonicalUrl } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

//#region SEO Metadata
export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "CodeReview Hub - The Digital Architect",
    template: "%s | CodeReview Hub",
  },
  description:
    "A platform for developers to post code, receive constructive reviews, and collaborate through discussions and threaded comments.",
  robots: {
    follow: true,
    index: true,
    googleBot: {
      follow: true,
      index: true,
    },
  },
  applicationName: "CodeReviewHub - The Digital Architect",
  authors: [
    { name: "Prathamesh", url: "https://github.com/PrathameshDhande22" },
  ],
  creator: "Prathamesh Dhande",
  abstract:
    "A platform for developers to post code, receive constructive reviews, and collaborate through discussions and threaded comments.",
  keywords: [
    "code review",
    "developer community",
    "peer code review",
    "software development",
    "code feedback",
    "programming community",
    "code quality",
    "clean code",
    "developer collaboration",
    "coding discussions",
    "software engineering",
    "source code review",
    "nextjs",
    "react",
    "typescript",
    "dotnet",
    "java",
  ],
  category: "Technology",
  classification: "Software Development",
  openGraph: {
    type: "website",
    locale: "en_US",
    countryName: "India",
    description:
      "A platform for developers to post code, receive constructive reviews, and collaborate through discussions and threaded comments.",
    determiner: "a",
    siteName: "CodeReview Hub - The Digital Architect",
    title: "CodeReview Hub",
    url: canonicalUrl("/"),
  },
};
//#endregion

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
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
          {modal}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
