import { execSync } from "child_process";
import fs from "fs";

interface GitConfig {
  ssh: {
    username: string;
    email?: string;
    keyName?: string;
  };
  clone: Array<{
    name: string;
    url: string;
    path: string;
  }>;
}

interface SshCredentials {
  privateKey: string;
  publicKey: string;
}

class GitHandler {
  constructor() {}

  public handle(config: GitConfig) {
    let result = {} as any;
    if (config.ssh) {
      result.ssh = this.createSshCredentials(config.ssh);
    }
    if(config.clone) {
      result.clone = this.cloneRepos(config.clone);
    }
    return result;
  }

  private createSshCredentials(config: GitConfig["ssh"]): SshCredentials {
    // use keyName if provided, otherwise use default
    const keyName = config.keyName || "id_rsa";

    // Generate SSH key pair
    try {
      const sshKeygenCommand = `ssh-keygen -t rsa -b 4096 -C "${config.email}" -f "${process.env.HOME}/.ssh/${keyName}" -q`;
      execSync(sshKeygenCommand, { stdio: "inherit" });
      console.log("created ssh key pair");

      // Read private and public keys
      const privateKey = fs.readFileSync(
        `${process.env.HOME}/.ssh/${keyName}`,
        "utf8"
      );
      const publicKey = fs.readFileSync(
        `${process.env.HOME}/.ssh/${keyName}.pub`,
        "utf8"
      );

      console.log("SSH credentials created. Public key: ");
      console.log(publicKey);

      return {
        privateKey,
        publicKey,
      };
    } catch (error) {
      console.error("Error creating SSH key pair:", error);
      throw error;
    }
  }

  private cloneRepos(config: GitConfig["clone"]) {
    config.forEach((repo) => {
      const { name, url, path } = repo;
      try {
        const cloneCommand = `git clone ${url} ${path}/${name}`;
        execSync(cloneCommand, { stdio: "inherit" });
        console.log(`Cloned ${name} repository to ${path}/${name}`);
      } catch (error) {
        console.error(`Error cloning ${name} repository:`, error);
        throw error;
      }
    });
  }
}

export const handle = (config: GitConfig) => {
  const handler = new GitHandler();
  const response = handler.handle(config);
  return response;
};
