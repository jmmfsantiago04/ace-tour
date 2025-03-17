'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getOurMission } from '../actions/getOurMission';

interface OurMissionProps {
    lang: string;
}

export function OurMission({ lang }: OurMissionProps) {
    const [missionData, setMissionData] = useState<{
        title: string;
        content: string;
        secondaryContent?: string | null;
        cards?: {
            cardTitle: string;
            cardContent: string;
            id?: string | null;
        }[];
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOurMission(lang as 'en' | 'ko');
            if (data) {
                setMissionData(data);
            }
        };

        fetchData();
    }, [lang]);

    if (!missionData) {
        return null; // or a loading state
    }

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
                    <div className="inline-flex items-center justify-center w-[16.5rem] h-[2.5rem] gap-[0.5rem] rounded-[1.375rem] border border-[#F6B600] p-[0.5rem] mb-4 sm:mb-6 bg-[#F6B600]/10">
                        <span className="text-sm font-medium text-[#F6B600]">
                            {missionData.title}
                        </span>
                    </div>
                    <div className="w-full sm:w-[37.5rem] md:w-[49.75rem] h-auto sm:h-[5rem] md:h-[6rem] mx-auto px-4 sm:px-0">
                        <h2 className="text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] leading-[2rem] sm:leading-[2.5rem] md:leading-[3rem] tracking-[0] font-semibold text-gray-900 text-center">
                            {formatContent(missionData.content)}
                        </h2>
                    </div>
                    {missionData.secondaryContent && (
                        <p className="text-[#262626] w-full sm:w-[37.5rem] md:w-[49.75rem] mx-auto text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] leading-[1.5rem] sm:leading-[1.75rem] md:leading-[2rem] tracking-[0] font-normal text-center mt-4 sm:mt-6">
                            {missionData.secondaryContent}
                        </p>
                    )}
                </motion.div>

                {/* Cards Grid */}
                {missionData.cards && missionData.cards.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
                        {missionData.cards.map((card, index) => (
                            <motion.div
                                key={card.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="w-full max-w-[23.4375rem] h-[18.75rem] sm:h-[20rem] md:h-[21.25rem] bg-[#1B365C] rounded-tl-xl rounded-tr-xl rounded-bl-xl sm:rounded-tl-2xl sm:rounded-tr-2xl sm:rounded-bl-2xl p-6 sm:p-7 md:p-8 text-white border border-[#1B365C] flex flex-col"
                            >
                                <h3 className="text-[1rem] sm:text-[1.0625rem] md:text-[1.125rem] leading-[1.5rem] sm:leading-[1.625rem] md:leading-[1.75rem] tracking-[0] font-semibold mb-4 align-middle">
                                    {card.cardTitle}
                                </h3>
                                <p className="text-[0.875rem] sm:text-[0.9375rem] md:text-[1rem] leading-[1.25rem] sm:leading-[1.375rem] md:leading-[1.5rem] tracking-[0] font-medium text-white/80">
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