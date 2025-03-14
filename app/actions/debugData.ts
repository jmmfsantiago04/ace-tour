'use server';

import { unstable_noStore as noStore } from 'next/cache';

export async function debugData(locale: string) {
    noStore();
    console.log('🔍 Debugging data for locale:', locale);

    try {
        // 1. First check all pages
        const pagesUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages`;
        console.log('📡 Checking all pages URL:', pagesUrl);

        const pagesResponse = await fetch(pagesUrl, {
            next: { revalidate: 0 },
            cache: 'no-store',
        });

        if (!pagesResponse.ok) {
            throw new Error(`Failed to fetch pages: ${pagesResponse.status} ${pagesResponse.statusText}`);
        }

        const pagesData = await pagesResponse.json();
        console.log('📑 All Pages:', JSON.stringify(pagesData, null, 2));

        // 2. Check specific home page with locale
        const homeUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[slug][equals]=home&locale=${locale}`;
        console.log('📡 Checking home page URL:', homeUrl);

        const homeResponse = await fetch(homeUrl, {
            next: { revalidate: 0 },
            cache: 'no-store',
            headers: {
                'Accept-Language': locale
            }
        });

        if (!homeResponse.ok) {
            throw new Error(`Failed to fetch home page: ${homeResponse.status} ${homeResponse.statusText}`);
        }

        const homeData = await homeResponse.json();
        console.log('🏠 Home Page Data:', JSON.stringify(homeData, null, 2));

        return {
            allPages: pagesData,
            homePage: homeData
        };
    } catch (error) {
        console.error('❌ Error in debug data:', error);
        return null;
    }
} 