import { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import { Hero } from '@/app/components/Hero';
import { OurMission } from '@/app/components/OurMission';
import { HowItWorks } from '@/app/components/HowItWorks';
import { notFound } from 'next/navigation';
import { getHeroBlock } from '@/app/actions/getHeroBlock';
import { getOurMission } from '@/app/actions/getOurMission';
import { getHowItWorks } from '@/app/actions/getHowItWorks';

interface Props {
    params: Promise<{ lang: string }>;
}

const validLanguages = ['en', 'ko'];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    if (!validLanguages.includes(lang)) {
        return {
            title: 'Not Found',
        };
    }

    return {
        title: lang === 'ko' ? 'ACE 투어' : 'ACE Tour',
        description: lang === 'ko' ? '당신의 신뢰할 수 있는 여행 파트너' : 'Your trusted travel partner',
    };
}

async function getHomePage(locale: string) {
    noStore();
    console.log('🌐 Fetching home page for locale:', locale);
    try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[slug][equals]=home&depth=2&locale=${locale}&draft=false`;
        console.log('📡 API URL:', url);

        const response = await fetch(url, {
            next: { revalidate: 0 },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch home page: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📥 Raw API Response:', JSON.stringify(data, null, 2));

        if (!data.docs || data.docs.length === 0) {
            console.log('❌ No pages found with slug "home"');
            return null;
        }

        const page = data.docs[0];
        console.log('📄 Page layout blocks:', JSON.stringify(page.layout, null, 2));
        return page;
    } catch (error) {
        console.error('❌ Error fetching home page:', error);
        return null;
    }
}

export default async function HomePage({ params }: Props) {
    noStore();
    const { lang } = await params;

    // Validate language
    if (!validLanguages.includes(lang)) {
        notFound();
    }

    console.log('🏠 Rendering HomePage with language:', lang);

    const [heroBlock, ourMissionBlock, howItWorksBlock] = await Promise.all([
        getHeroBlock(lang as 'en' | 'ko'),
        getOurMission(lang as 'en' | 'ko'),
        getHowItWorks(lang as 'en' | 'ko')
    ]);

    if (!heroBlock) {
        console.log('❌ No hero block found');
        return null;
    }

    // Log the data being passed to Hero component
    console.log(`📦 Hero data for ${lang}:`, {
        title: heroBlock.title,
        subtitle: heroBlock.subtitle,
        highlightedText: heroBlock.highlightedText,
        cta: heroBlock.cta
    });

    return (
        <main className="flex min-h-screen flex-col">
            <Hero
                title={heroBlock.title}
                subtitle={heroBlock.subtitle}
                highlightedText={heroBlock.highlightedText}
                cta={{
                    label: heroBlock.cta.label,
                    link: heroBlock.cta.link
                }}
                lang={lang}
            />
            {ourMissionBlock && (
                <OurMission
                    title={ourMissionBlock.title}
                    content={ourMissionBlock.content}
                    secondaryContent={ourMissionBlock.secondaryContent}
                    cards={ourMissionBlock.cards}
                    lang={lang}
                />
            )}
            {howItWorksBlock && (
                <HowItWorks
                    title={howItWorksBlock.title}
                    content={howItWorksBlock.content}
                    secondaryContent={howItWorksBlock.secondaryContent}
                    cards={howItWorksBlock.cards}
                    lang={lang}
                />
            )}
        </main>
    );
} 