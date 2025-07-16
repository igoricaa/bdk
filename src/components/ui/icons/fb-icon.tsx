import { cn } from '@/src/lib/utils';

const FbIcon = ({
  className,
  pathClassName,
}: {
  className?: string;
  pathClassName?: string;
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='8'
    height='16'
    fill='none'
    viewBox='0 0 8 16'
    className={className}
  >
    <path
      className={cn('transition-colors duration-300', pathClassName)}
      fill='#121D2D'
      d='M5.162 15.61V8.767h2.295L7.802 6.1h-2.64V4.398c0-.772.213-1.298 1.321-1.298h1.412V.713A19 19 0 0 0 5.838.609c-2.036 0-3.43 1.243-3.43 3.525V6.1H.105v2.667h2.303v6.841z'
    ></path>
  </svg>
);

export default FbIcon;
