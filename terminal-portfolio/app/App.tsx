import React from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import Gradient from 'ink-gradient';
import { PORTRAIT } from './data/ascii.js';

export const App = () => {
    const { exit } = useApp();

    useInput((input, key) => {
        if (input === 'q' || input === 'Q' || key.escape) {
            exit();
        }
    });

    return (
        <Box flexDirection="row" paddingX={4} paddingY={2} width="100%" height="100%">
            {/* LEFT: Braille Portrait */}
            <Box marginRight={6} flexShrink={0}>
                <Text color="gray">{PORTRAIT}</Text>
            </Box>

            {/* RIGHT: Content */}
            <Box flexDirection="column" flexGrow={1} justifyContent="center" paddingY={4}>
                <Box marginBottom={2}>
                    <Text bold>hi, i'm </Text>
                    <Gradient name="pastel">
                        <Text bold>chinmay.  ✌️</Text>
                    </Gradient>
                </Box>

                <Box marginBottom={2} flexDirection="column">
                    <Text color="gray">software engineer, builder, and creator.</Text>
                    <Text color="gray">obsessed with building stuff that people use.</Text>
                </Box>

                <Box marginBottom={2} flexDirection="column">
                    <Text color="cyan" bold>► links</Text>
                    <Box flexDirection="row">
                        <Text color="gray">  github:   </Text>
                        <Text color="white" underline>github.com/mohitvirli</Text>
                    </Box>
                    <Box flexDirection="row">
                        <Text color="gray">  linkedin: </Text>
                        <Text color="white" underline>linkedin.com/in/chinmayharish</Text>
                    </Box>
                    <Box flexDirection="row">
                        <Text color="gray">  email:    </Text>
                        <Text color="white" underline>contact@chinmay.dev</Text>
                    </Box>
                </Box>

                <Box marginBottom={3} flexDirection="column">
                    <Text color="magenta" bold>► products & side projects</Text>
                    <Box flexDirection="row" marginTop={1}>
                        <Text color="gray">  • </Text>
                        <Text color="white">AI Terminal Portfolio </Text>
                        <Text color="gray">  (you're looking at it)</Text>
                    </Box>
                    <Box flexDirection="row">
                        <Text color="gray">  • </Text>
                        <Text color="white">Pinchtab Automation </Text>
                        <Text color="gray">  (job application bot)</Text>
                    </Box>
                    <Box flexDirection="row">
                        <Text color="gray">  • </Text>
                        <Text color="white">Visualizer App      </Text>
                        <Text color="gray">  (spotify music visualizer)</Text>
                    </Box>
                    <Box flexDirection="row">
                        <Text color="gray">  • </Text>
                        <Text color="white">Flight Tracker API  </Text>
                        <Text color="gray">  (real-time global flights)</Text>
                    </Box>
                </Box>

                <Box marginTop={2}>
                    <Text color="gray">
                        press <Text color="white" bold>q</Text> to quit
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};
