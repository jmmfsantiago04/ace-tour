'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface MiceHeroProps {
    title: string;
    content: string;
    secondaryContent?: string;
    cards?: {
        cardTitle: string;
        cardContent: string;
        id?: string | null;
    }[];
    buttons?: {
        label: string;
        link: string;
    }[];
    lang: string;
}

export function MiceHero({ title, content, secondaryContent, cards, buttons, lang }: MiceHeroProps) {
    return (
        <section className="relative flex justify-center w-full px-4 sm:px-6 lg:px-8 bg-white">
            <style jsx>{`
                .gradient-text {
                    background: linear-gradient(179.24deg, rgba(163, 213, 255, 0.2) -17.36%, #1976D2 52.97%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
            <div className="relative w-full max-w-7xl py-8 sm:py-12 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    {/* Title */}
                    {lang === 'en' ? (
                        // English Title Layout
                        <div className="relative mx-auto w-full lg:w-[50.1875rem] h-auto lg:h-[10.5rem] mt-[1.25rem] mb-[7.5rem]">
                            <h1 className="text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3.25rem] font-bold text-[#262626] leading-[1.2] sm:leading-[1.3] md:leading-[1.3] lg:leading-[3.5rem] tracking-[0] text-center lg:absolute lg:left-0 lg:right-0 lg:px-0">
                                {title}
                            </h1>
                        </div>
                    ) : (
                        // Korean Title Layout
                        <div className="relative mx-auto mt-[2.5rem] mb-[7.5rem]">
                            <h1 className="text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3.25rem] font-bold text-[#262626] leading-[1.4] sm:leading-[1.4] md:leading-[1.4] lg:leading-[4.5rem] tracking-[0] text-center max-w-[17.5rem] sm:max-w-[37.5rem] lg:max-w-[57.5rem] mx-auto px-4">
                                {title}
                            </h1>
                        </div>
                    )}

                    {/* Statistics Cards */}
                    {cards && cards.length > 0 && (
                        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-[3.125rem] max-w-[21.75rem] sm:max-w-[45rem] lg:max-w-[69.5rem] mx-auto">
                            {cards.map((card, index) => (
                                <motion.div
                                    key={card.id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex flex-col items-center w-full sm:w-[21.75rem] min-h-[8.75rem] sm:h-[9.6875rem] gap-3 sm:gap-4"
                                >
                                    <span className="gradient-text text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem] font-bold">
                                        {card.cardTitle}
                                    </span>
                                    <p className="text-[1rem] sm:text-[1.125rem] lg:text-[1.25rem] font-medium leading-[1.5rem] sm:leading-[1.625rem] lg:leading-[1.75rem] tracking-[0] text-center align-middle text-[#262626] max-w-full sm:max-w-[21.75rem] px-4 sm:px-0">
                                        {card.cardContent}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
} 