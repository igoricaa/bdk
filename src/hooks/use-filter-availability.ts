import { useQuery } from '@tanstack/react-query';
import { getCategoriesByYear, getYearsByCategory } from '@/src/sanity/lib/cached-queries';

/**
 * Hook to get available categories for selected year
 * Returns category slugs that have posts in the given year
 */
export function useAvailableCategoriesForYear(year: string) {
  return useQuery({
    queryKey: ['categories-by-year', year],
    queryFn: () => getCategoriesByYear(year),
    enabled: year !== 'all',
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    select: (data) => data.map((cat: any) => cat.slug.current), // Extract just the slugs
  });
}

/**
 * Hook to get available years for selected category  
 * Returns years that have posts in the given category
 */
export function useAvailableYearsForCategory(categorySlug: string) {
  return useQuery({
    queryKey: ['years-by-category', categorySlug],
    queryFn: () => getYearsByCategory(categorySlug),
    enabled: categorySlug !== 'all',
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    select: (data) => {
      // Extract years from date strings (e.g., "2023-01-15" -> "2023")
      const years = data.map(dateString => new Date(dateString).getFullYear().toString());
      return [...new Set(years)]; // Remove duplicates
    },
  });
}