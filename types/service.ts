import { FOREIGN_DESK_QUERYResult, SERVICE_QUERYResult } from '@/sanity.types';

/**
 * Union type for service data that can be either a practice or industry
 */
export type ServiceData =
  | NonNullable<SERVICE_QUERYResult['currentService']>
  | NonNullable<FOREIGN_DESK_QUERYResult['currentForeignDesk']>;
