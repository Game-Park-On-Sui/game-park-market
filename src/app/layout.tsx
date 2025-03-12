import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {ReactNode} from "react";
import "./globals.css";
import {Navigation} from "@/components";
import {SuiProvider} from "@/providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Game Park Market",
    description: "Freely Trade Assets In The Game Park.",
    icons: "/GP-remove.png"
};

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SuiProvider>
                    <Navigation />
                    {children}
                </SuiProvider>
            </body>
        </html>
    );
}
