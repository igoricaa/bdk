import { PRACTICE_QUERYResult, INDUSTRY_QUERYResult } from '@/sanity.types';

/**
 * Union type for service data that can be either a practice or industry
 */
export type ServiceData = NonNullable<PRACTICE_QUERYResult['currentPractice']> | NonNullable<INDUSTRY_QUERYResult['currentIndustry']>; 