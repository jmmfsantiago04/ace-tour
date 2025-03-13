import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Ace Tour",
    description: "Your trusted travel partner",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
} 