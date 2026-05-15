"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";

interface GitHubHeatmapProps {
    isVisible: boolean;
}

// Optional: Custom theme to match the portfolio's green accent colors
const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export default function GitHubHeatmap({ isVisible }: GitHubHeatmapProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute bottom-full right-0 mb-4 z-50 rounded-2xl overflow-hidden shadow-2xl"
                    style={{ width: "850px", transformOrigin: "bottom right" }}
                >
                    {/* Glassmorphism Background layer */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl"></div>

                    {/* Content */}
                    <div className="relative p-6 pt-8 pb-8">
                        <h3 className="text-white text-lg font-medium mb-4 flex items-center tracking-tight">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                            Recent Activity
                        </h3>
                        <div className="text-gray-300 transform scale-105 origin-left">
                            <GitHubCalendar
                                username="ChinmayHarish"
                                blockSize={14}
                                blockMargin={5}
                                colorScheme="dark"
                                theme={theme}
                                fontSize={12}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
