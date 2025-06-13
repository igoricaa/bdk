import {
  PortableText as PortableTextSanity,
  PortableTextBlock,
} from 'next-sanity';
import { cn } from '@/lib/utils';

interface PortableTextCustomProps {
  value: PortableTextBlock[];
  className?: string;
}

const PortableText = ({ value, className }: PortableTextCustomProps) => {
  return (
    <div className={cn(className)}>
      <PortableTextSanity value={value} />
    </div>
  );
};

export default PortableText;
