import { cn } from '@/src/lib/utils';

interface IndustriesIconProps {
  className?: string;
}

const IndustriesIcon = ({ className }: IndustriesIconProps) => (
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
      d='m8.619 17.438 8-8h-16z'
    ></path>
    <path
      stroke='#5DA7E5'
      strokeLinejoin='round'
      d='m16.619 9.438-8-8v16z'
    ></path>
  </svg>
);

export default IndustriesIcon;
