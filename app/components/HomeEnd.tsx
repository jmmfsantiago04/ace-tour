'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface HomeEndProps {
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

export function HomeEnd({ title, content, secondaryContent, cards, buttons, lang }: HomeEndProps) {
    return (
        <section className="relative mt-[40px] sm:mt-[60px] lg:mt-[80px] flex justify-center w-full px-4 sm:px-6 lg:px-0">
            <div className="relative flex items-center justify-center w-full lg:w-[1232px] min-h-[279px] bg-[#1B365D] rounded-t-[20px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center justify-center w-full h-full py-8 sm:py-10 lg:py-12"
                >
                    {/* Title */}
                    <div className={`${lang === 'en' ? 'w-full px-4 sm:px-6 lg:w-[756px] lg:px-0 h-auto lg:h-[112px]' : ''} flex items-center justify-center`}>
                        <h2 className="text-white text-[32px] sm:text-[42px] lg:text-[52px] font-semibold leading-[36px] sm:leading-[46px] lg:leading-[56px] tracking-[0px] text-center mb-6 sm:mb-8 lg:mb-12">
                            {title}
                        </h2>
                    </div>

                    {/* Buttons */}
                    {buttons && buttons.length > 0 && (
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-6 lg:px-0">
                            {buttons.map((button, index) => (
                                <Link
                                    key={index}
                                    href={`/${lang}${button.link}`}
                                    className={`inline-flex items-center justify-center rounded-lg ${index === 0
                                        ? 'w-full sm:w-[260px] lg:w-[296px] h-[48px] sm:h-[52px] lg:h-[56px] bg-white text-[#1B365D] border border-white px-4 sm:px-5 py-3 sm:py-4 gap-4 rounded-lg'
                                        : 'w-full sm:w-[240px] lg:w-[266px] h-[48px] sm:h-[52px] lg:h-[56px] bg-[#1976D2] text-white px-4 sm:px-5 py-3 sm:py-4 gap-4 rounded-lg'
                                        } transition-all hover:opacity-90`}
                                >
                                    <span className={`${index === 0
                                        ? 'w-full sm:w-[220px] lg:w-[256px] h-[24px] flex items-center justify-center whitespace-nowrap'
                                        : 'w-full sm:w-[200px] lg:w-[226px] h-[24px] flex items-center justify-center whitespace-nowrap'
                                        } text-[14px] font-medium leading-[24px] tracking-[0%]`}>
                                        {button.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
} 