'use client'

import Image from 'next/image'
import NavBar from '@/components/navbar/NavBar'
import Footer from '@/components/footer/footer-four'
import ScamMenu from '@/components/assets/ScamMenu'
import Link from 'next/link'
import Header from '@/components/hero/header-two'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function ScamInfo() {
    return (
        <div
            className="flex flex-1 items-center justify-center w-full rounded-lg border shadow-sm"
            x-chunk="dashboard-02-chunk-1"
        >
            <div className="flex flex-col items-center gap-1 text-center">
                <Header
                    title="Spot the Scam: How Sharp Are Your Senses?"
                    subtitle="Test Your Ability to Identify Online Scams and Stay Safe in the Digital World"
                />
                <Button className="mt-4 pr-4">
                    <Link href="/quiz/ig-scams">Get Started {'->'}</Link>
                </Button>
            </div>
        </div>
    )
}
