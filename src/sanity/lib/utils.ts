const serbianTransliteration: Record<string, string> = {
  č: 'c',
  ć: 'c',
  š: 's',
  ž: 'z',
  đ: 'dj', // This is the key change
  Č: 'C',
  Ć: 'C',
  Š: 'S',
  Ž: 'Z',
  Đ: 'Dj',
  // Add any other Serbian characters you need
};

export const customSlugify = (input: string): string => {
  if (!input) return '';

  // First, handle Serbian characters
  let transliterated = input;
  Object.keys(serbianTransliteration).forEach((char) => {
    const regex = new RegExp(char, 'g');
    transliterated = transliterated.replace(
      regex,
      serbianTransliteration[char]
    );
  });

  // Then apply standard slugification
  return transliterated
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};
