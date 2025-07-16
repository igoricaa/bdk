import { cn } from '@/src/lib/utils';

const Burger = ({
  onClickHandler,
  isOpen,
}: {
  onClickHandler: () => void;
  isOpen: boolean;
}) => {
  return (
    <div
      className={cn(
        'bg-light-blue-bg rounded-[5px] flex flex-col items-center justify-center gap-1 min-w-10 w-10 min-h-9 h-9 xl:hidden cursor-pointer z-110 p-2.5 transition-all duration-300',
        isOpen && 'bg-light-blue-bg/10 rounded-full min-w-9 w-9 p-2'
      )}
      onClick={onClickHandler}
    >
      <Bar className={cn(isOpen ? 'rotate-45 translate-y-[6px] ' : '')} />
      <Bar className={cn('w-4 ml-auto', isOpen ? 'scale-0' : 'scale-100')} />
      <Bar className={cn(isOpen ? '-rotate-45 -translate-y-[6px]' : '')} />
    </div>
  );
};

export default Burger;

const Bar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'w-full min-h-[2px] h-[2px] bg-light-blue transition-all duration-300 origin-center',
        className
      )}
    />
  );
};
