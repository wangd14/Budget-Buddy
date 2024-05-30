'use client'
import { Inter } from "next/font/google";
import { config } from '@fortawesome/fontawesome-svg-core'
import { AuthContextProvider } from '@/context/AuthContext'
import '@fortawesome/fontawesome-svg-core/styles.css'
import "@/styles/globals.css";
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className="bg-gradient-to-tr h-min min-h-screen from-ocean via-20% via-sky-700 to-ocean text-white">
        <AuthContextProvider>
          {children}  
        </AuthContextProvider>
      </body>
    </html>
  );
}
