#!/usr/bin/env node
import { program as cli } from "commander";
import * as figlet from "figlet";

if (!process.argv.slice(2).length) {
  cli.outputHelp(figletPrint);
}

cli
  .command("install", "install one or more packages to your workstation", {
    executableFile: "./install/bcli-install",
  })
  .command("git", "helper functions related to git", {
    executableFile: "./git/bcli-git.js",
  })
  .command("provision", "workstation setup and configuration", {
    executableFile: "./provision/bcli-provision",
  })
  .parse(process.argv);

function figletPrint(text: string): string {
  let header = figlet.textSync("Buckley", {
    horizontalLayout: "default",
    verticalLayout: "default",
  });
  const subtitle = `########################### Build CLI (bcli)
    \n
    `;
  const banner = `${header}\n${subtitle}`;

  return banner;
}
