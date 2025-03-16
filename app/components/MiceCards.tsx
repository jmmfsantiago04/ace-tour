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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[16px] gap-y-[60px] max-w-[368px] sm:max-w-[752px] lg:max-w-[1136px] mx-auto">
                    {Array.from({ length: 6 }, (_, i) => {
                        const card = cards[i % cards.length]; // Cycle through available cards if less than 6
                        return (
                            <motion.div
                                key={`${card.id || i}-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex flex-col w-[368px] h-[305px] bg-white overflow-hidden"
                            >
                                {/* Image Container */}
                                <div className="relative w-[368px] h-[233px] rounded-t-[20px] rounded-bl-[20px] overflow-hidden">
                                    <Image
                                        src={card.image.url}
                                        alt={card.image.alt}
                                        fill
                                        className="object-cover"
                                        sizes="368px"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center justify-center w-[122px] h-[40px] bg-[#FAFAFA80] border border-white/20 rounded-[22px] px-[8px] gap-[8px]">
                                            <span className="text-base font-semibold leading-[24px] tracking-[0%] text-[#FAFAFA]">
                                                {card.label}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="flex flex-col justify-center w-[368px] h-[56px] bg-white mt-[10px]">
                                    <span className="text-[14px] font-semibold leading-[20px] tracking-[0px] align-middle text-[#262626]/80">
                                        {card.date}
                                    </span>
                                    <p className="text-[17px] font-semibold leading-[28px] tracking-[0%] align-middle text-[#262626] line-clamp-1">
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