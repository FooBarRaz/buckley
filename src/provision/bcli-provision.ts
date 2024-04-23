#!/usr/bin/env node
import commander, { createArgument } from "commander";
import { action } from "./provision";

const cli = commander.createCommand("provision")

cli
  .name("provision")
  .option("-l, --list", "list all options")
  .option("-d, --dry", "do a dry-run without installing anything")
  .description("sets up your workstation to get you ready to build")
  .addArgument(createArgument("filePath", "path to the config file"))
  .action(action);


export { cli as program };
