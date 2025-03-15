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
                    className="text-center mb-8 sm:mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center justify-center w-[264px] h-[40px] gap-[8px] rounded-[22px] border border-[#F6B600] p-[8px] mb-4 sm:mb-6 bg-[#F6B600]/10">
                        <span className="text-sm font-medium text-[#F6B600]">
                            {title}
                        </span>
                    </div>
                    <div className="w-full sm:w-[600px] md:w-[796px] h-auto sm:h-[80px] md:h-[96px] mx-auto px-4 sm:px-0">
                        <h2 className="text-[24px] sm:text-[32px] md:text-[40px] leading-[32px] sm:leading-[40px] md:leading-[48px] tracking-[0px] font-semibold text-gray-900 text-center">
                            {formatContent(content)}
                        </h2>
                    </div>
                    {secondaryContent && (
                        <p className="text-[#262626] w-full sm:w-[600px] md:w-[796px] mx-auto text-[16px] sm:text-[20px] md:text-[24px] leading-[24px] sm:leading-[28px] md:leading-[32px] tracking-[0%] font-normal text-center mt-4 sm:mt-6">
                            {secondaryContent}
                        </p>
                    )}
                </motion.div>

                {/* Cards Grid */}
                {cards && cards.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="w-full max-w-[375px] h-[300px] sm:h-[320px] md:h-[340px] bg-[#1B365C] rounded-tl-xl rounded-tr-xl rounded-bl-xl sm:rounded-tl-2xl sm:rounded-tr-2xl sm:rounded-bl-2xl p-6 sm:p-7 md:p-8 text-white border border-[#1B365C] flex flex-col"
                            >
                                <h3 className="text-[16px] sm:text-[17px] md:text-[18px] leading-[24px] sm:leading-[26px] md:leading-[28px] tracking-[0%] font-semibold mb-4 align-middle">
                                    {card.cardTitle}
                                </h3>
                                <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[24px] tracking-[0%] font-medium text-white/80">
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