'use client';

import { useLocale } from 'next-intl';
import { TransitionLink } from '../transition-link';

type Translation = {
  i18n_lang: 'en' | 'sr';
  slug: string;
};

interface LanguageSwitcherProps {
  translations: Translation[];
}

export default function LanguageSwitcher({
  translations,
}: LanguageSwitcherProps) {
  const currentLocale = useLocale();

  return (
    <div style={{ marginBottom: '2rem' }}>
      {translations.map((translation) => {
        const { i18n_lang, slug } = translation;

        // Don't show a link for the current language
        if (i18n_lang === currentLocale) {
          return null;
        }

        return (
          <TransitionLink
            key={i18n_lang}
            href={`/${slug}`}
            locale={i18n_lang}
            style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
          >
            {i18n_lang}
          </TransitionLink>
        );
      })}
    </div>
  );
}
