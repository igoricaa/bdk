import { useCallback, useLayoutEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { easeOut } from 'motion/react';

export const useAccordionScroll = () => {
  const lenis = useLenis();
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map());

  const setTriggerRef = useCallback(
    (value: string, element: HTMLElement | null) => {
      if (element) {
        triggerRefs.current.set(value, element);
      } else {
        triggerRefs.current.delete(value);
      }
    },
    []
  );

  const handleValueChange = useCallback(
    (value: string | undefined) => {
      if (!value || !lenis) return;

      const triggerElement = triggerRefs.current.get(value);
      if (!triggerElement) return;

      // Delay to let the accordion opening animation complete
      requestAnimationFrame(() => {
        setTimeout(() => {
          const elementRect = triggerElement.getBoundingClientRect();
          const offsetTop = window.pageYOffset + elementRect.top - 85;

          lenis.scrollTo(offsetTop, {
            duration: 0.3,
            easing: easeOut,
          });
        }, 550);
      });
    },
    [lenis]
  );

  return {
    setTriggerRef,
    handleValueChange,
  };
};

export const useAccordionZeroLayoutShift = () => {
  const lenis = useLenis();
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map());
  const observerRef = useRef<ResizeObserver | null>(null);
  const baseScrollPosition = useRef<number>(0);
  const isCompensating = useRef<boolean>(false);

  useLayoutEffect(() => {
    // Set up ResizeObserver to detect accordion height changes
    observerRef.current = new ResizeObserver((entries) => {
      if (!isCompensating.current) return;

      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        const accordionItem = element.closest('[data-slot="accordion-item"]');

        if (accordionItem) {
          // Calculate height change
          const currentHeight = entry.contentRect.height;
          const previousHeight = entry.target.getAttribute(
            'data-previous-height'
          );

          if (previousHeight) {
            const heightDiff = currentHeight - parseFloat(previousHeight);

            if (Math.abs(heightDiff) > 5 && lenis) {
              // Compensate scroll position to prevent jump
              const currentScroll = window.pageYOffset;
              const triggerRect = accordionItem.getBoundingClientRect();
              const triggerTop = currentScroll + triggerRect.top;

              // Only compensate if accordion is above current scroll position
              if (triggerTop < currentScroll) {
                lenis.scrollTo(currentScroll + heightDiff, { immediate: true });
              }
            }
          }

          entry.target.setAttribute(
            'data-previous-height',
            currentHeight.toString()
          );
        }
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lenis]);

  const setTriggerRef = useCallback(
    (value: string, element: HTMLElement | null) => {
      if (element) {
        triggerRefs.current.set(value, element);

        // Observe the accordion item for size changes
        const accordionItem = element.closest('[data-slot="accordion-item"]');
        if (accordionItem && observerRef.current) {
          observerRef.current.observe(accordionItem);
          accordionItem.setAttribute(
            'data-previous-height',
            accordionItem.getBoundingClientRect().height.toString()
          );
        }
      } else {
        triggerRefs.current.delete(value);

        // When element is null, we can't get the accordion item to unobserve
        // The observer will be cleaned up when the component unmounts
      }
    },
    []
  );

  const handleValueChange = useCallback(
    (value: string | undefined) => {
      const triggerElement = value ? triggerRefs.current.get(value) : null;

      if (value && triggerElement && lenis) {
        // Starting to open accordion
        baseScrollPosition.current = window.pageYOffset;
        isCompensating.current = true;

        // After animation completes, decide on final scroll position
        setTimeout(() => {
          isCompensating.current = false;

          const currentScroll = window.pageYOffset;
          const triggerRect = triggerElement.getBoundingClientRect();
          const triggerTop = currentScroll + triggerRect.top;

          // If the accordion trigger is not visible, scroll to it smoothly
          if (
            triggerRect.top < -50 ||
            triggerRect.top > window.innerHeight - 100
          ) {
            lenis.scrollTo(triggerTop - 100, {
              duration: 1.0,
              easing: (t) => 1 - Math.pow(1 - t, 3), // easeOut cubic
            });
          }
        }, 600); // Match your accordion animation duration
      } else {
        // Accordion closed or no value
        isCompensating.current = false;
      }
    },
    [lenis]
  );

  return { setTriggerRef, handleValueChange };
};
