"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const child_process_1 = require("child_process");
class NodeHandler {
    installNode(version) {
        const result = (0, child_process_1.spawnSync)(`nvm install ${version}`, { shell: true });
        if (result.error) {
            console.error(`Failed to install Node.js version ${version}`);
            return false;
        }
        console.log(`Successfully installed Node.js version ${version}`);
        return true;
    }
    useNode(version) {
        const result = (0, child_process_1.spawnSync)(`nvm use ${version}`, { shell: true });
        if (result.error) {
            console.error(`Failed to switch to Node.js version ${version}`);
            return false;
        }
        console.log(`Successfully switched to Node.js version ${version}`);
        return true;
    }
    installPackage(pkg) {
        const result = (0, child_process_1.spawnSync)(`npm install -g ${pkg}`, { shell: true });
        if (result.error) {
            console.error(`Failed to install package ${pkg}`);
            return false;
        }
        console.log(`Successfully installed package ${pkg}`);
        return true;
    }
}
const handler = (config) => {
    const nodeHandler = new NodeHandler();
    const nvmInstalled = (0, child_process_1.spawnSync)("command -v nvm", { shell: true });
    if (nvmInstalled.error) {
        console.error("nvm is not installed");
        const installNvm = (0, child_process_1.spawnSync)("curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash", { shell: true });
        if (installNvm.error) {
            console.error("Failed to install nvm");
            return;
        }
        console.log("Successfully installed nvm");
    }
    config.install.forEach((version) => {
        nodeHandler.installNode(version);
    });
    config.use.forEach((version) => {
        nodeHandler.useNode(version);
    });
    if (config.packageManager === "npm") {
        config.packages.forEach((pkg) => {
            if (pkg.global) {
                const fullPackageName = `${pkg.name}@${pkg.version}`;
                nodeHandler.installPackage(fullPackageName);
            }
        });
    }
    else {
        console.error(`Unsupported package manager: ${config.packageManager}`);
    }
};
exports.handler = handler;
