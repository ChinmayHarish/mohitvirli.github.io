"use client";

import { GitHubRepo } from "../lib/github";

import { create } from 'zustand';

interface GalaxyState {
    isGalaxyOpen: boolean;
    selectedRepo: GitHubRepo | null;
    openGalaxy: () => void;
    closeGalaxy: () => void;
    setSelectedRepo: (repo: GitHubRepo | null) => void;
}

export const useGalaxyStore = create<GalaxyState>((set) => ({
    isGalaxyOpen: false,
    selectedRepo: null,
    openGalaxy: () => set({ isGalaxyOpen: true }),
    closeGalaxy: () => set({ isGalaxyOpen: false, selectedRepo: null }),
    setSelectedRepo: (repo) => set({ selectedRepo: repo }),
}));
