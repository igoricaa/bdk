const Burger = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <div
      className='bg-lightest-blue rounded-[5px] flex flex-col items-center justify-center gap-1 min-w-10 w-10 min-h-9 h-9 xl:hidden cursor-pointer z-110'
      onClick={onClickHandler}
    >
      <div className='w-5 h-[1.5px] bg-light-blue'></div>
      <div className='w-5 h-[1.5px] bg-light-blue'></div>
      <div className='w-5 h-[1.5px] bg-light-blue'></div>
    </div>
  );
};

export default Burger;
