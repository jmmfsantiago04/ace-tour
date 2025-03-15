import type { CollectionConfig } from 'payload/types';
import { Content } from './blocks/Content';
import { Navigation } from './blocks/Navigation';
import { Hero } from './blocks/Hero';
import { ContentReview } from './blocks/ContentReview';

const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    versions: {
        drafts: true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            localized: true,
            admin: {
                description: 'Required for default locale (English)',
            },
            validate: (value, { locale }) => {
                if (locale === 'en' && !value) {
                    return 'Title is required for English';
                }
                return true;
            },
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
            localized: true,
            blocks: [
                Navigation,
                Hero,
                Content,
                ContentReview,
            ],
        },
        {
            name: 'meta',
            type: 'group',
            localized: true,
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