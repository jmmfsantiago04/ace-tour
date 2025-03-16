import { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';
import { MiceHero } from '@/app/components/MiceHero';
import { MiceCards } from '@/app/components/MiceCards';
import { getMiceHero } from '@/app/actions/getMiceHero';
import { getMiceCards } from '@/app/actions/getMiceCards';

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
        title: lang === 'ko' ? 'MICE 솔루션 | ACE 투어' : 'MICE Solutions | ACE Tour',
        description: lang === 'ko'
            ? 'ACE 투어의 MICE 솔루션으로 귀하의 비즈니스 이벤트를 성공적으로 만들어보세요.'
            : 'Transform your business events with ACE Tour\'s MICE Solutions.',
    };
}

export default async function MiceSolutionsPage({ params }: Props) {
    noStore();
    const { lang } = await params;

    // Validate language
    if (!validLanguages.includes(lang)) {
        notFound();
    }

    console.log('🏢 Rendering MICE Solutions Page with language:', lang);

    // Fetch both blocks in parallel
    const [miceHeroBlock, miceCardsBlock] = await Promise.all([
        getMiceHero(lang as 'en' | 'ko'),
        getMiceCards(lang as 'en' | 'ko')
    ]);

    // Log the blocks data for debugging
    if (miceHeroBlock) {
        console.log('📄 MICE Hero Block data:', {
            title: miceHeroBlock.title,
            content: miceHeroBlock.content,
            hasSecondaryContent: Boolean(miceHeroBlock.secondaryContent),
            hasCards: Boolean(miceHeroBlock.cards?.length),
            hasButtons: Boolean(miceHeroBlock.buttons?.length)
        });
    }

    if (miceCardsBlock) {
        console.log('🎴 MICE Cards Block data:', {
            blockName: miceCardsBlock.blockName,
            cardsCount: miceCardsBlock.cards?.length
        });
    }

    return (
        <main className="flex min-h-screen flex-col">
            {miceHeroBlock && (
                <MiceHero
                    title={miceHeroBlock.title}
                    content={miceHeroBlock.content}
                    secondaryContent={miceHeroBlock.secondaryContent}
                    cards={miceHeroBlock.cards}
                    buttons={miceHeroBlock.buttons}
                    lang={lang}
                />
            )}
            {miceCardsBlock && (
                <MiceCards
                    cards={miceCardsBlock.cards}
                />
            )}
        </main>
    );
} 