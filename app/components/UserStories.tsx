'use client';

import Link from 'next/link';
import { motion, useAnimationControls } from 'framer-motion';


interface UserStoriesProps {
    title: string;
    description?: string;
    reviews: {
        reviewerInitial: string;
        reviewerName: string;
        reviewText: string;
        readMoreLink?: string;
        id?: string | null;
    }[];
    buttons?: {
        label: string;
        link: string;
    }[];
    lang: string;
}

export function UserStories({ title, description, reviews, buttons, lang }: UserStoriesProps) {
    // Create a longer sequence of reviews for smoother infinite scroll
    const duplicatedReviews = [...reviews, ...reviews, ...reviews, ...reviews];

    return (
        <section className="relative pt-[3.4375rem] px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
            <div className="mx-auto w-full max-w-7xl">
                {/* Title and Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8 sm:mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center justify-center w-[12.5rem] sm:w-[14.5rem] md:w-[16.5rem] h-[2rem] sm:h-[2.25rem] md:h-[2.5rem] gap-[0.5rem] rounded-[1.375rem] border border-[#F6B600] p-[0.375rem] sm:p-[0.4375rem] md:p-[0.5rem] mb-4 sm:mb-5 md:mb-6 bg-[#F6B600]/10">
                        <span className="text-xs sm:text-sm font-medium text-[#F6B600]">
                            {title}
                        </span>
                    </div>
                    {description && (
                        <div className="w-full sm:w-[37.5rem] md:w-[49.75rem] mx-auto px-4 sm:px-0">
                            <p className="text-[#262626] text-[1.75rem] sm:text-[2.125rem] md:text-[2.5rem] leading-[2.25rem] sm:leading-[2.625rem] md:leading-[3rem] tracking-[0] font-semibold text-center">
                                {description}
                            </p>
                        </div>
                    )}
                </motion.div>

                {/* Review Cards Carousel */}
                {reviews && reviews.length > 0 && (
                    <div className="relative w-full sm:w-[37.5rem] md:w-[56.25rem] lg:w-[72rem] h-[31.25rem] sm:h-[34.375rem] md:h-[37.375rem] mx-auto bg-[#A3D5FF] rounded-t-[1.25rem] rounded-br-[1.25rem] overflow-hidden">
                        <div className="grid grid-rows-2 gap-4 sm:gap-5 md:gap-6 p-4 sm:p-6 md:p-8">
                            {/* First Row */}
                            <motion.div
                                className="flex gap-4 sm:gap-5 md:gap-6"
                                animate={{
                                    x: [`0%`, `-${(reviews.length * 100)}%`],
                                }}
                                transition={{
                                    x: {
                                        duration: 80,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: 0
                                    }
                                }}
                            >
                                {duplicatedReviews.map((review, index) => (
                                    <motion.div
                                        key={`row1-${review.id || index}-${index}`}
                                        className="flex-shrink-0 w-[17.5rem] sm:w-[22.5rem] md:w-[28.8125rem] h-[12.5rem] sm:h-[13.75rem] md:h-[15.75rem] rounded-[1.25rem] border border-[#E5E7EB] bg-white p-4 sm:p-6 md:p-8"
                                    >
                                        <div className="flex flex-col h-full">
                                            <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#A3D5FF33] flex items-center justify-center">
                                                    <span className="text-[#1976D2] text-lg sm:text-xl md:text-2xl font-bold">
                                                        {review.reviewerInitial}
                                                    </span>
                                                </div>
                                                <div className="text-[#1976D2] text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-[1.375rem] sm:leading-[1.5rem] md:leading-[1.75rem] tracking-[0] font-semibold align-middle">
                                                    {review.reviewerName}
                                                </div>
                                            </div>
                                            <div className="mt-2 sm:mt-3 md:mt-4 flex flex-col justify-between flex-grow">
                                                <p className="text-[#1976D2] text-[0.75rem] sm:text-[0.8125rem] md:text-[0.875rem] leading-[1.25rem] sm:leading-[1.375rem] md:leading-[1.5rem] tracking-[0] font-medium align-middle">
                                                    {review.reviewText}
                                                    {review.readMoreLink && (
                                                        <span className="text-[#1976D2] text-[0.75rem] sm:text-[0.8125rem] md:text-[0.875rem] hover:underline cursor-pointer">
                                                            ...Read More
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Second Row */}
                            <motion.div
                                className="flex gap-4 sm:gap-5 md:gap-6"
                                animate={{
                                    x: [`0%`, `-${(reviews.length * 100)}%`],
                                }}
                                transition={{
                                    x: {
                                        duration: 80,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: 3
                                    }
                                }}
                            >
                                {duplicatedReviews.map((review, index) => (
                                    <motion.div
                                        key={`row2-${review.id || index}-${index}`}
                                        className="flex-shrink-0 w-[17.5rem] sm:w-[22.5rem] md:w-[28.8125rem] h-[12.5rem] sm:h-[13.75rem] md:h-[15.75rem] rounded-[1.25rem] border border-[#E5E7EB] bg-white p-4 sm:p-6 md:p-8"
                                    >
                                        <div className="flex flex-col h-full">
                                            <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#A3D5FF33] flex items-center justify-center">
                                                    <span className="text-[#1976D2] text-lg sm:text-xl md:text-2xl font-bold">
                                                        {review.reviewerInitial}
                                                    </span>
                                                </div>
                                                <div className="text-[#1976D2] text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-[1.375rem] sm:leading-[1.5rem] md:leading-[1.75rem] tracking-[0] font-semibold align-middle">
                                                    {review.reviewerName}
                                                </div>
                                            </div>
                                            <div className="mt-2 sm:mt-3 md:mt-4 flex flex-col justify-between flex-grow">
                                                <p className="text-[#1976D2] text-[0.75rem] sm:text-[0.8125rem] md:text-[0.875rem] leading-[1.25rem] sm:leading-[1.375rem] md:leading-[1.5rem] tracking-[0] font-medium align-middle">
                                                    {review.reviewText}
                                                    {review.readMoreLink && (
                                                        <span className="text-[#1976D2] text-[0.75rem] sm:text-[0.8125rem] md:text-[0.875rem] hover:underline cursor-pointer">
                                                            ...Read More
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Gradient overlays for smooth transition */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-24 md:w-32 bg-gradient-to-r from-[#A3D5FF] to-transparent pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-24 md:w-32 bg-gradient-to-l from-[#A3D5FF] to-transparent pointer-events-none" />
                    </div>
                )}

                {/* Action Buttons */}
                {buttons && buttons.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4 mt-6 sm:mt-8 md:mt-12"
                    >
                        {buttons.map((button, index) => (
                            <Link
                                key={index}
                                href={`/${lang}${button.link}`}
                                className="group inline-flex h-[2.5rem] sm:h-[2.75rem] md:h-[3rem] w-[12.5rem] sm:w-[14.0625rem] md:w-[15.6875rem] items-center justify-between rounded-lg bg-[#1976D2] pl-4 sm:pl-4.5 md:pl-5 pr-1 text-white transition-all hover:bg-[#1565C0]"
                            >
                                <span className="text-sm sm:text-base font-medium leading-5 sm:leading-6 tracking-[0]">{button.label}</span>
                                <div className="flex h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 items-center justify-center rounded-lg bg-white">
                                    <svg
                                        className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 transform text-[#1976D2] transition-transform duration-200 group-hover:translate-x-1"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5.83331 14.1667L14.1666 5.83334M14.1666 5.83334H6.66665M14.1666 5.83334V13.3333"
                                            stroke="currentColor"
                                            strokeWidth="1.67"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
} 