import type { CollectionConfig } from 'payload/types';
import { Content } from './blocks/Content';
import { Navigation } from './blocks/Navigation';

const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'The URL-friendly slug for this page (e.g., "about-us")',
            },
        },
        {
            name: 'layout',
            type: 'blocks',
            required: true,
            minRows: 1,
            blocks: [
                Navigation,
                Content,
            ],
        },
        {
            name: 'meta',
            type: 'group',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    label: 'Meta Title',
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: 'Meta Description',
                },
                {
                    name: 'keywords',
                    type: 'text',
                    label: 'Meta Keywords',
                },
            ],
        },
    ],
};

export default Pages; 