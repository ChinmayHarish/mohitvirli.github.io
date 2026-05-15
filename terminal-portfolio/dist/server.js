import ssh2 from 'ssh2';
import { readFileSync, existsSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { render } from 'ink';
import { App } from './app/App.js';
const { Server } = ssh2;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 2222;
const keyPath = path.resolve(process.cwd(), 'host_rsa_key');
let hostKey;
if (process.env.HOST_RSA_KEY_BASE64) {
    hostKey = Buffer.from(process.env.HOST_RSA_KEY_BASE64, 'base64');
}
else if (process.env.HOST_RSA_KEY) {
    hostKey = process.env.HOST_RSA_KEY;
}
else {
    // Ensure key exists
    if (!existsSync(keyPath)) {
        console.error("❌ Host key not found! Run `npm run keygen` first, or provide HOST_RSA_KEY environment variable.");
        process.exit(1);
    }
    hostKey = readFileSync(keyPath);
}
const server = new Server({
    hostKeys: [hostKey]
}, (client, info) => {
    console.log(`[+] Client connected from ${info.ip}`);
    client.on('authentication', (ctx) => {
        // Allow any username/password/key combination for a public portfolio
        ctx.accept();
    });
    client.on('ready', () => {
        client.on('session', (accept, reject) => {
            const session = accept();
            session.on('pty', (accept, reject, sessionInfo) => {
                // Accept PTY requests for terminal sizing
                accept();
            });
            session.on('shell', (accept, reject) => {
                const channel = accept();
                console.log(`[>>] Starting portfolio app for ${info.ip}`);
                // Polyfill TTY methods on the channel for Ink
                channel.isTTY = true;
                channel.setRawMode = () => { };
                channel.ref = () => { };
                channel.unref = () => { };
                const originalWrite = channel.write.bind(channel);
                channel.write = (data) => {
                    return originalWrite(data);
                };
                // Render the React app directly to the SSH channel!
                const { unmount, waitUntilExit } = render(React.createElement(App), {
                    stdout: channel,
                    stdin: channel,
                    exitOnCtrlC: true
                });
                waitUntilExit().then(() => {
                    console.log(`[<<] Portfolio app chose to exit for ${info.ip}`);
                    channel.close();
                }).catch(err => {
                    console.error("App error", err);
                    channel.close();
                });
                channel.on('close', () => {
                    unmount();
                    console.log(`[<<] Portfolio app exited for ${info.ip}`);
                });
                client.on('close', () => {
                    unmount();
                    console.log(`[-] Client disconnected: ${info.ip}`);
                });
            });
            // CRITICAL SECURITY: Reject any attempts to run direct commands (e.g. `ssh server "ls -la"`)
            session.on('exec', (accept, reject, execInfo) => {
                console.warn(`[!] Blocked execution attempt from ${info.ip}: ${execInfo.command}`);
                reject();
            });
        });
    });
});
server.listen(port, () => {
    console.log(`🚀 SSH Terminal Portfolio Server running on port ${port}`);
    console.log(`Test locally via: ssh -p ${port} localhost`);
});
