/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    media: Media;
    pages: Page;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  globalsSelect: {};
  locale: 'en' | 'ko';
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  _key?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  /**
   * Required for default locale (English)
   */
  title: string;
  /**
   * The URL-friendly slug for this page (e.g., "about-us")
   */
  slug: string;
  layout: (
    | {
        logo: number | Media;
        /**
         * Menu items will be localized based on the selected language
         */
        menuItems: {
          /**
           * The text that will appear in the menu (will be localized)
           */
          label: string;
          /**
           * Use relative paths (e.g., "/about", "/services")
           */
          link: string;
          id?: string | null;
        }[];
        id?: string | null;
        blockName?: string | null;
        blockType: 'navigation';
      }
    | {
        /**
         * The main heading of the hero section
         */
        title: string;
        /**
         * A brief description or tagline
         */
        subtitle?: string | null;
        /**
         * Text to be highlighted (e.g., "Western USA")
         */
        highlightedText?: string | null;
        cta: {
          /**
           * Text for the CTA button
           */
          label: string;
          /**
           * Link for the CTA button (e.g., "/tours")
           */
          link: string;
        };
        id?: string | null;
        blockName?: string | null;
        blockType: 'hero';
      }
    | {
        /**
         * The main title of the content section
         */
        title?: string | null;
        /**
         * The main content text
         */
        content?: string | null;
        /**
         * Additional content text (optional)
         */
        secondaryContent?: string | null;
        cards?:
          | {
              /**
               * The title of the card
               */
              cardTitle?: string | null;
              /**
               * The content of the card
               */
              cardContent?: string | null;
              id?: string | null;
            }[]
          | null;
        /**
         * Add one or more call-to-action buttons
         */
        buttons?:
          | {
              /**
               * Text for the button
               */
              label?: string | null;
              /**
               * Link for the button (e.g., "/contact")
               */
              link?: string | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'content';
      }
    | {
        /**
         * The main title of the reviews section
         */
        title?: string | null;
        /**
         * A brief description of the reviews section (optional)
         */
        description?: string | null;
        reviews?:
          | {
              /**
               * The first letter/initial of the reviewer (e.g., K)
               */
              reviewerInitial?: string | null;
              /**
               * The name of the reviewer (e.g., Kim*mi)
               */
              reviewerName?: string | null;
              /**
               * The main review content (in Korean)
               */
              reviewText?: string | null;
              /**
               * Link for the Read More button
               */
              readMoreLink?: string | null;
              id?: string | null;
            }[]
          | null;
        /**
         * Add one or more call-to-action buttons
         */
        buttons?:
          | {
              /**
               * Text for the button
               */
              label?: string | null;
              /**
               * Link for the button (e.g., "/contact")
               */
              link?: string | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'content-review';
      }
    | {
        blockName?: string | null;
        cards?:
          | {
              /**
               * The label that appears at the top of the card
               */
              label: string;
              /**
               * The date to display (e.g., "03.05.2025")
               */
              date: string;
              /**
               * The main text content of the card
               */
              content: string;
              /**
               * The image to display in the card (4:3 ratio recommended)
               */
              image: number | Media;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockType: 'card-labeled';
      }
    | {
        /**
         * The main title of the content section
         */
        title: string;
        /**
         * The main content text
         */
        content?: string | null;
        /**
         * Additional content text (optional)
         */
        secondaryContent?: string | null;
        cards?:
          | {
              /**
               * The title of the card
               */
              cardTitle?: string | null;
              /**
               * The content of the card
               */
              cardContent?: string | null;
              id?: string | null;
            }[]
          | null;
        /**
         * Add one or more call-to-action buttons
         */
        buttons?:
          | {
              /**
               * Text for the button
               */
              label?: string | null;
              /**
               * Link for the button (e.g., "/contact")
               */
              link?: string | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'basic-content';
      }
  )[];
  meta?: {
    title?: string | null;
    description?: string | null;
    keywords?: string | null;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  _key?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  layout?:
    | T
    | {
        navigation?:
          | T
          | {
              logo?: T;
              menuItems?:
                | T
                | {
                    label?: T;
                    link?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        hero?:
          | T
          | {
              title?: T;
              subtitle?: T;
              highlightedText?: T;
              cta?:
                | T
                | {
                    label?: T;
                    link?: T;
                  };
              id?: T;
              blockName?: T;
            };
        content?:
          | T
          | {
              title?: T;
              content?: T;
              secondaryContent?: T;
              cards?:
                | T
                | {
                    cardTitle?: T;
                    cardContent?: T;
                    id?: T;
                  };
              buttons?:
                | T
                | {
                    label?: T;
                    link?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        'content-review'?:
          | T
          | {
              title?: T;
              description?: T;
              reviews?:
                | T
                | {
                    reviewerInitial?: T;
                    reviewerName?: T;
                    reviewText?: T;
                    readMoreLink?: T;
                    id?: T;
                  };
              buttons?:
                | T
                | {
                    label?: T;
                    link?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        'card-labeled'?:
          | T
          | {
              blockName?: T;
              cards?:
                | T
                | {
                    label?: T;
                    date?: T;
                    content?: T;
                    image?: T;
                    id?: T;
                  };
              id?: T;
            };
        'basic-content'?:
          | T
          | {
              title?: T;
              content?: T;
              secondaryContent?: T;
              cards?:
                | T
                | {
                    cardTitle?: T;
                    cardContent?: T;
                    id?: T;
                  };
              buttons?:
                | T
                | {
                    label?: T;
                    link?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
      };
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        keywords?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}