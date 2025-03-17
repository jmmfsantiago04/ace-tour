'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface MiceCardsProps {
    cards: {
        label: string;
        date: string;
        content: string;
        image: {
            url: string;
            alt: string;
        };
        id?: string | null;
    }[];
}

export function MiceCards({ cards }: MiceCardsProps) {
    return (
        <section className="relative flex justify-center w-full px-4 sm:px-6 lg:px-8 bg-white">
            <div className="relative w-full max-w-7xl py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[1rem] gap-y-[3.75rem] max-w-[23rem] sm:max-w-[47rem] lg:max-w-[71rem] mx-auto">
                    {Array.from({ length: 6 }, (_, i) => {
                        const card = cards[i % cards.length]; // Cycle through available cards if less than 6
                        return (
                            <motion.div
                                key={`${card.id || i}-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex flex-col w-[23rem] h-[19.0625rem] bg-white overflow-hidden"
                            >
                                {/* Image Container */}
                                <div className="relative w-[23rem] h-[14.5625rem] rounded-t-[1.25rem] rounded-bl-[1.25rem] overflow-hidden">
                                    <Image
                                        src={card.image.url}
                                        alt={card.image.alt}
                                        fill
                                        className="object-cover"
                                        sizes="23rem"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center justify-center w-[7.625rem] h-[2.5rem] bg-[#FAFAFA80] border border-white/20 rounded-[1.375rem] px-[0.5rem] gap-[0.5rem]">
                                            <span className="text-base font-semibold leading-[1.5rem] tracking-[0] text-[#FAFAFA]">
                                                {card.label}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="flex flex-col justify-center w-[23rem] h-[3.5rem] bg-white mt-[0.625rem]">
                                    <span className="text-[0.875rem] font-semibold leading-[1.25rem] tracking-[0] align-middle text-[#262626]/80">
                                        {card.date}
                                    </span>
                                    <p className="text-[1.0625rem] font-semibold leading-[1.75rem] tracking-[0] align-middle text-[#262626] line-clamp-1">
                                        {card.content}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}