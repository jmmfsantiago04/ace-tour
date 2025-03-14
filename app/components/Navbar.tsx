import Image from 'next/image';
import Link from 'next/link';
import { getNavigation } from '../actions/getNavigation';
import { headers } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
    lang: string;
}

export async function Navbar({ lang }: NavbarProps) {
    noStore(); // Disable caching for this component

    console.log('Current Language:', lang);

    if (!process.env.NEXT_PUBLIC_SERVER_URL) {
        console.error('NEXT_PUBLIC_SERVER_URL is not defined');
        return (
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0">
                            <span className="text-xl font-bold">ACE Tour</span>
                        </div>
                        <LanguageSwitcher />
                    </div>
                </div>
            </nav>
        );
    }

    const navigation = await getNavigation(lang as 'en' | 'ko');
    console.log('Navigation Data in Navbar:', JSON.stringify(navigation, null, 2));

    if (!navigation?.logo || !navigation?.menuItems) {
        console.log('No navigation data available');
        return (
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0">
                            <span className="text-xl font-bold">ACE Tour</span>
                        </div>
                        <LanguageSwitcher />
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href={`/${lang}`} prefetch={false}>
                            <Image
                                src={navigation.logo.url}
                                alt={navigation.logo.alt || 'Logo'}
                                width={150}
                                height={40}
                                className="h-10 w-auto"
                                priority
                            />
                        </Link>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="hidden sm:flex sm:space-x-8">
                            {navigation.menuItems.map((item, index) => (
                                <Link
                                    key={`${item.link}-${index}`}
                                    href={item.link}
                                    prefetch={false}
                                    className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <LanguageSwitcher />
                        {/* Mobile menu button */}
                        <div className="sm:hidden ml-4">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            <div className="sm:hidden hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.menuItems.map((item, index) => {
                        if (!item.label) {
                            console.log(`Missing label for mobile menu item ${index}:`, item);
                            return null;
                        }
                        return (
                            <Link
                                key={`${item.link}-${index}-mobile`}
                                href={item.link}
                                className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium"
                            >
                                {item.label || `Menu Item ${index + 1}`}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
} 