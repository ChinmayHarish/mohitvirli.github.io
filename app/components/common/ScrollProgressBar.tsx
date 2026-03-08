'use client';

import { useScrollStore } from "@stores";

const ScrollProgressBar = () => {
    const scrollProgress = useScrollStore((state) => state.scrollProgress);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none bg-white/10 overflow-hidden">
            <div
                className="h-full bg-white transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                style={{ width: `${scrollProgress * 100}%` }}
            />
        </div>
    );
};

export default ScrollProgressBar;
