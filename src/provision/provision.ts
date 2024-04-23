import { Configuration, parseConfigFile } from "../config.utils";

export const action = (filePath: string): Promise<void> => {
  // parse config from provided file
  const parsed = parseConfigFile(filePath);

  // validate config
  // TODO

  // execute config
  // TODO
  execute(parsed);

  return Promise.resolve();
};

const execute = async (config: Configuration) => {
  const currentOs = process.platform;
  const isSupported = config.system.supportedSystems.includes(currentOs as any);
  if (!isSupported) {
    console.error(`Error: This configuration is not supported on your current operating system (${currentOs}).
    Supported systems are: ${config.system.supportedSystems.join(
      ", "
    )}. Please check your configuration.`);

    process.exit(1);
  }

  console.log(`Provisioning system for ${currentOs}...`);
  const modules = ["shell"]; //Object.keys(config.provision);

  console.log(`Modules to provision: ${modules.join(", ")}`);
  modules.forEach(async (module) => {
    console.debug(`Provisioning ${module}...`);
    try {
      const handler = await import(`./modules/${module}/handler`);
      console.log(`found module for ${module}`);
      
      const moduleConfigs =
        config.provision[module as keyof typeof config.provision];
        
      console.log(`found module config for ${module}`, moduleConfigs);
      if (handler.handle) {
        await handler.handle(moduleConfigs);
      }
    } catch (e) {
      console.error(`Error: Could not provision module ${module}.`);
      console.error(e);
    }
  });
};
