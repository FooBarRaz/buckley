"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const child_process_1 = require("child_process");
function setEnvironmentVariables(config) {
    Object.entries(config.env_variables).forEach(([key, value]) => {
        process.env[key] = value;
        console.log(`Environment variable set: ${key}=${value}`);
    });
}
// Define aliases
function defineAliases(config) {
    Object.entries(config.aliases).forEach(([alias, command]) => {
        (0, child_process_1.exec)(`alias ${alias}='${command}'`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error defining alias: ${alias}`);
                console.error(stderr);
            }
            else {
                console.log(`Alias defined successfully: ${alias}`);
                console.log(stdout);
            }
        });
    });
}
const executeCommand = (command) => {
    console.log("executeCommand l:36", command);
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${command}`);
                console.error(stderr);
                reject(error);
            }
            else {
                console.log(`Command executed successfully: ${command}`);
                console.log(stdout);
                resolve(stdout);
            }
        });
    });
};
const executeCommands = (commands) => __awaiter(void 0, void 0, void 0, function* () {
    for (const command of commands) {
        try {
            yield executeCommand(command);
        }
        catch (error) {
            console.error(`Error executing command: ${command}`);
            console.error(error);
        }
    }
});
const handler = (config) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('executing shell handler: ', config);
    // Execute commands
    yield executeCommands(config.commands);
    // Execute scripts
    (_a = config.scripts) === null || _a === void 0 ? void 0 : _a.forEach((script) => {
        (0, child_process_1.exec)(`bash ${script}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${script}`);
                console.error(stderr);
            }
            else {
                console.log(`Script executed successfully: ${script}`);
                console.log(stdout);
            }
        });
    });
    setEnvironmentVariables(config);
    defineAliases(config);
});
exports.handler = handler;
