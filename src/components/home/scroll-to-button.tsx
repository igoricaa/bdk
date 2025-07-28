'use client';

import ArrowUpRight from '../ui/arrow-up-right';

const ScrollToButton = () => {
  const scrollToSection = (sectionId: string, duration: number = 1500) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const startPosition = window.pageYOffset;
    const targetPosition = section.offsetTop;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <>
      <p className='text-light-blue text-lg 2xl:text-xl'>Explore</p>
      <button
        onClick={() => scrollToSection('about', 600)}
        className='cursor-pointer'
      >
        <ArrowUpRight className='rotate-135 hover:rotate-135' />
      </button>
    </>
  );
};

export default ScrollToButton;
