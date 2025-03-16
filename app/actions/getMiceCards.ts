'use server';

import { unstable_noStore as noStore } from 'next/cache';

interface CardLabeledItem {
    label: string;
    date: string;
    content: string;
    image: {
        url: string;
        alt: string;
    };
    id?: string | null;
}

interface CardLabeledBlock {
    blockType: 'card-labeled';
    blockName?: string;
    cards: CardLabeledItem[];
}

export async function getMiceCards(locale: 'en' | 'ko' = 'en'): Promise<CardLabeledBlock | null> {
    noStore();
    console.log('🎴 Fetching Mice Cards block for locale:', locale);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[layout.blockType][equals]=card-labeled&depth=2&locale=${locale}&draft=false`,
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
            throw new Error(`Failed to fetch Mice Cards block: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📥 Raw API Response:', JSON.stringify(data, null, 2));

        if (!data?.docs?.[0]?.layout) {
            console.log('❌ No layout found in API response');
            return null;
        }

        // Log all card-labeled blocks and their details for debugging
        const cardLabeledBlocks = data.docs[0].layout.filter(
            (block: any) => block.blockType === 'card-labeled'
        );

        console.log('📋 Available card-labeled blocks:');
        cardLabeledBlocks.forEach((block: any, index: number) => {
            console.log(`Block ${index + 1}:`, {
                blockName: block.blockName,
                cardsCount: block.cards?.length
            });
        });

        // Find the specific card-labeled block with blockName "Mice Cards" (case insensitive)
        const cardLabeledBlock = data.docs[0].layout.find(
            (block: any) =>
                block.blockType === 'card-labeled' &&
                block.blockName?.toLowerCase() === 'mice cards'
        ) as CardLabeledBlock | undefined;

        if (!cardLabeledBlock) {
            console.log('❌ No Mice Cards block found in layout');
            console.log('💡 Make sure you have a card-labeled block with blockName "Mice Cards"');
            return null;
        }

        // Log the specific block data for debugging
        console.log(`📄 Mice Cards block found for ${locale}:`, {
            blockName: cardLabeledBlock.blockName,
            cardsCount: cardLabeledBlock.cards?.length
        });

        return cardLabeledBlock;
    } catch (error) {
        console.error('❌ Error fetching Mice Cards block:', error);
        return null;
    }
} 