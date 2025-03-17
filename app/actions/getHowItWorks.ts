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
}

export async function getHowItWorks(locale: 'en' | 'ko' = 'en'): Promise<ContentBlock | null> {
    noStore();
    console.log('🔄 Fetching How It Works content for locale:', locale);

    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[slug][equals]=/home&depth=2&locale=${locale}&draft=false`;
        console.log('🌐 API URL:', apiUrl);

        const response = await fetch(
            apiUrl,
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
            console.error('❌ API Response not OK:', {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries())
            });
            throw new Error(`Failed to fetch How It Works content: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📥 Raw API Response:', JSON.stringify(data, null, 2));

        if (!data?.docs?.[0]?.layout) {
            console.log('❌ No layout found in API response. Response structure:', {
                hasData: !!data,
                hasDocs: !!data?.docs,
                docsLength: data?.docs?.length,
                firstDoc: data?.docs?.[0]
            });
            return null;
        }

        // Log the entire layout structure
        console.log('📋 Full layout structure:', JSON.stringify(data.docs[0].layout.map((block: any) => ({
            blockType: block.blockType,
            blockName: block.blockName,
            title: block.title
        })), null, 2));

        const contentBlocks = data.docs[0].layout.filter(
            (block: any) => block.blockType === 'content'
        );

        console.log('📋 Content blocks found:', contentBlocks.length);
        contentBlocks.forEach((block: any, index: number) => {
            console.log(`Block ${index + 1}:`, {
                title: block.title,
                blockName: block.blockName,
                blockType: block.blockType
            });
        });

        // Find the content block with blockName "How It Works" (case insensitive)
        const contentBlock = data.docs[0].layout.find(
            (block: any) => {
                const isContent = block.blockType === 'content';
                const hasMatchingName = block.blockName?.toLowerCase() === 'how it works';
                console.log('Checking block:', {
                    blockName: block.blockName,
                    blockType: block.blockType,
                    isContent,
                    hasMatchingName
                });
                return isContent && hasMatchingName;
            }
        ) as ContentBlock | undefined;

        if (!contentBlock) {
            console.log('❌ No How It Works content block found in layout');
            console.log('💡 Make sure you have a content block with blockName "How It Works"');
            return null;
        }

        console.log(`✅ How It Works content block found for ${locale}:`, {
            title: contentBlock.title,
            content: contentBlock.content,
            secondaryContent: contentBlock.secondaryContent,
            blockName: contentBlock.blockName,
            cardsCount: contentBlock.cards?.length
        });

        return contentBlock;
    } catch (error) {
        console.error('❌ Error fetching How It Works content:', error);
        return null;
    }
} 