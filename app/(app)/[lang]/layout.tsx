import { Navbar } from '@/app/components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
    params
}: LayoutProps) {
    const { lang } = await params;

    return (
        <html lang={lang}>
            <body className={inter.className}>
                <Navbar />
                {children}
            </body>
        </html>
    )
} 