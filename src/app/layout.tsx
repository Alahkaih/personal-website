import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HomeDrawer from "@/components/drawer";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Alahkaihs Personal Website",
    description: "WIP come back soon",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div>
                    <HomeDrawer />
                    {/* <Header/> */}
                </div>
                {children}
            </body>
        </html>
    );
}
