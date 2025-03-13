import type { Block } from 'payload/types';

export const Navigation: Block = {
    slug: 'navigation',
    labels: {
        singular: 'Navigation',
        plural: 'Navigation Blocks',
    },
    fields: [
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            label: 'Logo',
            required: true,
        },
        {
            name: 'menuItems',
            type: 'array',
            required: true,
            label: 'Menu Items',
            minRows: 1,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Menu Label',
                    localized: true,
                },
                {
                    name: 'link',
                    type: 'text',
                    required: true,
                    label: 'Menu Link',
                    admin: {
                        description: 'Use relative paths (e.g., "/about", "/services")',
                    },
                },
            ],
        },
    ],
}; 