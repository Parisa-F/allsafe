import Image from 'next/image'
import NavBar from '@/components/NavBar'
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
import { TypographyLead } from '@/typography/lead'
import { TypographyH3 } from '@/typography/h3'

export default function QuizCard({
    currentQuestion,
    qLength,
    msg,
    handleAnswer,
}: {
    currentQuestion: number
    qLength: number
    msg: string
    handleAnswer: any
}) {
    return (
        <div className="flex flex-col items-center justify-center w-2/3">
            <div
                className="flex flex-1 flex-col items-center justify-center p-24 w-full md:min-h-[30rem] rounded-lg border shadow-sm"
                x-chunk="dashboard-02-chunk-1"
            >
                <div className="py-8">
                    <TypographyLead className="text-center">
                        {currentQuestion + 1} / 5
                    </TypographyLead>
                </div>
                <div className="flex flex-col items-center gap-6 text-center">
                    <TypographyLead className="text-center">
                        Is this message a scam?
                    </TypographyLead>
                    <TypographyH3 className="text-center">{msg}</TypographyH3>
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-4 w-full h-full items-center justify-center">
                <Button
                    className="mt-4 pr-4 px-28 py-12"
                    onClick={() => {
                        handleAnswer(0)
                    }}
                >
                    No
                </Button>
                <Button
                    className="mt-4 pr-4 px-28 py-12"
                    onClick={() => {
                        handleAnswer(1)
                    }}
                >
                    Yes
                </Button>
            </div>
        </div>
    )
}
