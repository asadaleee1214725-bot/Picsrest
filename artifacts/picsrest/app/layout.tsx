import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Picsrest — Discover • Share • Inspire",
  description:
    "Picsrest is your visual discovery platform. Find inspiration, share your creativity, and connect with a world of ideas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
