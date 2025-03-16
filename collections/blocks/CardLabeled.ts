import type { Block } from 'payload/types';

export const CardLabeled: Block = {
    slug: 'card-labeled',
    labels: {
        singular: 'Card Labeled',
        plural: 'Card Labeled Blocks',
    },
    fields: [
        {
            name: 'blockName',
            type: 'text',
            required: false,
            label: 'Block Name',
            admin: {
                description: 'Used to identify this block in code',
            },
        },
        {
            name: 'cards',
            type: 'array',
            label: 'Cards',
            required: false,
            localized: true,
            minRows: 1,
            maxRows: 6,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    localized: true,
                    label: 'Label',
                    admin: {
                        description: 'The label that appears at the top of the card',
                    },
                },
                {
                    name: 'date',
                    type: 'text',
                    required: true,
                    localized: true,
                    label: 'Date',
                    admin: {
                        description: 'The date to display (e.g., "03.05.2025")',
                    },
                },
                {
                    name: 'content',
                    type: 'text',
                    required: true,
                    localized: true,
                    label: 'Content',
                    admin: {
                        description: 'The main text content of the card',
                    },
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: 'Card Image',
                    admin: {
                        description: 'The image to display in the card (4:3 ratio recommended)',
                    },
                },
            ],
        },
    ],
}; 