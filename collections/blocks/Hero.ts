import type { Block } from 'payload/types';

export const Hero: Block = {
    slug: 'hero',
    labels: {
        singular: 'Hero',
        plural: 'Hero Blocks',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            localized: true,
            admin: {
                description: 'The main heading of the hero section',
            },
        },
        {
            name: 'subtitle',
            type: 'text',
            localized: true,
            admin: {
                description: 'A brief description or tagline',
            },
        },
        {
            name: 'highlightedText',
            type: 'text',
            localized: true,
            admin: {
                description: 'Text to be highlighted (e.g., "Western USA")',
            },
        },
        {
            name: 'cta',
            type: 'group',
            label: 'Call to Action',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    localized: true,
                    admin: {
                        description: 'Text for the CTA button',
                    },
                },
                {
                    name: 'link',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'Link for the CTA button (e.g., "/tours")',
                    },
                },
            ],
        },
    ],
}; 