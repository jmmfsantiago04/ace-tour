'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface FAQProps {
    title: string;
    content: string;
    secondaryContent?: string;
    cards?: {
        cardTitle: string;
        cardContent: string;
        id?: string | null;
    }[];
    lang: string;
}

export function FAQ({ title, content, secondaryContent, cards, lang }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="relative flex justify-center w-full px-3 xs:px-4 sm:px-6 lg:px-8 bg-[#F5F9FF]">
            <div className="relative w-full max-w-7xl py-12 xs:py-16 sm:py-20 lg:py-24">
                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`text-center ${lang === 'ko' ? 'mb-[2rem] xs:mb-[2.5rem]' : 'mb-8 xs:mb-12 sm:mb-16'}`}
                >
                    <div className="inline-flex items-center justify-center w-full max-w-[16.5rem] min-h-[2.5rem] gap-[0.5rem] rounded-[1.375rem] border border-[#F6B600] p-[0.5rem] mb-3 xs:mb-4 sm:mb-6 bg-[#FFF8F0]">
                        <span className="text-xs xs:text-sm font-medium text-[#F6B600] px-2">
                            {title}
                        </span>
                    </div>
                    <div className={`mx-auto px-3 xs:px-4 sm:px-0 ${lang === 'en'
                        ? 'w-full sm:w-[90%] lg:w-[60.875rem] h-auto sm:h-auto lg:h-auto'
                        : 'w-full sm:w-[90%] md:w-[49.75rem] h-auto'
                        }`}>
                        <h2 className={`font-semibold text-center text-gray-900 ${lang === 'en'
                            ? 'text-[1.5rem] xs:text-[1.75rem] sm:text-[2rem] lg:text-[3.25rem] leading-[1.2] sm:leading-[1.3] lg:leading-[1.1]'
                            : 'text-[1.25rem] xs:text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.2] sm:leading-[1.25] md:leading-[1.2]'
                            } tracking-[0] break-words`}>
                            {content}
                        </h2>
                    </div>
                </motion.div>

                {/* FAQ Cards */}
                <div className="flex flex-col space-y-[1rem] sm:space-y-[1.25rem] max-w-[47.375rem] mx-auto px-3 xs:px-4 sm:px-6 lg:px-0">
                    {cards?.map((card, index) => (
                        <motion.div
                            key={card.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-full"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex items-center justify-between w-full min-h-[4rem] xs:min-h-[5rem] py-[1rem] xs:py-[1.5rem] px-[0.75rem] xs:px-[1rem] bg-white rounded-[1rem] xs:rounded-[1.375rem] text-left hover:bg-gray-50 transition-colors border border-[#E5E7EB] gap-[0.75rem] xs:gap-[1.25rem]"
                            >
                                <span className="text-[0.875rem] xs:text-[1rem] font-medium leading-[1.4] xs:leading-[1.5] tracking-[0%] text-[#262626]">
                                    {card.cardTitle}
                                </span>
                                <span className="flex-shrink-0">
                                    <motion.div
                                        className="flex items-center justify-center w-[1.75rem] h-[1.75rem] xs:w-[2rem] xs:h-[2rem] rounded-full bg-[#1976D2]"
                                    >
                                        <motion.svg
                                            width="10"
                                            height="10"
                                            viewBox="0 0 10 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            animate={{ rotate: openIndex === index ? 45 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <path
                                                d="M5 2V8M2 5H8"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </motion.svg>
                                    </motion.div>
                                </span>
                            </button>
                            <motion.div
                                initial={false}
                                animate={{
                                    height: openIndex === index ? 'auto' : 0,
                                    opacity: openIndex === index ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden bg-white rounded-b-[1rem] xs:rounded-b-[1.25rem]"
                            >
                                <div className="p-4 xs:p-6 pt-0">
                                    <p className="text-[0.8125rem] xs:text-[0.875rem] sm:text-[1rem] text-[#262626]/80 leading-[1.6]">
                                        {card.cardContent}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
} 