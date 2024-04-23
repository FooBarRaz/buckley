import { exec, ExecException } from "child_process";

type ShellConfig = {
  env_variables: Record<string, string>;
  commands: string[];
  scripts: string[];
  aliases: Record<string, string>;
};

function setEnvironmentVariables(config: ShellConfig) {
  Object.entries(config.env_variables).forEach(([key, value]) => {
    process.env[key] = value;
    console.log(`Environment variable set: ${key}=${value}`);
  });
}

// Define aliases
function defineAliases(config: ShellConfig) {
  Object.entries(config.aliases).forEach(([alias, command]) => {
    exec(
      `alias ${alias}='${command}'`,
      (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          console.error(`Error defining alias: ${alias}`);
          console.error(stderr);
        } else {
          console.log(`Alias defined successfully: ${alias}`);
          console.log(stdout);
        }
      }
    );
  });
}

const executeCommand = (command: string): Promise<string> => {
  console.log("executeCommand l:36", command);
  return new Promise((resolve, reject) => {
    exec(
      command,
      (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          console.error(`Error executing command: ${command}`);
          console.error(stderr);
          reject(error);
        } else {
          console.log(`Command executed successfully: ${command}`);
          console.log(stdout);
          resolve(stdout);
        }
      }
    );
  });
};

const executeCommands = async (commands: string[]) => {
    for (const command of commands) {
        try {
            await executeCommand(command);
        } catch (error) {
            console.error(`Error executing command: ${command}`);
            console.error(error);
        }
    }
};

export const handle = async (config: ShellConfig) => {
  console.log('executing shell handler: ', config);
  
  // Execute commands
  await executeCommands(config.commands);

  // Execute scripts
  config.scripts?.forEach((script) => {
    exec(
      `bash ${script}`,
      (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          console.error(`Error executing script: ${script}`);
          console.error(stderr);
        } else {
          console.log(`Script executed successfully: ${script}`);
          console.log(stdout);
        }
      }
    );
  });

//   setEnvironmentVariables(config);
//   defineAliases(config);
};
