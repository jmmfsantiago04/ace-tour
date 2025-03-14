import { unstable_noStore as noStore } from 'next/cache';

interface MenuItem {
    label: string;
    link: string;
}

interface NavigationBlock {
    blockType: 'navigation';
    logo: {
        url: string;
        alt: string;
    };
    menuItems: MenuItem[];
}

export async function getNavigation(locale: 'en' | 'ko' = 'en') {
    noStore(); // Disable caching for this function
    try {
        console.log('🌐 Fetching navigation for locale:', locale);

        // Fetch the navigation data for the requested locale
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[layout.blockType][equals]=navigation&depth=2&locale=${locale}&draft=false`,
            {
                next: { revalidate: 0 }, // Disable caching
                cache: 'no-store', // Disable caching
                headers: {
                    'Accept-Language': locale
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch navigation');
        }

        const data = await response.json();
        console.log('📥 Raw API Response:', JSON.stringify(data, null, 2));

        if (!data?.docs?.[0]?.layout) {
            console.log('❌ No layout found in API response');
            return null;
        }

        const navigationBlock = data.docs[0].layout.find(
            (block: any) => block.blockType === 'navigation'
        ) as NavigationBlock | undefined;

        if (!navigationBlock) {
            console.log('❌ No navigation block found in layout');
            return null;
        }

        console.log('📋 Raw Menu Items:', JSON.stringify(navigationBlock.menuItems, null, 2));

        const processedNavigation = {
            logo: navigationBlock.logo,
            menuItems: navigationBlock.menuItems.map(item => ({
                label: item.label,
                link: `/${locale}${item.link}`,
            }))
        };

        console.log('🏁 Final Processed Navigation:', JSON.stringify(processedNavigation, null, 2));
        return processedNavigation;
    } catch (error) {
        console.error('❌ Error fetching navigation:', error);
        return null;
    }
} 