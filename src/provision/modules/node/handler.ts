import { spawnSync } from "child_process";

class NodeHandler {
  installNode(version: string) {
    const result = spawnSync(`nvm install ${version}`, { shell: true });
    if (result.error) {
      console.error(`Failed to install Node.js version ${version}`);
      return false;
    }
    console.log(`Successfully installed Node.js version ${version}`);
    return true;
  }

  useNode(version: string) {
    const result = spawnSync(`nvm use ${version}`, { shell: true });
    if (result.error) {
      console.error(`Failed to switch to Node.js version ${version}`);
      return false;
    }
    console.log(`Successfully switched to Node.js version ${version}`);
    return true;
  }

  installPackage(pkg: string) {
    const result = spawnSync(`npm install -g ${pkg}`, { shell: true });
    if (result.error) {
      console.error(`Failed to install package ${pkg}`);
      return false;
    }
    console.log(`Successfully installed package ${pkg}`);
    return true;
  }
}

type NodeConfig = {
  install: string[];
  use: string[];
  packageManager: string;
  packages: {
    name: string;
    version: string;
    global: boolean;
  }[];
};

export const handler = (config: NodeConfig) => {
  const nodeHandler = new NodeHandler();

  const nvmInstalled = spawnSync("command -v nvm", { shell: true });
  if (nvmInstalled.error) {
    console.error("nvm is not installed");
    const installNvm = spawnSync("curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash", { shell: true });
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
  } else {
    console.error(`Unsupported package manager: ${config.packageManager}`);
  }
};
