import { Navbar } from '@/app/components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export async function generateStaticParams() {
    // Match the locales from your Payload config
    return [{ lang: 'en' }, { lang: 'ko' }]
}

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}

export default async function LocaleLayout({
    children,
    params,
}: LayoutProps) {
    const { lang } = await params;
    console.log('Layout Language:', lang);

    return (
        <html lang={lang} className={inter.variable}>
            <body className="font-sans">
                <Navbar lang={lang} />
                {children}
            </body>
        </html>
    )
} 