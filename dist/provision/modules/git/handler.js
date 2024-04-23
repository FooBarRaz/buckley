"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
class GitHandler {
    constructor() { }
    handle(config) {
        if (config.ssh) {
            this.createSshCredentials(config.ssh);
        }
    }
    createSshCredentials(config) {
        // use keyName if provided, otherwise use default
        const keyName = config.keyName || "id_rsa";
        // Generate SSH key pair
        const sshKeygenCommand = `ssh-keygen -t rsa -b 4096 -C "${config.email}"`;
        (0, child_process_1.execSync)(sshKeygenCommand);
        console.log('created ssh key pair');
        // Read private and public keys
        const privateKey = fs_1.default.readFileSync(`${process.env.HOME}/.ssh/${keyName}`, "utf8");
        const publicKey = fs_1.default.readFileSync(`${process.env.HOME}/.ssh/${keyName}.pub`, "utf8");
        return {
            privateKey,
            publicKey,
        };
    }
}
const handle = (config) => {
    const handler = new GitHandler();
    const response = handler.handle(config);
    console.log("Git handler response:", response);
};
exports.handle = handle;
