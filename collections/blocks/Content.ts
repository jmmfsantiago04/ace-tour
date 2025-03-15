import type { Block } from 'payload/types';

export const Content: Block = {
    slug: 'content',
    labels: {
        singular: 'Content',
        plural: 'Content Blocks',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: false,
            localized: true,
            label: 'Title',
            admin: {
                description: 'The main title of the content section',
            },
        },
        {
            name: 'content',
            type: 'text',
            required: false,
            localized: true,
            label: 'Content',
            admin: {
                description: 'The main content text',
            },
        },
        {
            name: 'secondaryContent',
            type: 'text',
            required: false,
            localized: true,
            label: 'Secondary Content',
            admin: {
                description: 'Additional content text (optional)',
            },
        },
        {
            name: 'cards',
            type: 'array',
            label: 'Cards',
            localized: true,
            required: false,
            fields: [
                {
                    name: 'cardTitle',
                    type: 'text',
                    required: false,
                    localized: true,
                    label: 'Card Title',
                    admin: {
                        description: 'The title of the card',
                    },
                },
                {
                    name: 'cardContent',
                    type: 'text',
                    required: false,
                    localized: true,
                    label: 'Card Content',
                    admin: {
                        description: 'The content of the card',
                    },
                },
            ],
        },
        {
            name: 'buttons',
            type: 'array',
            label: 'Action Buttons',
            localized: true,
            required: false,
            admin: {
                description: 'Add one or more call-to-action buttons',
            },
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: false,
                    localized: true,
                    label: 'Button Label',
                    admin: {
                        description: 'Text for the button',
                    },
                },
                {
                    name: 'link',
                    type: 'text',
                    required: false,
                    label: 'Button Link',
                    admin: {
                        description: 'Link for the button (e.g., "/contact")',
                    },
                },
            ],
        },
    ],
}; 