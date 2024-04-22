#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const figlet = __importStar(require("figlet"));
if (!process.argv.slice(2).length) {
    commander_1.program.outputHelp(figletPrint);
}
commander_1.program
    .command("install", "install one or more packages to your workstation", {
    executableFile: "install/bcli-install",
})
    .command("git", "helper functions related to git", {
    executableFile: "git/bcli-git.js",
})
    .command("provision", "workstation setup and configuration", {
    executableFile: "provision/bcli-provision",
})
    .parse(process.argv);
function figletPrint(text) {
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
