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
        <section className="relative flex justify-center w-full px-4 sm:px-6 lg:px-8 bg-[#F5F9FF]">
            <div className="relative w-full max-w-7xl py-16 sm:py-20 lg:py-24">
                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`text-center ${lang === 'ko' ? 'mb-[40px]' : 'mb-12 sm:mb-16'}`}
                >
                    <div className="inline-flex items-center justify-center w-[264px] h-[40px] gap-[8px] rounded-[22px] border border-[#F6B600] p-[8px] mb-4 sm:mb-6 bg-[#FFF8F0]">
                        <span className="text-sm font-medium text-[#F6B600]">
                            {title}
                        </span>
                    </div>
                    <div className={`mx-auto px-4 sm:px-0 ${lang === 'en' ? 'w-full sm:w-[900px] lg:w-[974px] h-auto sm:h-[96px] lg:h-[112px]' : 'w-full sm:w-[600px] md:w-[796px] h-auto sm:h-[80px] md:h-[96px]'}`}>
                        <h2 className={`font-semibold text-center text-gray-900 ${lang === 'en'
                            ? 'text-[32px] sm:text-[32px] lg:text-[52px] leading-[36px] sm:leading-[46px] lg:leading-[56px]'
                            : 'text-[24px] sm:text-[32px] md:text-[40px] leading-[32px] sm:leading-[40px] md:leading-[48px]'
                            } tracking-[0px]`}>
                            {content}
                        </h2>
                    </div>
                </motion.div>

                {/* FAQ Cards */}
                <div className="flex flex-col space-y-[20px] max-w-[758px] mx-auto">
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
                                className="flex items-center justify-between w-full h-[80px] pt-[24px] pr-[16px] pb-[24px] pl-[16px] bg-white rounded-[22px] text-left hover:bg-gray-50 transition-colors border border-[#E5E7EB] gap-[20px]"
                            >
                                <span className="text-[16px] font-medium leading-[24px] tracking-[0%] text-[#262626]">
                                    {card.cardTitle}
                                </span>
                                <span className="flex-shrink-0 ml-4">
                                    <motion.div
                                        className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#1976D2]"
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
                                className="overflow-hidden bg-white rounded-b-[20px]"
                            >
                                <div className="p-6 pt-0">
                                    <p className="text-[14px] sm:text-[16px] text-[#262626]/80 leading-[1.6]">
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