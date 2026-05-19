import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

export default function useResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile,
    isOpen,
    toggleNav: () => setIsOpen((value) => !value),
    closeNav: () => setIsOpen(false),
  };
}
