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
exports.action = void 0;
const config_utils_1 = require("../config.utils");
const action = (filePath) => {
    // parse config from provided file
    const parsed = (0, config_utils_1.parseConfigFile)(filePath);
    // validate config
    // TODO
    // execute config
    // TODO
    execute(parsed);
    return Promise.resolve();
};
exports.action = action;
const execute = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const currentOs = process.platform;
    const isSupported = config.system.supportedSystems.includes(currentOs);
    if (!isSupported) {
        console.error(`Error: This configuration is not supported on your current operating system (${currentOs}).
    Supported systems are: ${config.system.supportedSystems.join(", ")}. Please check your configuration.`);
        process.exit(1);
    }
    console.log(`Provisioning system for ${currentOs}...`);
    const modules = ["shell"]; //Object.keys(config.provision);
    console.log(`Modules to provision: ${modules.join(", ")}`);
    modules.forEach((module) => __awaiter(void 0, void 0, void 0, function* () {
        console.debug(`Provisioning ${module}...`);
        try {
            const handler = yield Promise.resolve(`${`./modules/${module}/handler`}`).then(s => __importStar(require(s)));
            console.log(`found module for ${module}`);
            const moduleConfigs = config.provision[module];
            console.log(`found module config for ${module}`, moduleConfigs);
            if (handler.handle) {
                yield handler.handle(moduleConfigs);
            }
        }
        catch (e) {
            console.error(`Error: Could not provision module ${module}.`);
            console.error(e);
        }
    }));
});
