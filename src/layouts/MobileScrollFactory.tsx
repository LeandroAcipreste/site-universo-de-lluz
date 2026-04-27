import { useEffect, useRef } from "react";

interface MobileScrollFactoryProps {
  children: React.ReactNode;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  className?: string;
  threshold?: number;
}

export default function MobileScrollFactory({
  children,
  onSwipeUp,
  onSwipeDown,
  className = "",
  threshold = 30,
}: MobileScrollFactoryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const touchStartY = useRef(0);

  // Global Body Lock to prevent bounce
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalWidth = document.body.style.width;
    const originalHeight = document.body.style.height;

    // By locking the body, we ensure mobile browsers don't do native scrolling
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = originalWidth;
      document.body.style.height = originalHeight;
    };
  }, []);

  // Event handlers
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Checks if the touch target is inside an element that can and is being scrolled
    const isScrollableTarget = (target: HTMLElement | null, deltaY: number) => {
      let current = target;
      while (current && current !== el) {
        const style = window.getComputedStyle(current);
        const isScrollableNode = style.overflowY === "auto" || style.overflowY === "scroll";
        
        if (isScrollableNode) {
          const isAtTop = current.scrollTop <= 0;
          const isAtBottom = current.scrollTop + current.clientHeight >= current.scrollHeight - 1;
          
          if (deltaY > 0 && !isAtBottom) return true; // Scrolling down inside card
          if (deltaY < 0 && !isAtTop) return true; // Scrolling up inside card
        }
        current = current.parentElement;
      }
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      const deltaY = e.deltaY;
      if (isScrollableTarget(e.target as HTMLElement, deltaY)) {
        return; // Allow native scroll inside the card
      }
      e.preventDefault(); // Stop outer bounce
      if (deltaY > 0) onSwipeUp();
      else if (deltaY < 0) onSwipeDown();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.touches[0].clientY;
      if (!isScrollableTarget(e.target as HTMLElement, deltaY)) {
        e.preventDefault(); // Prevent bounce if not in a scrollable area
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (isScrollableTarget(e.target as HTMLElement, deltaY)) return;

      if (Math.abs(deltaY) < threshold) return;
      
      if (deltaY > 0) onSwipeUp();
      else if (deltaY < 0) onSwipeDown();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [onSwipeUp, onSwipeDown, threshold]);

  return (
    <section ref={containerRef} className={className} style={{ height: "100svh", overflow: "hidden" }}>
      {children}
    </section>
  );
}
