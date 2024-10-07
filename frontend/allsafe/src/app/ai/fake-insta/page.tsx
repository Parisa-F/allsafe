'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { TypographyH1 } from '@/typography/h1'
import { TypographyLead } from '@/typography/lead'
import { AlertCircle, Check, Dot, Image, ImagePlus, X } from 'lucide-react'
import { detectFakeInstaAccount } from '@/actions/detect-fake-insta'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AnimatePresence, motion } from 'framer-motion'
import { ButtonLoading } from '@/components/skeleton/loading-button'
import { TypographyH2 } from '@/typography/h2'
import Link from 'next/link'
import { TypographyH3 } from '@/typography/h3'

const formSchema = z.object({
    profileImage: z.any().optional(),
    isProfilePic: z.boolean().default(false),
    isPrivate: z.boolean().default(false),
})

export default function FakeInstaDetect() {
    const [file, setFile] = useState<File | null>(null)
    const [msg, setMsg] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [showMore, setShowMore] = useState<boolean>(false)
    const [submit, setSubmit] = useState<boolean>(false)
    const [result, setResult] = useState<any | null>(null)
    const [addResult, setAddResult] = useState<any | null>(null)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isProfilePic: false,
            isPrivate: false,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        setError(null)
        console.log('please load')

        if (file) {
            try {
                const data = await detectFakeInstaAccount({
                    file,
                    isProfilePic: values.isProfilePic,
                    isPrivate: values.isPrivate,
                })

                setResult(data)
                setSubmit(true)

                // Handle the result (e.g., update state to show the result to the user)
            } catch (error) {
                setError('Error detecting fake account please try again.')
                setSubmit(false)
                // Handle the error (e.g., show an error message to the user)
            } finally {
                setLoading(false)
            }
        }
    }

    const percent = () => {
        if (result === null || result === undefined) return '0'
        if (result.confidence == undefined) return '0'
        const float = parseFloat(result.confidence.toFixed(4))
        return (float * 100).toFixed(2)
    }

    return (
        <div className="flex flex-col gap-y-8 px-6 py-24">
            {error !== null && (
                <Alert variant="destructive" className="self-start">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <AnimatePresence mode="wait">
                {!submit ? (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col self-center justify-self-center gap-12 w-full max-w-4xl"
                    >
                        <TypographyH1>
                            Identify if that Instagram account is fake.
                        </TypographyH1>
                        <TypographyLead>
                            Upload a screenshot of the profile.
                            <br />
                            <p className="text-sm">
                                (preferably mobile, make sure to exclude the
                                sidebar from screenshot, retaining only the main
                                profile in the screenshot)
                            </p>
                        </TypographyLead>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col space-y-8 justify-end"
                            >
                                <div className="flex flex-col justify-center w-full gap-y-8">
                                    <div className="flex flex-col justify-center items-center w-full bordered border-dashed border-2 rounded-md gap-y-6 px-4 py-12">
                                        <div>
                                            <ImagePlus
                                                className="w-32 h-32"
                                                strokeWidth={1}
                                                strokeOpacity={0.8}
                                            />
                                        </div>
                                        <div className="flex items-center text-muted-foreground gap-x-1">
                                            <div className="text-lg">
                                                <label
                                                    htmlFor="profile_pic"
                                                    className="text-lg underline cursor-pointer"
                                                >
                                                    Click to upload
                                                </label>
                                                <input
                                                    type="file"
                                                    id="profile_pic"
                                                    name="profile_pic"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const selectedFile =
                                                            e.target.files?.[0]
                                                        if (selectedFile) {
                                                            setFile(
                                                                selectedFile
                                                            )
                                                            form.setValue(
                                                                'profileImage',
                                                                selectedFile
                                                            )
                                                        }
                                                    }}
                                                    hidden
                                                />
                                            </div>
                                            <p> or drag and drop here.</p>
                                        </div>
                                        <span className="text-muted-foreground">
                                            Maximum file size: 5MB
                                        </span>
                                    </div>

                                    {file && (
                                        <div className="flex self-center gap-x-6 w-11/12 bordered border rounded-md px-2 py-4">
                                            <div className="flex gap-x-6 w-full">
                                                <Image className="w-12 h-12" />
                                                <div className="flex flex-col">
                                                    <p className="text-lg">
                                                        {file.name}
                                                    </p>
                                                    <div className="flex items-center">
                                                        <p className="text-sm text-muted-foreground">
                                                            {Math.round(
                                                                file.size / 1000
                                                            )}{' '}
                                                            KB
                                                        </p>
                                                        <Dot className="w-8" />
                                                        <p className="text-sm text-muted-foreground">
                                                            {file.type}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setFile(null)
                                                    // setLoading(false)
                                                    // setSubmit(false)
                                                    form.setValue(
                                                        'profileImage',
                                                        undefined
                                                    )
                                                }}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}

                                    <FormField
                                        control={form.control}
                                        name="isProfilePic"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        Is there a profile
                                                        picture?
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="isPrivate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        Is the account private?
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {loading ? (
                                    <div className="flex justify-end w-full">
                                        <ButtonLoading />
                                    </div>
                                ) : (
                                    <Button className="self-end" type="submit">
                                        Submit
                                    </Button>
                                )}
                            </form>
                        </Form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center self-center justify-self-center gap-6 w-full max-w-4xl"
                    >
                        <TypographyH1 className="border-0">Result</TypographyH1>
                        <TypographyLead>
                            {result.label === 'Fake'
                                ? 'This profile a fake profile'
                                : 'This profile is legit'}
                        </TypographyLead>
                        <div>
                            {result.label === 'Fake' ? (
                                <X className="text-red-500 w-56 h-56" />
                            ) : (
                                <Check className="text-green-400 w-56 h-56" />
                            )}
                        </div>
                        <TypographyH3 className="">
                            The likelihood of the profile being{' '}
                            {result.label === 'Fake' ? 'fake' : 'legitimate'} is{' '}
                            <strong>{percent()}%</strong>
                        </TypographyH3>
                        <p className="text-muted-foreground text-center">
                            <strong>Disclaimer</strong> Our website uses AI
                            models to provide this service. While these models
                            are trained to identify patterns and generate
                            predictions, they may not always produce accurate
                            results. Therefore, the predictions should be
                            considered as guidance only and not as definitive
                            decisions. We value your privacy and do not store or
                            retain any user data. All inputted information is
                            temporarily used for generating predictions and is
                            automatically deleted from our servers immediately
                            after the results are provided. Please use these
                            tools at your own discretion.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSubmit(false)
                                window.location.reload()
                            }}
                        >
                            Check another account?
                        </Button>
                        <div className="flex flex-col w-full items-center py-24 gap-y-6">
                            <TypographyH2 className="border-0">
                                Is this account illegitimate? Go to help section
                                for steps on reporting the account.
                            </TypographyH2>
                            <Button asChild>
                                <Link href="/help">Help Center</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
