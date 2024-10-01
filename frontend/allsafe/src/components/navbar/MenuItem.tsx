import * as React from 'react'
import { motion } from 'framer-motion'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { index } from 'd3'
import Link from 'next/link'

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
}

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF']

export const MenuItem = ({
    item,
    index,
    toggle,
}: {
    item: any
    index: number
    toggle: any
}) => {
    const style = { border: `2px solid ${colors[index]}` }

    console.info('Links', item.links)
    return (
        <motion.li
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <Accordion type="single" collapsible className="w-full" key={index}>
                <AccordionItem value={`item-${index}`} className="w-full">
                    <AccordionTrigger>{item.trigger}</AccordionTrigger>
                    {item.links.map(
                        (
                            link: {
                                href: string
                                text: string
                            },
                            linkIndex: number
                        ) => (
                            <AccordionContent
                                key={linkIndex}
                                onClick={() => toggle()}
                            >
                                <Link
                                    href={link.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    {link.text}
                                </Link>
                            </AccordionContent>
                        )
                    )}
                </AccordionItem>
            </Accordion>
        </motion.li>
    )
}
