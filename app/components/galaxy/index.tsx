"use client";
import { Canvas } from '@react-three/fiber';
import { useGalaxyStore } from '../../stores/galaxyStore';
import { useGitHubRepos } from '../../lib/github';
import { GalaxyOverlay } from './GalaxyOverlay';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobile } from 'react-device-detect';

export default function GalaxyContainer() {
    const { isGalaxyOpen, closeGalaxy, selectedRepo } = useGalaxyStore();
    const { loading } = useGitHubRepos();

    return (
        <AnimatePresence>
            {isGalaxyOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black"
                >
                    {/* Close Button */}
                    <button
                        onClick={closeGalaxy}
                        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all text-white border border-white/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    {/* Loading State */}
                    {loading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-40 bg-black/50 backdrop-blur-sm">
                            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                            <p className="text-lg font-medium tracking-widest uppercase">Initializing Galaxy...</p>
                        </div>
                    )}

                    {/* The 3D Canvas */}
                    <div className="absolute inset-0 z-10">
                        <Canvas camera={{ position: [0, 0, isMobile ? 25 : 15], fov: 60 }}>
                            <GalaxyOverlay />
                        </Canvas>
                    </div>

                    {/* UI Overlay for Selected Repo */}
                    <AnimatePresence>
                        {selectedRepo && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className={`absolute z-30 ${isMobile ? 'bottom-8 left-4 right-4' : 'right-12 top-1/2 -translate-y-1/2 w-96'} bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold text-white mb-2">{selectedRepo.name}</h2>
                                    <button onClick={() => useGalaxyStore.getState().setSelectedRepo(null)} className="text-white/50 hover:text-white">
                                        ✕
                                    </button>
                                </div>

                                <p className="text-white/70 text-sm mb-6 line-clamp-3">
                                    {selectedRepo.description || 'No description provided.'}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {selectedRepo.language && (
                                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono border border-blue-500/30">
                                            {selectedRepo.language}
                                        </span>
                                    )}
                                    <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-mono border border-yellow-500/30 flex items-center gap-1">
                                        ⭐ {selectedRepo.stargazers_count}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-gray-500/20 text-gray-300 text-xs font-mono border border-gray-500/30 flex items-center gap-1">
                                        🍴 {selectedRepo.forks_count}
                                    </span>
                                </div>

                                <a
                                    href={selectedRepo.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block w-full text-center py-3 px-4 rounded-xl bg-white text-black font-semibold tracking-wider uppercase text-sm hover:bg-white/90 transition-colors"
                                >
                                    View Source Code
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Helper Text */}
                    {!loading && !selectedRepo && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                            <p className="text-white/50 text-sm font-mono tracking-widest uppercase bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/5">
                                Drag to rotate • Scroll to zoom • Click nodes
                            </p>
                        </div>
                    )}

                </motion.div>
            )}
        </AnimatePresence>
    );
}
