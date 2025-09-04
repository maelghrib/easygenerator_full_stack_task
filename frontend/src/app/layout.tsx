import type {Metadata} from "next";
import "./globals.css";
import {Provider} from "@/components/ui/provider"

export const metadata: Metadata = {
    title: "Easygenerator Frontend UI",
    description: "A production-ready authentication service that allows a user to sign up and sign in to the application.",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <Provider>{children}</Provider>
        </body>
        </html>
    )
}