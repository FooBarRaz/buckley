import { exec, spawnSync } from "child_process";

export const installHomebrewPackage = (packageName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const command = `brew install ${packageName}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        console.log(stdout); // Print stdout to the screen
        resolve();
      }
    });
  });
};

export type BrewConfig = {
  packages: string[];
};

// install brew if not installed
const checkBrewInstalled = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec("brew --version", (error, stdout, stderr) => {
      if (error) {

        spawnSync('/bin/bash', ['-c', '"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'], {
          stdio: 'inherit',
          shell: true
        });
        resolve();
      } else {
        // Brew is already installed
        resolve();
      }
    });
  });
};

export const handle = (config: BrewConfig) => {
  // install brew if not installed
  return checkBrewInstalled()
    .then(() => {
      // Brew is installed, proceed with installing packages
      const installPromises = config.packages.map((packageName) =>
        installHomebrewPackage(packageName)
      );
      return Promise.all(installPromises);
    })
    .then(() => {
      console.log("All packages installed successfully");
    })
    .catch((error) => {
      console.error("Error occurred while installing packages:", error);
    });
};
