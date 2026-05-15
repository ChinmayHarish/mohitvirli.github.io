import ssh2 from 'ssh2';
import type { Connection, ClientInfo, AuthContext, Session, ServerChannel } from 'ssh2';
import { readFileSync, existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
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

let hostKey: Buffer | string;

if (process.env.HOST_RSA_KEY_BASE64) {
    hostKey = Buffer.from(process.env.HOST_RSA_KEY_BASE64, 'base64');
} else if (process.env.HOST_RSA_KEY) {
    hostKey = process.env.HOST_RSA_KEY;
} else {
    // Ensure key exists
    if (!existsSync(keyPath)) {
        console.error("❌ Host key not found! Run `npm run keygen` first, or provide HOST_RSA_KEY environment variable.");
        process.exit(1);
    }
    hostKey = readFileSync(keyPath);
}

const server = new Server({
    hostKeys: [hostKey]
}, (client: Connection, info: ClientInfo) => {
    console.log(`[+] Client connected from ${info.ip}`);

    client.on('authentication', (ctx: AuthContext) => {
        // Allow any username/password/key combination for a public portfolio
        ctx.accept();
    });

    client.on('ready', () => {
        client.on('session', (accept: any, reject: any) => {
            const session: Session = accept();

            session.on('pty', (accept: any, reject: any, sessionInfo: any) => {
                // Accept PTY requests for terminal sizing
                accept();
            });

            session.on('shell', (accept: any, reject: any) => {
                const channel: ServerChannel = accept();
                console.log(`[>>] Starting portfolio app for ${info.ip}`);

                // Polyfill TTY methods on the channel for Ink
                (channel as any).isTTY = true;
                (channel as any).setRawMode = () => { };
                (channel as any).ref = () => { };
                (channel as any).unref = () => { };
                const originalWrite = channel.write.bind(channel);
                (channel as any).write = (data: any) => {
                    return originalWrite(data);
                };

                // Render the React app directly to the SSH channel!
                const { unmount, waitUntilExit } = render(React.createElement(App), {
                    stdout: channel as unknown as NodeJS.WriteStream,
                    stdin: channel as unknown as NodeJS.ReadStream,
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
            session.on('exec', (accept: any, reject: any, execInfo: any) => {
                console.warn(`[!] Blocked execution attempt from ${info.ip}: ${execInfo.command}`);
                reject();
            });
        });
    });
});

server.listen(port as number, () => {
    console.log(`🚀 SSH Terminal Portfolio Server running on port ${port}`);
    console.log(`Test locally via: ssh -p ${port} localhost`);
});
