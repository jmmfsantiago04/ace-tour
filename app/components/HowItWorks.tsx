'use client';

import { motion } from 'framer-motion';

interface HowItWorksProps {
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

export function HowItWorks({ title, content, secondaryContent, cards, lang }: HowItWorksProps) {
    // Function to format the main content with highlighted words
    const formatContent = (text: string) => {
        const words = text.split(' ');
        return words.map((word, index) => {
            if (word === 'Ease,' || word === 'Confidence') {
                return <span key={index} className="text-[#F6B600]">{word} </span>;
            }
            return <span key={index}>{word} </span>;
        });
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
                    <h2 className="text-[40px] font-semibold text-gray-900 max-w-3xl mx-auto leading-tight mb-6">
                        {formatContent(content)}
                    </h2>
                    {secondaryContent && (
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            {secondaryContent}
                        </p>
                    )}
                </motion.div>

                {/* Cards Stack */}
                {cards && cards.length > 0 && (
                    <div className="flex flex-col items-center gap-6 max-w-[560px] mx-auto">
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="w-full h-[184px] bg-[#1976D226] rounded-2xl p-8 border border-[#E5E7EB]"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                        <span className="text-[#1976D2] text-xl font-semibold">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[#1976D2] text-xl font-semibold mb-2">
                                            {card.cardTitle}
                                        </h3>
                                        <p className="text-[#1976D2] text-base leading-relaxed">
                                            {card.cardContent}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
} 