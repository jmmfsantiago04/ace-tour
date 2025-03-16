'use server';

import { unstable_noStore as noStore } from 'next/cache';

interface ContentReviewBlock {
    blockType: 'content-review';
    blockName?: string;
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
}

export async function getUserStories(locale: 'en' | 'ko' = 'en'): Promise<ContentReviewBlock | null> {
    noStore();
    console.log('👥 Fetching User Stories content for locale:', locale);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[layout.blockType][equals]=content-review&depth=2&locale=${locale}&draft=false`,
            {
                next: { revalidate: 0 },
                cache: 'no-store',
                headers: {
                    'Accept-Language': locale,
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch User Stories content: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📥 Raw API Response:', JSON.stringify(data, null, 2));

        if (!data?.docs?.[0]?.layout) {
            console.log('❌ No layout found in API response');
            return null;
        }

        // Log all content-review blocks and their details for debugging
        const contentReviewBlocks = data.docs[0].layout.filter(
            (block: any) => block.blockType === 'content-review'
        );

        console.log('📋 Available content-review blocks:');
        contentReviewBlocks.forEach((block: any, index: number) => {
            console.log(`Block ${index + 1}:`, {
                title: block.title,
                blockName: block.blockName
            });
        });

        // Find the content-review block with title containing "user stories" (case insensitive)
        const contentReviewBlock = data.docs[0].layout.find(
            (block: any) =>
                block.blockType === 'content-review' &&
                block.title.toLowerCase().includes('user stories')
        ) as ContentReviewBlock | undefined;

        if (!contentReviewBlock) {
            console.log('❌ No User Stories block found in layout');
            console.log('💡 Make sure you have a content-review block with title containing "User Stories"');
            return null;
        }

        // Log the specific block data for debugging
        console.log(`📄 User Stories block found for ${locale}:`, {
            title: contentReviewBlock.title,
            description: contentReviewBlock.description,
            blockName: contentReviewBlock.blockName,
            reviews: contentReviewBlock.reviews,
            buttons: contentReviewBlock.buttons
        });

        return contentReviewBlock;
    } catch (error) {
        console.error('❌ Error fetching User Stories content:', error);
        return null;
    }
} 