'use server';

import { unstable_noStore as noStore } from 'next/cache';

interface ContentBlock {
    blockType: 'content';
    title: string;
    content: string;
    secondaryContent?: string;
    blockName?: string;
    cards?: {
        cardTitle: string;
        cardContent: string;
        id?: string | null;
    }[];
    buttons?: {
        label: string;
        link: string;
    }[];
}

export async function getMiceHero(locale: 'en' | 'ko' = 'en'): Promise<ContentBlock | null> {
    noStore();
    console.log('🎯 Fetching Mice Hero content for locale:', locale);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[layout.blockType][equals]=content&depth=2&locale=${locale}&draft=false`,
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
            throw new Error(`Failed to fetch Mice Hero content: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📥 Raw API Response:', JSON.stringify(data, null, 2));

        if (!data?.docs?.[0]?.layout) {
            console.log('❌ No layout found in API response');
            return null;
        }

        // Log all content blocks and their details for debugging
        const contentBlocks = data.docs[0].layout.filter(
            (block: any) => block.blockType === 'content'
        );

        console.log('📋 Available content blocks:');
        contentBlocks.forEach((block: any, index: number) => {
            console.log(`Block ${index + 1}:`, {
                blockType: block.blockType,
                blockName: block.blockName,
                normalizedBlockName: block.blockName?.toLowerCase().replace(/\s+/g, '')
            });
        });

        // Find the content block with blockName "Mice Hero" (case insensitive)
        const contentBlock = data.docs[0].layout.find(
            (block: any) =>
                block.blockType === 'content' &&
                block.blockName?.toLowerCase().replace(/\s+/g, '') === 'micehero'
        ) as ContentBlock | undefined;

        if (!contentBlock) {
            console.log('❌ No Mice Hero content block found in layout');
            console.log('💡 Make sure you have a content block with blockName "Mice Hero"');
            return null;
        }

        // Log the specific content block data for debugging
        console.log(`📄 Mice Hero content block found for ${locale}:`, {
            title: contentBlock.title,
            content: contentBlock.content,
            secondaryContent: contentBlock.secondaryContent,
            blockName: contentBlock.blockName,
            cards: contentBlock.cards,
            buttons: contentBlock.buttons
        });

        return contentBlock;
    } catch (error) {
        console.error('❌ Error fetching Mice Hero content:', error);
        return null;
    }
} 