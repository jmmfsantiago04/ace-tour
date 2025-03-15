import type { Block } from 'payload/types';

export const ContentReview: Block = {
    slug: 'content-review',
    labels: {
        singular: 'Content Review',
        plural: 'Content Review Blocks',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            localized: true,
            label: 'Section Title',
            admin: {
                description: 'The main title of the reviews section',
            },
        },
        {
            name: 'description',
            type: 'text',
            required: false,
            localized: true,
            label: 'Section Description',
            admin: {
                description: 'A brief description of the reviews section (optional)',
            },
        },
        {
            name: 'reviews',
            type: 'array',
            label: 'Review Cards',
            localized: true,
            fields: [
                {
                    name: 'reviewerInitial',
                    type: 'text',
                    required: true,
                    label: 'Reviewer Initial',
                    admin: {
                        description: 'The first letter/initial of the reviewer (e.g., K)',
                    },
                },
                {
                    name: 'reviewerName',
                    type: 'text',
                    required: true,
                    label: 'Reviewer Name',
                    admin: {
                        description: 'The name of the reviewer (e.g., Kim*mi)',
                    },
                },
                {
                    name: 'reviewText',
                    type: 'textarea',
                    required: true,
                    localized: true,
                    label: 'Review Text',
                    admin: {
                        description: 'The main review content (in Korean)',
                    },
                },
                {
                    name: 'readMoreLink',
                    type: 'text',
                    required: false,
                    label: 'Read More Link',
                    admin: {
                        description: 'Link for the Read More button',
                    },
                },
            ],
        },
        {
            name: 'buttons',
            type: 'array',
            label: 'Action Buttons',
            localized: true,
            admin: {
                description: 'Add one or more call-to-action buttons',
            },
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    localized: true,
                    label: 'Button Label',
                    admin: {
                        description: 'Text for the button',
                    },
                },
                {
                    name: 'link',
                    type: 'text',
                    required: true,
                    label: 'Button Link',
                    admin: {
                        description: 'Link for the button (e.g., "/contact")',
                    },
                },
            ],
        },
    ],
}; 