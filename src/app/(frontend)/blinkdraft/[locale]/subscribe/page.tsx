import { BLINKDRAFT_SUBSCRIPTION_FORM_QUERYResult } from '@/sanity.types';
import LanguageSwitcher from '@/src/components/blinkdraft/language-switcher';
import SubscribeForm from '@/src/components/blinkdraft/subscribe-form';
import { routing } from '@/src/i18n/routing';
import { getBlinkdraftSubscriptionFormData } from '@/src/sanity/lib/cached-queries';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SubscribePage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  if (locale !== 'en' && locale !== 'sr') {
    notFound();
  }

  setRequestLocale(locale);

  const { subscriptionForm } = await getBlinkdraftSubscriptionFormData(locale);

  if (!subscriptionForm) {
    notFound();
  }

  return (
    <main className='pt-header bg-light-blue-bg'>
      <LanguageSwitcher
        locale={locale}
        href={`/subscribe`}
        pageName='Subscribe to Blinkdraft'
        className='absolute top-4 sm:top-6 lg:top-18 2xl:top-35 left-[var(--padding-side)]'
      />
      <div className='py-25'>
        <h1 className='text-dark-blue text-center text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl md:max-lg:px-side'>
          {subscriptionForm.title}
        </h1>

        <SubscribeForm
          formData={
            subscriptionForm as BLINKDRAFT_SUBSCRIPTION_FORM_QUERYResult['subscriptionForm']
          }
          className='mt-15 md:mt-12 2xl:mt-18 xl:max-w-4xl 2xl:max-w-6xl mx-auto'
        />
      </div>
    </main>
  );
};

export default SubscribePage;
