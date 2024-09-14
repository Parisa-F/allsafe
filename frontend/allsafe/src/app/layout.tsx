import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/navbar/NavBar'
import Footer from '@/components/footer/footer-four'
import Top from '@/components/helper/top'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import FooterWrapper from '@/components/footer/footer-wrapper'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import GoBack from '@/components/helper/go-back'
import Mute from '@/components/helper/mute'

import { ReactLenis, useLenis } from 'lenis/react'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// }

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <meta
                    http-equiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                />
            </head>
            <body
                className={cn(
                    inter.className,
                    'flex flex-col justify-between min-h-screen w-full overflow-y-auto snap-y snap-mandatory'
                )}
            >
                <NavBar />
                <main className="flex flex-col justify-center items-center min-h-screen">
                    {children}
                    <SpeedInsights />
                    <Analytics />
                </main>
                <FooterWrapper />
                <Top />
                <GoBack />
                <Mute />
            </body>
        </html>
    )
}
