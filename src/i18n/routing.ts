import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'sr'],
  localePrefix: 'as-needed',
  defaultLocale: 'en',
});
