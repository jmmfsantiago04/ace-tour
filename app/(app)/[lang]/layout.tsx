export async function generateStaticParams() {
    // Match the locales from your Payload config
    return [{ lang: 'en' }, { lang: 'ko' }]
}

export default async function RootLayout({
    children,
    params: { lang }
}: {
    children: React.ReactNode
    params: { lang: string }
}) {
    return (
        <html lang={lang}>
            <body>{children}</body>
        </html>
    )
} 