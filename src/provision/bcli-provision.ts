import commander, { createArgument } from "commander";
import { action } from "./provision";

const program = commander.createCommand("provision")

program
  .name("provision")
  .option("-x --vars <varFile>", "read variables from a file")
  .description("sets up your workstation to get you ready to build")
  .addArgument(createArgument("filePath", "path to the config file"))
  .action(action);


export { program };
