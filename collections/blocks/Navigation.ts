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
            localized: true,
            admin: {
                description: 'Menu items will be localized based on the selected language',
            },
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Menu Label',
                    localized: true,
                    admin: {
                        description: 'The text that will appear in the menu (will be localized)',
                    },
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