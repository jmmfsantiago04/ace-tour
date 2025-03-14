import { Navbar } from '@/app/components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
    // Match the locales from your Payload config
    return [{ lang: 'en' }, { lang: 'ko' }]
}

interface LayoutProps {
    children: React.ReactNode;
    params: { lang: string };
}

export default function LocaleLayout({
    children,
    params,
}: LayoutProps) {
    const { lang } = params;
    console.log('Layout Language:', lang);

    return (
        <html lang={lang}>
            <body className={inter.className}>
                <Navbar lang={lang} />
                {children}
            </body>
        </html>
    )
} 