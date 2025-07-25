import { BASE_URL, PER_PAGE } from '../constants';
import type { WordPressDataType, WordPressDataTypeResponses } from '../types';

const username = process.env.WP_USERNAME;
const password = process.env.WP_APP_PASSWORD;

export async function wpDataTypeFetch<T extends WordPressDataType>(
  type: T,
  page: number
): Promise<WordPressDataTypeResponses[T]> {

  const wpApiUrl = new URL(`${BASE_URL}/${type}`);
  wpApiUrl.searchParams.set('page', page.toString());
  wpApiUrl.searchParams.set('per_page', PER_PAGE.toString());

  if (type === 'posts') {
    wpApiUrl.searchParams.set('after', '2025-01-01T00:00:00');
    wpApiUrl.searchParams.set('before', '2025-07-23T23:59:59');
    // wpApiUrl.searchParams.set('categories', '8');
    wpApiUrl.searchParams.set('lang', 'en');
  }

  if (type === 'categories') {
    wpApiUrl.searchParams.set('lang', 'en');
  }

  const headers = new Headers();
  if (type === 'users') {
    wpApiUrl.searchParams.set('roles', 'author');

    headers.set(
      'Authorization',
      'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    );
  }

  return fetch(wpApiUrl, { headers }).then((res) =>
    res.ok ? res.json() : null
  );
}
