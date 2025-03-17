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

export async function getHomeEnd(locale: 'en' | 'ko' = 'en'): Promise<ContentBlock | null> {
    noStore();
    console.log('🏁 Fetching Home End content for locale:', locale);

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
            throw new Error(`Failed to fetch Home End content: ${response.status} ${response.statusText}`);
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

        // Find the content block with blockName "Home End" (case insensitive)
        const contentBlock = data.docs[0].layout.find(
            (block: any) => {
                const isContent = block.blockType === 'content';
                const hasMatchingName = block.blockName?.toLowerCase() === 'home end';
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
            console.log('❌ No Home End content block found in layout');
            console.log('💡 Make sure you have a content block with blockName "Home End"');
            return null;
        }

        console.log(`✅ Home End content block found for ${locale}:`, {
            title: contentBlock.title,
            content: contentBlock.content,
            secondaryContent: contentBlock.secondaryContent,
            blockName: contentBlock.blockName,
            cardsCount: contentBlock.cards?.length,
            buttonsCount: contentBlock.buttons?.length
        });

        return contentBlock;
    } catch (error) {
        console.error('❌ Error fetching Home End content:', error);
        return null;
    }
} 