'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeroProps {
    title: string;
    subtitle?: string;
    highlightedText?: string;
    cta: {
        label: string;
        link: string;
    };
    lang: string;
}

export function Hero({ title, subtitle, highlightedText, cta, lang }: HeroProps) {
    // Handle title formatting differently based on language
    const getTitleContent = () => {
        if (lang === 'ko') {
            if (highlightedText && title) {
                // Find where the rest of the text starts after the highlighted part
                const restOfText = title.replace(highlightedText, '').trim();

                // Split the rest of the text at "특별"
                const [firstPart, secondPart] = restOfText.split('특별');

                return (
                    <div className="flex flex-col gap-1">
                        <div className="flex items-start gap-2">
                            <span className="text-[#F6B600]">{highlightedText}</span>
                            <span>{firstPart}</span>
                        </div>
                        <div>
                            <span>특별{secondPart}</span>
                        </div>
                    </div>
                );
            }

            // Fallback if no highlighted text
            return <div>{title}</div>;
        } else {
            // For other languages (English), split into lines
            const parts = highlightedText ? title.split(highlightedText) : [title];
            const lines = [
                parts[0]?.trim() || '',
                parts[1] ? parts[1].trim() : '',
                highlightedText || ''
            ].filter(Boolean);

            return lines.map((line, index) => (
                <span
                    key={index}
                    className={line === highlightedText ? 'text-[#F6B600]' : ''}
                >
                    {line}
                </span>
            ));
        }
    };

    return (
        <section className="relative h-screen w-full overflow-hidden bg-white">
            {/* Content */}
            <div className="relative z-10 flex h-full pt-[3.4375rem] px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-7xl">
                    <div className={`flex flex-col ${lang === 'ko' ? 'space-y-[4.375rem]' : 'space-y-[1.5625rem]'}`}>
                        {/* Title container with exact dimensions */}
                        <div className={`w-full max-w-[47.25rem] ${lang === 'ko' ? 'h-[7rem]' : ''}`}>
                            <motion.h1
                                className={`text-gray-900 text-[2rem] sm:text-[2.5rem] md:text-[3.25rem] leading-[2.5rem] sm:leading-[3rem] md:leading-[3.5rem] tracking-[0] font-semibold ${lang === 'ko'
                                    ? 'h-full flex items-center'
                                    : 'flex flex-col gap-1 md:h-[10.5rem] md:gap-2'
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                {getTitleContent()}
                            </motion.h1>
                        </div>

                        {/* Bottom section with CTA and subtitle */}
                        <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between">
                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="md:w-auto"
                            >
                                <Link
                                    href={`/${lang}${cta.link}`}
                                    className="group inline-flex h-[3rem] w-[15.6875rem] items-center justify-between rounded-lg bg-[#1976D2] pl-5 pr-1 text-white transition-all hover:bg-[#1565C0]"
                                >
                                    <span className="text-base font-medium leading-6 tracking-[0]">{cta.label}</span>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                                        <svg
                                            className="h-5 w-5 transform text-[#1976D2] transition-transform duration-200 group-hover:translate-x-1"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5.83331 14.1667L14.1666 5.83334M14.1666 5.83334H6.66665M14.1666 5.83334V13.3333"
                                                stroke="currentColor"
                                                strokeWidth="1.67"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* Subtitle with exact dimensions */}
                            {subtitle && (
                                <motion.div
                                    className="w-full md:h-[3.3125rem] md:w-[22.5625rem] md:ml-auto"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <p className="flex h-full items-center text-sm sm:text-base font-medium leading-5 sm:leading-6 tracking-[0] text-gray-600">
                                        {subtitle}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 