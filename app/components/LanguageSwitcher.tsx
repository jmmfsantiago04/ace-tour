'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LanguageSwitcher() {
    const pathname = usePathname();
    const lang = pathname.split('/')[1] as 'en' | 'ko';
    const currentPath = pathname.split('/').slice(2).join('/');

    return (
        <div className="ml-6 flex items-center space-x-4">
            <Link
                href={`/en/${currentPath}`}
                className={`text-sm ${lang === 'en' ? 'font-bold' : ''}`}
                prefetch={false}
            >
                EN
            </Link>
            <span>|</span>
            <Link
                href={`/ko/${currentPath}`}
                className={`text-sm ${lang === 'ko' ? 'font-bold' : ''}`}
                prefetch={false}
            >
                KO
            </Link>
        </div>
    );
} 