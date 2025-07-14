import { cn } from '@/src/lib/utils';

interface ForeignDesksIconProps {
  className?: string;
}

const ForeignDesksIcon = ({ className }: ForeignDesksIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='18'
    height='18'
    fill='none'
    viewBox='0 0 18 18'
    className={cn(className)}
  >
    <path
      stroke='#5DA7E5'
      strokeLinejoin='round'
      d='m8.619 5.313-8 8h16z'
    ></path>
    <path
      stroke='#5DA7E5'
      strokeLinejoin='round'
      d='m16.619 9.313-8-8v16z'
    ></path>
  </svg>
);

export default ForeignDesksIcon;
