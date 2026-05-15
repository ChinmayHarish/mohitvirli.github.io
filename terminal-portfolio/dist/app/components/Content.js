import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
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
        if (key.upArrow)
            setSelected((s) => Math.max(0, s - 1));
        if (key.downArrow)
            setSelected((s) => Math.min(PROJECTS.length - 1, s + 1));
    });
    return (_jsxs(Box, { flexDirection: "row", width: "100%", children: [_jsxs(Box, { flexDirection: "column", flexGrow: 0, flexBasis: "35%", marginRight: 2, borderStyle: "single", borderTop: false, borderBottom: false, borderLeft: false, borderColor: "gray", paddingRight: 2, children: [_jsx(Box, { marginBottom: 1, children: _jsx(Text, { bold: true, color: "cyan", children: "\u25BA PROJECTS & LAUNCHES" }) }), PROJECTS.map((p, i) => {
                        const isSelected = i === selected;
                        return (_jsxs(Text, { color: isSelected ? 'white' : 'gray', bold: isSelected, children: [isSelected ? '● ' : '○ ', p.name] }, p.name));
                    }), _jsx(Box, { marginTop: 2, children: _jsx(Text, { color: "gray", children: "[\u2191 \u2193] Select Project" }) })] }), _jsx(Box, { flexDirection: "column", flexGrow: 1, children: _jsxs(Box, { borderStyle: "round", borderColor: "magenta", padding: 1, flexDirection: "column", minHeight: 12, children: [_jsx(Box, { marginBottom: 1, children: _jsx(Text, { bold: true, color: "magenta", children: PROJECTS[selected].name.toUpperCase() }) }), _jsx(Box, { marginBottom: 1, children: _jsxs(Text, { color: "yellow", children: ["ROLE: ", PROJECTS[selected].role] }) }), _jsx(Box, { marginBottom: 1, children: _jsx(Text, { color: "white", children: PROJECTS[selected].desc }) }), _jsx(Box, { marginTop: 1, children: _jsx(Text, { color: "cyan", children: "TECH STACK:" }) }), _jsx(Box, { flexDirection: "row", flexWrap: "wrap", marginTop: 1, children: PROJECTS[selected].tech.map(t => (_jsx(Box, { borderStyle: "single", borderColor: "gray", paddingX: 1, marginRight: 1, children: _jsx(Text, { color: "yellow", children: t }) }, t))) })] }) })] }));
};
export const Reflections = () => (_jsxs(Box, { flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", minHeight: 12, borderStyle: "round", borderColor: "gray", children: [_jsx(Text, { color: "gray", children: "Reflections and essays are currently being ported to the terminal." }), _jsx(Box, { marginTop: 1, children: _jsx(Text, { color: "cyan", children: "Check back soon!" }) })] }));
export const Contacts = () => (_jsx(Box, { flexDirection: "column", width: "100%", alignItems: "center", paddingTop: 1, children: _jsxs(Box, { borderStyle: "round", borderColor: "green", padding: 2, flexDirection: "column", width: "60%", children: [_jsx(Box, { marginBottom: 1, children: _jsx(Text, { bold: true, color: "green", children: "LET'S CONNECT" }) }), _jsxs(Box, { flexDirection: "row", marginBottom: 1, children: [_jsx(Box, { width: 15, children: _jsx(Text, { color: "gray", children: "Email:" }) }), _jsx(Text, { color: "white", children: "chinmayharish11@gmail.com" })] }), _jsxs(Box, { flexDirection: "row", marginBottom: 1, children: [_jsx(Box, { width: 15, children: _jsx(Text, { color: "gray", children: "LinkedIn:" }) }), _jsx(Text, { color: "blue", children: "linkedin.com/in/chinmay-harish" })] }), _jsxs(Box, { flexDirection: "row", marginBottom: 1, children: [_jsx(Box, { width: 15, children: _jsx(Text, { color: "gray", children: "GitHub:" }) }), _jsx(Text, { color: "white", children: "github.com/mohitvirli" })] }), _jsxs(Box, { flexDirection: "row", children: [_jsx(Box, { width: 15, children: _jsx(Text, { color: "gray", children: "Phone:" }) }), _jsx(Text, { color: "white", children: "+91 8050965313" })] })] }) }));
