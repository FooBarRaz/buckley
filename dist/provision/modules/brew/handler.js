"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = exports.installHomebrewPackage = void 0;
const child_process_1 = require("child_process");
const installHomebrewPackage = (packageName) => {
    return new Promise((resolve, reject) => {
        const command = `brew install ${packageName}`;
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            else {
                console.log(stdout); // Print stdout to the screen
                resolve();
            }
        });
    });
};
exports.installHomebrewPackage = installHomebrewPackage;
// install brew if not installed
const checkBrewInstalled = () => {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)("brew --version", (error, stdout, stderr) => {
            if (error) {
                // Brew is not installed, install it
                (0, child_process_1.exec)('/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"', (error, stdout, stderr) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
            }
            else {
                // Brew is already installed
                resolve();
            }
        });
    });
};
const handle = (config) => {
    // install brew if not installed
    return checkBrewInstalled()
        .then(() => {
        // Brew is installed, proceed with installing packages
        const installPromises = config.packages.map((packageName) => (0, exports.installHomebrewPackage)(packageName));
        return Promise.all(installPromises);
    })
        .then(() => {
        console.log("All packages installed successfully");
    })
        .catch((error) => {
        console.error("Error occurred while installing packages:", error);
    });
};
exports.handle = handle;
