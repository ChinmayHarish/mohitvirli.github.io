import { generateKeyPairSync } from 'node:crypto';
import { writeFileSync, existsSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keyPath = path.join(__dirname, 'host_rsa_key');
if (existsSync(keyPath)) {
    console.log("✅ Host key already exists.");
    process.exit(0);
}
console.log("Generating RSA host key...");
const { privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    }
});
writeFileSync(keyPath, privateKey);
console.log("✅ Generated host_rsa_key successfully.");
