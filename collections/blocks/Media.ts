import type { Block } from 'payload/types';

export const Media: Block = {
    slug: 'media',
    labels: {
        singular: 'Media',
        plural: 'Media Blocks',
    },
    fields: [
        {
            name: 'mediaType',
            type: 'select',
            required: true,
            options: [
                {
                    label: 'Single Image',
                    value: 'image',
                },
                {
                    label: 'Image Gallery',
                    value: 'gallery',
                },
                {
                    label: 'Video',
                    value: 'video',
                },
            ],
            defaultValue: 'image',
            admin: {
                description: 'Select the type of media to display',
            },
        },
        {
            name: 'media',
            type: 'upload',
            required: true,
            relationTo: 'media',
            label: 'Media',
            admin: {
                description: 'Upload or select media',
            },
        },
        {
            name: 'gallery',
            type: 'array',
            label: 'Gallery Images',
            required: false,
            admin: {
                condition: (data) => data.mediaType === 'gallery',
                description: 'Add multiple images for the gallery',
            },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: 'Image',
                },
            ],
        },
        {
            name: 'caption',
            type: 'text',
            required: false,
            localized: true,
            label: 'Caption',
            admin: {
                description: 'Add a caption to describe the media',
            },
        },
        {
            name: 'layout',
            type: 'select',
            required: false,
            options: [
                {
                    label: 'Full Width',
                    value: 'fullWidth',
                },
                {
                    label: 'Contained',
                    value: 'contained',
                },
                {
                    label: 'Float Left',
                    value: 'floatLeft',
                },
                {
                    label: 'Float Right',
                    value: 'floatRight',
                },
            ],
            defaultValue: 'contained',
            admin: {
                description: 'Choose how the media should be displayed',
            },
        },
        {
            name: 'aspectRatio',
            type: 'select',
            required: false,
            options: [
                {
                    label: 'Original',
                    value: 'original',
                },
                {
                    label: '16:9',
                    value: '16:9',
                },
                {
                    label: '4:3',
                    value: '4:3',
                },
                {
                    label: '1:1',
                    value: '1:1',
                },
            ],
            defaultValue: 'original',
            admin: {
                description: 'Select the aspect ratio for the media',
            },
        },
    ],
}; 