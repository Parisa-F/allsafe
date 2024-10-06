'use client'

import { useEffect } from 'react'

import '../style.css' // Assuming your CSS is in the src/styles folder
import { cn } from '@/libs/utils'
import { TypographyH2 } from '@/typography/h2'
import { TypographyLead } from '@/typography/lead'
import { TypographyH1 } from '@/typography/h1'
import Image from 'next/image'
import Link from 'next/link'

const Insights = () => {
    useEffect(() => {
        // This will run after the component mounts
        const script = document.createElement('script')
        script.src = '/visualisation/script.js'
        script.type = 'module'
        document.body.appendChild(script)

        return () => {
            // Clean up the script when the component unmounts
            document.body.removeChild(script)
        }
    }, [])

    return (
        <>
            <div className="flex flex-col w-full p-6 gap-y-24 max-w-full">
                {/* <!-- Introduction Section --> */}
                <header className="text-center py-16 relative bg-gray">
                    <h1 className="text-5xl md:text-8xl font-bold text-black p-4 md:p-20 pb-0 leading-tight">
                        Social media scams among young adults are not fake
                        issues. It&apos;s truly happening…
                    </h1>

                    {/* <!-- Set up pillars to link with graphs --> */}
                    {/* <!-- Link to Section Trend - Line chart --> */}
                    <div className="pillars flex flex-col md:flex-row justify-around items-center flex-wrap mt-12 mx-4 md:mx-40 space-y-4 md:space-y-0">
                        <a
                            href="#section-trend"
                            className="pillar flex-1 min-w-[250px] m-4 p-6 bg-white rounded-lg shadow-md text-center"
                        >
                            <h2 className="text-5xl md:text-6xl text-orange-500 font-semibold">
                                26%
                            </h2>
                            <h3 className="text-xl md:text-2xl text-gray-600 mt-2">
                                reported scams in various age groups increased
                                between 2023 and 2022
                            </h3>
                            <div className="flex flex-col items-center mt-4">
                                <span className="text-lg md:text-xl text-gray-500">
                                    Click to explore
                                </span>
                            </div>
                        </a>

                        {/* <!-- Link to Section Sunburst - Sunburst chart --> */}
                        <a
                            href="#section-top5"
                            className="pillar flex-1 min-w-[250px] m-4 p-6 bg-white rounded-lg shadow-md text-center"
                        >
                            <h2 className="text-5xl md:text-6xl text-orange-500 font-semibold">
                                18%
                            </h2>
                            <h3 className="text-xl md:text-2xl text-gray-600 mt-2">
                                scams among young adults are contacted via
                                social media
                            </h3>
                            <div className="flex flex-col items-center mt-4">
                                <span className="text-lg md:text-xl text-gray-500">
                                    Click to explore
                                </span>
                            </div>
                        </a>

                        {/* <!-- Link to Section Bar - Bar chart--> */}
                        <a
                            href="#bar-chart"
                            className="pillar flex-1 min-w-[250px] m-4 p-6 bg-white rounded-lg shadow-md text-center"
                        >
                            <h2 className="text-5xl md:text-6xl text-orange-500 font-semibold">
                                $3.52M
                            </h2>
                            <h3 className="text-xl md:text-2xl text-gray-600 mt-2">
                                scammed money lost among young adults on social
                                media in 2024
                            </h3>
                            <div className="flex flex-col items-center mt-4">
                                <span className="text-lg md:text-xl text-gray-500">
                                    Click to explore
                                </span>
                            </div>
                        </a>
                    </div>
                </header>

                {/* <!-- Line Chart --> */}
                <section
                    id="section-trend"
                    className="text-center w-full p-8 bg-gray-50 rounded-lg mt-12"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-800">
                        Do you know how fast the scam growth in recent years?
                    </h2>

                    {/* <!-- User Guide --> */}
                    <h3 className="text-xl md:text-xl font-bold text-gray-600 md:w-1/2">
                        Select 3 years to discover the trend across different
                        years:
                    </h3>

                    {/* <!-- Flex container for chart and carousel --> */}
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        {/* <!-- Get the chart --> */}
                        <div
                            id="line-chart"
                            className="chart h-[400px] md:h-[500px] bg-gray-50 rounded-lg w-full md:w-1/2 px-4 mb-4"
                        ></div>

                        {/* <!-- Add text in carousel --> */}
                        <div className="relative overflow-hidden w-full md:w-1/2 px-8">
                            <div
                                id="carousel"
                                className="carousel w-full flex transition-transform duration-300"
                            >
                                {/* <!-- 1st Card --> */}
                                <div className="carousel-item line-carousel-item flex-shrink-0 w-full bg-gray-100 bg-opacity-50 rounded-lg shadow-md h-48 flex items-center justify-center p-4">
                                    <p className="text-lg text-gray-600 text-center">
                                        From January 2020 to July 2024, there
                                        have been
                                        <span className="text-xl font-bold text-orange-500">
                                            19,030
                                        </span>
                                        reported social media scams affecting
                                        young adults in Australia.
                                        <br />
                                        <span className="text-sm text-gray-400">
                                            {' '}
                                            *Data collected until August 2024
                                        </span>
                                    </p>
                                </div>

                                {/* <!-- 2nd Card --> */}
                                <div className="carousel-item line-carousel-item flex-shrink-0 w-full bg-gray-100 bg-opacity-50 rounded-lg shadow-md h-48 flex items-center justify-center p-4">
                                    <p className="text-lg text-gray-600 text-center">
                                        Comparing the whole year of 2023 and
                                        2022, reported scams
                                        <span className="text-xl font-bold text-orange-500">
                                            increased about 21%
                                        </span>
                                        .
                                    </p>
                                </div>

                                {/* <!-- 3rd Card --> */}
                                <div className="carousel-item line-carousel-item flex-shrink-0 w-full bg-gray-100 bg-opacity-50 rounded-lg shadow-md h-48 flex items-center justify-center p-4">
                                    <p className="text-lg text-gray-600 text-center">
                                        The scam reported peak is in Q1 2023,
                                        with
                                        <span className="text-xl font-bold text-orange-500">
                                            1,677 scams reported in just first
                                            three months
                                        </span>
                                        .
                                    </p>
                                </div>

                                {/* <!-- 4th Card --> */}
                                <div className="carousel-item line-carousel-item flex-shrink-0 w-full bg-gray-100 bg-opacity-50 rounded-lg shadow-md h-48 flex items-center justify-center p-4">
                                    <p className="text-lg text-gray-600 text-center">
                                        Although the number of scam reports
                                        gradually decreased from then, around
                                        <span className="text-xl font-bold text-orange-500">
                                            300 scams reported monthly
                                        </span>
                                        in 2024.
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Add button for carousel --> */}
                            <button
                                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-100 bg-opacity-50 text-gray p-3 rounded"
                                id="line-prev"
                            >
                                {' '}
                            </button>
                            <button
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-100 bg-opacity-50 text-gray p-3 rounded"
                                id="line-next"
                            >
                                {' '}
                            </button>
                        </div>
                    </div>
                </section>

                {/* <!-- Word Cloud --> */}
                <section
                    id="section-word-cloud"
                    className="text-center w-full p-8 bg-gray-50 rounded-lg"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-800">
                        Have you ever received messages with these words?
                    </h2>

                    {/* <!-- Flex container for chart and carousel --> */}
                    <div className="flex flex-col md:flex-row items-center">
                        {/* <!-- Get the image --> */}
                        <img
                            src="wordcloud.png"
                            alt="Word Cloud"
                            className="w-full md:w-1/2 h-auto rounded-lg mb-4 md:mb-0 md:mr-4"
                        />

                        {/* <!-- Add text in carousel --> */}
                        <div className="relative overflow-hidden w-full md:w-1/2 px-4 md:px-0">
                            <div className="carousel w-full">
                                {/* <!-- 1st Card --> */}
                                <div className="carousel-item wordCloud-carousel-item active bg-gray-100 bg-opacity-50 rounded-lg shadow-md h-48 flex items-center justify-center p-4">
                                    <p className="text-lg text-gray-600 text-center">
                                        These words highlight the most common
                                        words scammers use to make their
                                        messages
                                        <span className="text-lg font-bold text-orange-500">
                                            sound personal, urgent, or
                                            convincing
                                        </span>
                                        .
                                    </p>
                                </div>

                                {/* <!-- 2nd Card --> */}
                                <div className="carousel-item wordCloud-carousel-item bg-gray-100 bg-opacity-50 rounded-lg shadow-md h-48 flex items-center justify-center p-4">
                                    <p className="text-lg text-gray-600 text-center">
                                        They are designed to
                                        <span className="text-lg font-bold text-orange-500">
                                            trick you into responding or taking
                                            action
                                        </span>{' '}
                                        based on false promises.
                                    </p>
                                </div>

                                {/* <!-- 3rd Card --> */}
                                <div className="carousel-item wordCloud-carousel-item bg-gray-100 bg-opacity-50 rounded-lg shadow-md h-48 flex items-center justify-center p-4">
                                    <p className="text-lg text-gray-600 text-center">
                                        Take a look at the words, can you spot
                                        the types of scams that appear most
                                        often?
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Add button for carousel --> */}
                            <button
                                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-100 bg-opacity-50 text-gray p-3 rounded"
                                id="wordCloud-prev"
                            >
                                {' '}
                            </button>
                            <button
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-100 bg-opacity-50 text-gray p-3 rounded"
                                id="wordCloud-next"
                            >
                                {' '}
                            </button>
                        </div>
                    </div>
                </section>

                {/* <!-- Top 5 Scam Section (Sunburst & Bar Chart)--> */}
                <section
                    id="section-top5"
                    className="text-center w-full p-8 bg-gray-50 rounded-lg mt-4"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-800">
                        Do you know what are the top 5 scams affecting young
                        adults in Australia?
                    </h2>

                    {/* <!-- User Guide --> */}
                    <h3 className="text-xl md:text-xl font-bold mb-4 text-gray-600">
                        Use the drop-down menu to switch between 2024 and an
                        overview from 2020 to 2024.
                    </h3>

                    {/* <!-- Drop-down Menu Button --> */}
                    <select
                        id="year-dropdown"
                        className="p-2 text-lg rounded border border-gray-300 bg-gray-100 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:border-gray-500 focus:outline-none focus:bg-gray-300 focus:border-gray-800"
                    >
                        <option value="2024">2024</option>
                        <option value="all">All Years</option>
                    </select>

                    {/* <!-- Flex container for carousel --> */}
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        {/* <!-- Add text in carousel --> */}
                        <div className="relative overflow-hidden w-full px-8">
                            <div
                                id="carousel"
                                className="carousel w-full flex transition-transform duration-300"
                            >
                                {/* <!-- 1st Card --> */}
                                <div className="carousel-item top5-carousel-item flex-shrink-0 w-full bg-gray-100 bg-opacity-50 rounded-lg shadow-md h-48 flex items-center justify-center p-4">
                                    <p className="text-lg text-gray-600 text-center">
                                        In 2024, the{' '}
                                        <span className="text-lg font-bold">
                                            top 5 scams
                                        </span>{' '}
                                        alone accounted for approximately
                                        <span className="text-lg font-bold text-orange-500">
                                            $3.27 million
                                        </span>{' '}
                                        in losses, representing
                                        <span className="text-lg font-bold text-orange-500">
                                            more than 90%
                                        </span>{' '}
                                        of the total amount lost on social media
                                        scams with young adults.
                                    </p>
                                </div>

                                {/* <!-- 2nd Card --> */}
                                <div className="carousel-item top5-carousel-item flex-shrink-0 w-full bg-gray-100 bg-opacity-50 rounded-lg shadow-md h-48 flex items-center justify-center p-4">
                                    <p className="text-lg text-gray-600 text-center">
                                        <span className="text-lg font-bold">
                                            Buying or selling scams
                                        </span>{' '}
                                        are the most common, making up over
                                        <span className="text-lg font-bold text-orange-500">
                                            56%
                                        </span>
                                        from 2020 till now.
                                        <span className="text-lg font-bold">
                                            Over 1,443 reports and $691k
                                            financial lost
                                        </span>{' '}
                                        within 2024.
                                        <br />
                                    </p>
                                </div>

                                {/* <!-- 3rd Card --> */}
                                <div className="carousel-item top5-carousel-item flex-shrink-0 w-full bg-gray-100 bg-opacity-50 rounded-lg shadow-md h-48 flex items-center justify-center p-4">
                                    <p className="text-lg text-gray-600 text-center">
                                        Among these years,{' '}
                                        <span className="text-lg font-bold">
                                            investment scams
                                        </span>{' '}
                                        have the highest financial impact,
                                        making up
                                        <span className="text-lg font-bold text-orange-500">
                                            50%
                                        </span>{' '}
                                        of the total losses.
                                        <br />
                                        Whilst the report number only took
                                        around 10 - 15%, it faced
                                        <span className="text-lg font-bold">
                                            the most severe money lost issue
                                        </span>{' '}
                                        amoung the top 5 scam types.
                                    </p>
                                </div>

                                {/* <!-- 4th Card --> */}
                                <div className="carousel-item top5-carousel-item flex-shrink-0 w-full bg-gray-100 bg-opacity-50 rounded-lg shadow-md h-48 flex items-center justify-center p-4">
                                    <p className="text-lg text-gray-600 text-center">
                                        <span className="text-lg font-bold">
                                            Gain personal information scams
                                        </span>
                                        took about
                                        <span className="text-lg font-bold text-orange-500">
                                            14%
                                        </span>
                                        with 2,326 reports during the whole
                                        period. <br />
                                        Although it does not directly cause vast
                                        money loss, it is more likely to face
                                        other scams in the future when your
                                        personal information is leaked.
                                    </p>
                                </div>

                                {/* <!-- 5th Card --> */}
                                <div className="carousel-item top5-carousel-item flex-shrink-0 w-full bg-gray-100 bg-opacity-50 rounded-lg shadow-md h-48 flex items-center justify-center p-4">
                                    <p className="text-lg text-gray-600 text-center">
                                        <span className="text-lg font-bold">
                                            No matter which type of scam you are
                                            facing, the potential loss can
                                            accumulate into a vast amount and
                                            continuously influence our daily
                                            lives.
                                            <br />
                                        </span>
                                        Interact with the chart to see the
                                        number of reports of top 5 scams, and
                                        click on a certain type to find detailed
                                        information.
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Add button for carousel --> */}
                            <button
                                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-100 bg-opacity-50 text-gray p-3 rounded"
                                id="top5-prev"
                            >
                                {' '}
                            </button>
                            <button
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-100 bg-opacity-50 text-gray p-3 rounded"
                                id="top5-next"
                            >
                                {' '}
                            </button>
                        </div>
                    </div>
                </section>

                {/* <!-- New Section for charts -->     */}
                <section>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        {/* <!-- Get Sunburst Chart --> */}
                        <div
                            id="sunburst-chart"
                            className="chart h-[400px] md:h-[500px] bg-gray-50 rounded-lg w-full md:w-1/2 px-4"
                        ></div>
                        {/* <!-- Get Bar Chart --> */}
                        <div
                            id="bar-chart"
                            className="chart h-[400px] md:h-[500px] bg-gray-50 rounded-lg w-full md:w-1/2 px-4"
                        ></div>
                    </div>
                </section>

                <section className="flex flex-col justify-center items-center w-full gap-y-8 py-6">
                    <TypographyH1>
                        Explore More with Our Scam Simulation Game!
                    </TypographyH1>
                    <TypographyLead>
                        Dive deeper into the world of scams and test your
                        knowledge with our interactive game!
                        {/* Why Play? Sort and Analyze: */}
                        {/* <br />
                    Sort scenarios based on different scam categories and
                    amounts lost.
                    <br />
                    Test Your Skills: Challenge yourself to identify and
                    understand various scam types.
                    <br />
                    Learn & Protect: Gain valuable insights that can help you
                    recognize and avoid scams in real life. */}
                    </TypographyLead>
                    <Link href="/game" className="underline">
                        Play the Scam Simulation Game
                    </Link>
                </section>
            </div>
        </>
    )
}

export default Insights
