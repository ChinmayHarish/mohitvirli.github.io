"use client";
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { GitHubRepo } from '../../lib/github';
import { useGalaxyStore } from '../../stores/galaxyStore';
import { isMobile } from 'react-device-detect';

interface RepoNodeProps {
    repo: GitHubRepo;
    position: [number, number, number];
    color: string;
}

export function RepoNode({ repo, position, color }: RepoNodeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const setSelectedRepo = useGalaxyStore((state) => state.setSelectedRepo);
    const selectedRepo = useGalaxyStore((state) => state.selectedRepo);

    const isSelected = selectedRepo?.id === repo.id;

    const size = useMemo(() => {
        // Base size + scale based on stars (max out at a certain size)
        const baseSize = isMobile ? 0.3 : 0.5;
        const starBonus = Math.min(repo.stargazers_count * 0.05, 0.5);
        return baseSize + starBonus;
    }, [repo.stargazers_count]);

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle floating animation
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x += 0.005;

            // Scale up if selected or hovered
            const targetScale = isSelected || hovered ? 1.3 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group position={position}>
            <Sphere
                ref={meshRef}
                args={[size, 32, 32]}
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRepo(repo);
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isSelected || hovered ? 0.8 : 0.4}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>

            {/* Label */}
            <Billboard position={[0, size + (isMobile ? 0.4 : 0.6), 0]}>
                <Text
                    fontSize={isMobile ? 0.2 : 0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    {repo.name}
                </Text>
            </Billboard>
        </group>
    );
}
