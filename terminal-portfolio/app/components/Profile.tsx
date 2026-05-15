import React from 'react';
import { Box, Text } from 'ink';

export const Profile = () => {
    return (
        <Box flexDirection="column" width="100%">
            <Box flexDirection="row" width="100%">
                {/* Left Column */}
                <Box flexDirection="column" flexGrow={1} flexBasis="50%" marginRight={2}>
                    <Box borderStyle="round" borderColor="magenta" padding={1} flexDirection="column" marginBottom={1}>
                        <Text bold color="magenta">ABOUT</Text>
                        <Box marginTop={1}>
                            <Text color="white">
                                <Text bold>Product builder & storyteller</Text> on the Internet.
                            </Text>
                        </Box>
                        <Box marginTop={1}>
                            <Text color="gray">
                                I love building cool products,
                                documenting life, and reflecting on
                                how technology shapes our world.
                            </Text>
                        </Box>
                    </Box>

                    <Box borderStyle="round" borderColor="yellow" padding={1} flexDirection="column">
                        <Text bold color="yellow">EXPERIENCE</Text>
                        <Box marginTop={1}>
                            <Text color="white">Associate Product Manager</Text>
                        </Box>
                        <Text color="gray">@ Primenumbers Technologies</Text>
                        <Box marginTop={1}>
                            <Text color="white">Data Analyst Intern</Text>
                        </Box>
                        <Text color="gray">@ NxtQ Data Solutions</Text>
                    </Box>
                </Box>

                {/* Right Column */}
                <Box flexDirection="column" flexGrow={1} flexBasis="50%">
                    <Box borderStyle="round" borderColor="cyan" padding={1} flexDirection="column" marginBottom={1}>
                        <Text bold color="cyan">CURRENT FOCUS</Text>
                        <Box marginTop={1}>
                            <Text color="white">Building Infiniteworks ✨</Text>
                        </Box>
                        <Text color="gray">A BI tool aggregating 80,000+ opportunities from zero to one.</Text>
                    </Box>

                    <Box borderStyle="round" borderColor="green" padding={1} flexDirection="column">
                        <Text bold color="green">EDUCATION</Text>
                        <Box marginTop={1}>
                            <Text color="white">BMS College of Engineering</Text>
                        </Box>
                        <Text color="gray">B.E. Chemical Engineering (8.8/10)</Text>
                        <Box marginTop={1}>
                            <Text color="gray">Discovered the intersection of data, design, and technology here.</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
