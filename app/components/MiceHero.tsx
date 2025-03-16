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
                        <div className="relative mx-auto w-full lg:w-[803px] h-auto lg:h-[168px] mt-[20px] mb-[120px]">
                            <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[52px] font-bold text-[#262626] leading-[1.2] sm:leading-[1.3] md:leading-[1.3] lg:leading-[56px] tracking-[0px] text-center lg:absolute lg:left-0 lg:right-0 lg:px-0">
                                {title}
                            </h1>
                        </div>
                    ) : (
                        // Korean Title Layout
                        <div className="relative mx-auto mt-[40px] mb-[120px]">
                            <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[52px] font-bold text-[#262626] leading-[1.4] sm:leading-[1.4] md:leading-[1.4] lg:leading-[72px] tracking-[0px] text-center max-w-[280px] sm:max-w-[600px] lg:max-w-[920px] mx-auto px-4">
                                {title}
                            </h1>
                        </div>
                    )}

                    {/* Statistics Cards */}
                    {cards && cards.length > 0 && (
                        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-[50px] max-w-[348px] sm:max-w-[720px] lg:max-w-[1112px] mx-auto">
                            {cards.map((card, index) => (
                                <motion.div
                                    key={card.id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex flex-col items-center w-full sm:w-[348px] min-h-[140px] sm:h-[155px] gap-3 sm:gap-4"
                                >
                                    <span className="gradient-text text-[36px] sm:text-[44px] lg:text-[56px] font-bold">
                                        {card.cardTitle}
                                    </span>
                                    <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-[24px] sm:leading-[26px] lg:leading-[28px] tracking-[0%] text-center align-middle text-[#262626] max-w-full sm:max-w-[348px] px-4 sm:px-0">
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