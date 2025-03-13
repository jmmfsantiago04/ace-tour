import type { Block } from 'payload/types';

export const Content: Block = {
    slug: 'content',
    labels: {
        singular: 'Content',
        plural: 'Content Blocks',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Heading',
        },
        {
            name: 'paragraph',
            type: 'textarea',
            required: true,
            label: 'Paragraph',
        },
    ],
}; 