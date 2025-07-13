export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-04-13';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);

// export const recaptchaSiteKey = assertValue(
//   process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
//   'Missing environment variable: RECAPTCHA_SITE_KEY'
// );

export const token = process.env.SANITY_TOKEN;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
