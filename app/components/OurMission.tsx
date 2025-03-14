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
                    <div className="inline-block px-4 py-1 rounded-full border border-[#F6B600] mb-6">
                        <span className="text-sm font-medium text-[#F6B600]">
                            {title}
                        </span>
                    </div>
                    <h2 className="text-[40px] font-semibold text-gray-900 max-w-3xl mx-auto leading-tight">
                        {content}
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                {cards && cards.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="bg-[#1B365C] rounded-2xl p-8 text-white"
                            >
                                <h3 className="text-2xl font-semibold mb-4">
                                    {card.cardTitle}
                                </h3>
                                <p className="text-white/80 leading-relaxed">
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