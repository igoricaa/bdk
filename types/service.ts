import {
  PRACTICE_QUERYResult,
  INDUSTRY_QUERYResult,
  FOREIGN_DESK_QUERYResult,
} from '@/sanity.types';

/**
 * Union type for service data that can be either a practice or industry
 */
export type ServiceData =
  | NonNullable<PRACTICE_QUERYResult['currentPractice']>
  | NonNullable<INDUSTRY_QUERYResult['currentIndustry']>
  | NonNullable<FOREIGN_DESK_QUERYResult['currentForeignDesk']>;
