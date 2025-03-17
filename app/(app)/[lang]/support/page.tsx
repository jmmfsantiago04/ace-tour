import { FAQ } from '../../../components/FAQ';
import { getFAQ } from '../../../actions/getFAQ';

interface Props {
    params: {
        lang: 'en' | 'ko';
    };
}

export default async function SupportPage({ params: { lang } }: Props) {
    const faqData = await getFAQ(lang);

    if (!faqData) {
        return (
            <main className="min-h-screen bg-white">
                <div className="pt-16 text-center">
                    <p>Failed to load FAQ data.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <div className="pt-16">
                <FAQ {...faqData} lang={lang} />
            </div>
        </main>
    );
} 