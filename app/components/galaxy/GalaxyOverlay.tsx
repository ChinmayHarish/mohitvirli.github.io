"use client";
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useGitHubRepos } from '../../lib/github';
import { RepoNode } from './RepoNode';
import { isMobile } from 'react-device-detect';

// Utility to generate a color based on language
const languageColorMap: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    C: '#555555',
    'C++': '#f34b7d',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Shell: '#89e051',
};

const getLanguageColor = (language: string) => {
    return languageColorMap[language] || '#ffffff'; // Default to white
};

export function GalaxyOverlay() {
    const { repos, loading } = useGitHubRepos();
    const groupRef = useRef<THREE.Group>(null);

    // Distribute repos in a galaxy-like spiral
    const repoNodes = useMemo(() => {
        if (!repos.length) return [];

        const nodes = [];
        const a = isMobile ? 1 : 2; // spiral tightness
        const b = 0.5; // spiral spread

        for (let i = 0; i < repos.length; i++) {
            // Create an Archimedean spiral
            const angle = i * 0.8;
            const radius = a + b * angle;

            // Add some random noise to make it feel organic and 3D
            const x = radius * Math.cos(angle) + (Math.random() - 0.5) * 2;
            const z = radius * Math.sin(angle) + (Math.random() - 0.5) * 2;
            const y = (Math.random() - 0.5) * 4; // Height variation

            nodes.push({
                repo: repos[i],
                position: [x, y, z] as [number, number, number],
                color: getLanguageColor(repos[i].language),
            });
        }

        return nodes;
    }, [repos]);


    // Very slow background rotation
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0005;
        }
    });

    if (loading) return null; // Let the UI layer handle loading state

    return (
        <>
            <color attach="background" args={['#050510']} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a90e2" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <group ref={groupRef}>
                {repoNodes.map((node) => (
                    <RepoNode
                        key={node.repo.id}
                        repo={node.repo}
                        position={node.position}
                        color={node.color}
                    />
                ))}
            </group>

            <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={5}
                maxDistance={50}
                autoRotate={false}
            />
        </>
    );
}
