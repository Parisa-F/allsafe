// React and Next.js imports
import Image from 'next/image'
import Link from 'next/link'

// UI component imports
import * as Craft from '@/components/craft'
import { Button } from '@/components/ui/button'
import { TypographyH2 } from '@/typography/h2'
import { TypographyH3 } from '@/typography/h3'
import { cn } from '@/lib/utils'

// Asset imports
// import Placeholder from "@/public/placeholder.jpg";

const FeatureLeft = ({
    title,
    body,
    className,
    img,
    link,
}: {
    title: string
    body: string
    className?: string
    img?: any
    link?: string
}) => {
    return (
        <Craft.Section className="w-full">
            <Craft.Container
                className={cn(
                    'grid items-stretch w-full grid-cols-1 md:grid-cols-2 md:gap-12',
                    className
                )}
            >
                <div className="not-prose relative flex h-96 overflow-hidden rounded-lg border">
                    <Image
                        src={img}
                        width={0}
                        height={0}
                        alt="placeholder"
                        sizes="100vw"
                        layout="fill"
                        className="fill object-cover"
                    />
                </div>
                <div className="flex flex-col gap-6 py-8">
                    <TypographyH3 className="!my-0">{title}</TypographyH3>
                    <p className="font-light leading-[1.4] opacity-70">
                        {body}
                    </p>
                    <div className="not-prose flex gap-2">
                        {/* <Button className="w-fit" asChild>
                            <Link href="#">Get Started</Link>
                        </Button> */}
                        {link !== undefined && (
                            // <Button className="w-fit" variant="link" asChild>
                            <Link href={link} className="hover:underline">
                                Learn More {'->'}
                            </Link>
                            // </Button>
                        )}
                    </div>
                </div>
            </Craft.Container>
        </Craft.Section>
    )
}

export default FeatureLeft
