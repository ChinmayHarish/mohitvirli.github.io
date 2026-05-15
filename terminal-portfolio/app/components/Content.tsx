import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

const PROJECTS = [
    {
        name: 'Infiniteworks',
        role: '0 → 1 Product Launch',
        desc: 'Led the backend and prompt configuration of web scraper pipelines, scaling user base by 4x. Aggregated 80,000+ BI opportunities.',
        tech: ['Retool', 'PostgreSQL', 'Mixpanel', 'Figma', 'Python']
    },
    {
        name: 'Competitive Intelligence Module',
        role: 'Internal Tooling',
        desc: 'Developed an LLM-based module to scrape target audience domains, extracting structured information in JSON format across 15+ tracking events. Saved the company $6,000/month.',
        tech: ['LLMs', 'Web Scraping', 'BI', 'TypeScript', 'Ink']
    },
    {
        name: 'Palladium Campaigns',
        role: 'Engagement Platform',
        desc: 'Scaled engagement mapping algorithms and deployed WhatsApp blast campaigns via Wati API, boosting matching efficiency by 30%.',
        tech: ['Wati API', 'Node.js', 'PostgreSQL', 'Figma']
    },
    {
        name: 'Bidfortune Funnel',
        role: 'Web Application',
        desc: 'Led a cross-functional squad of 5 to successfully deploy a large-scale project within a strict 60-day timeline.',
        tech: ['React', 'Node.js', 'Project Management']
    },
    {
        name: 'Terminal Portfolio',
        role: 'Personal Brand / Software Engineering',
        desc: 'Interactive, CLI-based portfolio accessible via SSH. Designed with a premium minimalist aesthetic to run flawlessly in modern terminals.',
        tech: ['React', 'Ink', 'TypeScript', 'Fly.io', 'Docker']
    }
];

export const Creations = () => {
    const [selected, setSelected] = useState(0);

    useInput((input, key) => {
        if (key.upArrow) setSelected((s: number) => Math.max(0, s - 1));
        if (key.downArrow) setSelected((s: number) => Math.min(PROJECTS.length - 1, s + 1));
    });

    return (
        <Box flexDirection="row" width="100%">
            {/* List */}
            <Box flexDirection="column" flexGrow={0} flexBasis="35%" marginRight={2} borderStyle="single" borderTop={false} borderBottom={false} borderLeft={false} borderColor="gray" paddingRight={2}>
                <Box marginBottom={1}>
                    <Text bold color="cyan">► PROJECTS & LAUNCHES</Text>
                </Box>
                {PROJECTS.map((p, i) => {
                    const isSelected = i === selected;
                    return (
                        <Text key={p.name} color={isSelected ? 'white' : 'gray'} bold={isSelected}>
                            {isSelected ? '● ' : '○ '}{p.name}
                        </Text>
                    );
                })}
                <Box marginTop={2}>
                    <Text color="gray">[↑ ↓] Select Project</Text>
                </Box>
            </Box>

            {/* Details */}
            <Box flexDirection="column" flexGrow={1}>
                <Box borderStyle="round" borderColor="magenta" padding={1} flexDirection="column" minHeight={12}>
                    <Box marginBottom={1}>
                        <Text bold color="magenta">{PROJECTS[selected].name.toUpperCase()}</Text>
                    </Box>
                    <Box marginBottom={1}>
                        <Text color="yellow">ROLE: {PROJECTS[selected].role}</Text>
                    </Box>
                    <Box marginBottom={1}>
                        <Text color="white">{PROJECTS[selected].desc}</Text>
                    </Box>

                    <Box marginTop={1}>
                        <Text color="cyan">TECH STACK:</Text>
                    </Box>
                    <Box flexDirection="row" flexWrap="wrap" marginTop={1}>
                        {PROJECTS[selected].tech.map(t => (
                            <Box key={t} borderStyle="single" borderColor="gray" paddingX={1} marginRight={1}>
                                <Text color="yellow">{t}</Text>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export const Reflections = () => (
    <Box flexDirection="column" width="100%" justifyContent="center" alignItems="center" minHeight={12} borderStyle="round" borderColor="gray">
        <Text color="gray">Reflections and essays are currently being ported to the terminal.</Text>
        <Box marginTop={1}>
            <Text color="cyan">Check back soon!</Text>
        </Box>
    </Box>
);

export const Contacts = () => (
    <Box flexDirection="column" width="100%" alignItems="center" paddingTop={1}>
        <Box borderStyle="round" borderColor="green" padding={2} flexDirection="column" width="60%">
            <Box marginBottom={1}>
                <Text bold color="green">LET'S CONNECT</Text>
            </Box>

            <Box flexDirection="row" marginBottom={1}>
                <Box width={15}><Text color="gray">Email:</Text></Box>
                <Text color="white">chinmayharish11@gmail.com</Text>
            </Box>
            <Box flexDirection="row" marginBottom={1}>
                <Box width={15}><Text color="gray">LinkedIn:</Text></Box>
                <Text color="blue">linkedin.com/in/chinmay-harish</Text>
            </Box>
            <Box flexDirection="row" marginBottom={1}>
                <Box width={15}><Text color="gray">GitHub:</Text></Box>
                <Text color="white">github.com/mohitvirli</Text>
            </Box>
            <Box flexDirection="row">
                <Box width={15}><Text color="gray">Phone:</Text></Box>
                <Text color="white">+91 8050965313</Text>
            </Box>
        </Box>
    </Box>
);
