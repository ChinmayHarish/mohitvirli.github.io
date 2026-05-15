"use client";
import { useState, useEffect } from 'react';

export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
    topics: string[];
}

export const fetchRepos = async (): Promise<GitHubRepo[]> => {
    try {
        const response = await fetch('https://api.github.com/users/ChinmayHarish/repos?sort=updated&per_page=30');
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
        return [];
    }
};

export function useGitHubRepos() {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        fetchRepos().then(data => {
            if (mounted) {
                setRepos(data);
                setLoading(false);
            }
        });
        return () => { mounted = false; };
    }, []);

    return { repos, loading };
}
