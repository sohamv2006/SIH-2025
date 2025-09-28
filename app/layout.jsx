import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import CareerChatbot from "./components/CareerChatbot"
import { Suspense } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

export const metadata = {
  title: "ShikshaSetu",
  description: "",
  generator: "",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Analytics />
          <CareerChatbot />
        </body>
      </html>
    </ClerkProvider>
  )
}