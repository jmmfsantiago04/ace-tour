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
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[layout.blockType][equals]=navigation&depth=2&locale=${locale}`,
            {
                next: { revalidate: 0 }, // Disable caching
                cache: 'no-store' // Disable caching
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch navigation');
        }

        const data = await response.json();

        if (!data?.docs?.[0]?.layout) {
            return null;
        }

        const navigationBlock = data.docs[0].layout.find(
            (block: any) => block.blockType === 'navigation'
        ) as NavigationBlock | undefined;

        if (!navigationBlock) {
            return null;
        }

        return {
            logo: navigationBlock.logo,
            menuItems: navigationBlock.menuItems.map(item => ({
                label: item.label,
                link: `/${locale}${item.link}`,
            }))
        };
    } catch (error) {
        return null;
    }
} 