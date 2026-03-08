// import "react-crud-icons/dist/react-crud-icons.css";

import { useGSAP } from "@gsap/react";
import { usePortalStore, useThemeStore } from "@stores";
import gsap from "gsap";
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

const ThemeSwitcher = () => {
  const themeSwitcherRef = useRef<HTMLDivElement>(null);
  const { nextTheme, theme } = useThemeStore();
  const isActive = usePortalStore((state) => state.activePortalId);
  const [positionClass, setPositionClass] = useState<string>('');
  const toggleTheme = () => nextTheme();

  useGSAP(() => {
    gsap.to(themeSwitcherRef.current, {
      opacity: isActive ? 0 : 1,
      duration: 1,
      delay: isActive ? 0 : 1,
    });
  }, [isActive]);

  useEffect(() => {
    setPositionClass(isMobile ? 'top-2 right-2' : 'top-6 right-6');
  }, [isMobile]);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.color);
    }
  }, [theme.color]);

  return (
    <div className={`fixed ${positionClass} p-2 px-4 rounded-3xl backdrop-blur-md bg-white/10 shadow-lg border border-white/20`} ref={themeSwitcherRef} style={{ opacity: 0, zIndex: 2 }}>
      <div className="flex items-center justify-center gap-5">
        <a className="hover:cursor-pointer transition-transform hover:scale-110" onClick={toggleTheme} title="Toggle Theme" aria-label="Toggle dark and light mode">
          <Image src="/icons/night-mode.svg" width={24} height={24} alt="Toggle Theme" loading="lazy" />
        </a>
        <a className="hover:cursor-pointer transition-transform hover:scale-110" href="mailto:chinmayharish03@gmail.com" title="Email Me" aria-label="Email Chinmay Harish">
          <Image src="/icons/mail.svg" width={24} height={24} alt="Email" loading="lazy" style={{ filter: 'invert(1)' }} />
        </a>
        <a className="hover:cursor-pointer transition-transform hover:scale-110" href="tel:+919449124052" title="Call Me" aria-label="Call Chinmay Harish">
          <Image src="/icons/phone.svg" width={22} height={22} alt="Phone" loading="lazy" style={{ filter: 'invert(1)' }} />
        </a>
      </div>
    </div>
  );
};

export default ThemeSwitcher;