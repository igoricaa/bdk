import { useMemo } from 'react';
import { ComputedLawyersData } from '../utils';

const displayedLawyers = (
  activeCategory: string,
  searchTerm: string,
  computedLawyersData: ComputedLawyersData
) => {
  return useMemo(() => {
    const categoryFilteredLawyers =
      activeCategory === 'all'
        ? computedLawyersData.allLawyers
        : computedLawyersData.lawyersByCategory[activeCategory] || [];

    if (!searchTerm || searchTerm.trim() === '') {
      return categoryFilteredLawyers;
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return categoryFilteredLawyers.filter((lawyer) =>
      lawyer.name.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [activeCategory, searchTerm, computedLawyersData]);
};
