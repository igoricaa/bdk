import { cn } from '@/lib/utils';

interface ServicesIconProps {
  className?: string;
}

const ServicesIcon = ({ className }: ServicesIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='14'
    height='18'
    fill='none'
    viewBox='0 0 14 18'
    className={cn(className)}
  >
    <path
      stroke='#5DA7E5'
      strokeLinejoin='round'
      d='m8.619 8.75-8-8v16z'
    ></path>
    <path
      stroke='#5DA7E5'
      strokeLinejoin='round'
      d='m12.619 8.75-8-8v16z'
    ></path>
  </svg>
);

export default ServicesIcon;
