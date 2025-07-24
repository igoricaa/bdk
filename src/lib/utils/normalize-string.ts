
export const normalizeString = (str: string) => {
  if (!str) return '';
  return (
    str
      .toLowerCase()
      .replace(/đ/g, 'dj')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  );
};
