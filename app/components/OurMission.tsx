'use client';

import { motion } from 'framer-motion';

interface OurMissionProps {
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

export function OurMission({ title, content, secondaryContent, cards, lang }: OurMissionProps) {
    // Function to add line break after "and"
    const formatContent = (text: string) => {
        return text.split(' and ').map((part, index, array) => (
            <span key={index}>
                {part}
                {index < array.length - 1 && (
                    <>
                        {' and'}
                        <br />
                    </>
                )}
            </span>
        ));
    };

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Label and Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center w-[264px] h-[40px] gap-[8px] rounded-[22px] border border-[#F6B600] p-[8px] mb-6 bg-[#F6B600]/10">
                        <span className="text-sm font-medium text-[#F6B600]">
                            {title}
                        </span>
                    </div>
                    <h2 className="text-[40px] font-semibold text-gray-900 max-w-3xl mx-auto leading-tight">
                        {formatContent(content)}
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                {cards && cards.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="w-full max-w-[375px] h-[340px] bg-[#1B365C] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl p-8 pt-[50px] text-white border border-[#1B365C] flex flex-col"
                            >
                                <h3 className="text-[18px] leading-[28px] tracking-[0%] font-semibold mb-4 align-middle">
                                    {card.cardTitle}
                                </h3>
                                <p className="text-[16px] leading-[24px] tracking-[0%] font-medium align-middle text-white/80">
                                    {card.cardContent}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}    