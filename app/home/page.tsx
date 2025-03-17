import { redirect } from 'next/navigation';

export default function HomePage() {
    redirect('/en'); // Redirecting to English version by default
} 