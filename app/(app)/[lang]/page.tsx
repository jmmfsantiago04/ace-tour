import { Metadata } from 'next';

interface Props {
    params: Promise<{
        lang: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: lang === 'ko' ? 'ACE 투어' : 'ACE Tour',
        description: lang === 'ko' ? '당신의 신뢰할 수 있는 여행 파트너' : 'Your trusted travel partner',
    };
}

export default async function HomePage({ params }: Props) {
    const { lang } = await params;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                <h1 className="text-4xl font-bold text-center mb-8">
                    {lang === 'ko' ? '환영합니다' : 'Welcome'}
                </h1>
                <p className="text-center text-xl">
                    {lang === 'ko'
                        ? '최고의 여행 경험을 제공하는 ACE 투어입니다.'
                        : 'Experience the best travel with ACE Tour.'
                    }
                </p>
            </div>
        </main>
    );
} 