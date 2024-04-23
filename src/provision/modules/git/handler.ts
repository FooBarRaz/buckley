import { execSync } from "child_process";
import fs from "fs";

interface GitConfig {
  ssh: {
    username: string;
    email?: string;
    keyName?: string;
  };
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
    return result;
  }

  public createSshCredentials(config: GitConfig["ssh"]): SshCredentials {
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

      return {
        privateKey,
        publicKey,
      };
    } catch (error) {
      console.error("Error creating SSH key pair:", error);
      throw error;
    }
  }
}

export const handle = (config: GitConfig) => {
  const handler = new GitHandler();
  const response = handler.handle(config);
  if (response.ssh.publicKey) {
    console.log("SSH credentials created. Public key: ");
    console.log(response?.ssh.publicKey);
  }
};
