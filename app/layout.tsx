import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GenoLink | Bridging Global Genomics to the Middle East",
  description: "Genolink connects physicians and patients with world-class international genomic laboratories. We provide advanced, clinically validated genetic testing solutions.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

