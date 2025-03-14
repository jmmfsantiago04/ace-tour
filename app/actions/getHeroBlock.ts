'use server';

import { unstable_noStore as noStore } from 'next/cache';

interface HeroBlock {
    blockType: 'hero';
    title: string;
    subtitle?: string;
    highlightedText?: string;
    cta: {
        label: string;
        link: string;
    };
}

export async function getHeroBlock(locale: 'en' | 'ko' = 'en'): Promise<HeroBlock | null> {
    noStore();
    console.log('🦸 Fetching hero block for locale:', locale);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[layout.blockType][equals]=hero&depth=2&locale=${locale}&draft=false`,
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
            throw new Error(`Failed to fetch hero block: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📥 Raw API Response:', JSON.stringify(data, null, 2));

        if (!data?.docs?.[0]?.layout) {
            console.log('❌ No layout found in API response');
            return null;
        }

        const heroBlock = data.docs[0].layout.find(
            (block: any) => block.blockType === 'hero'
        ) as HeroBlock | undefined;

        if (!heroBlock) {
            console.log('❌ No hero block found in layout');
            return null;
        }

        // Log the specific hero block data for debugging
        console.log(`🦸 Hero block found for ${locale}:`, {
            title: heroBlock.title,
            highlightedText: heroBlock.highlightedText,
            subtitle: heroBlock.subtitle,
            cta: heroBlock.cta
        });

        return heroBlock;
    } catch (error) {
        console.error('❌ Error fetching hero block:', error);
        return null;
    }
} 