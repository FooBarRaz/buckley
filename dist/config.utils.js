"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseConfigFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function parseConfigFile(filePath) {
    const absolutePath = path_1.default.resolve(filePath);
    const fileContents = fs_1.default.readFileSync(absolutePath, 'utf-8');
    const config = JSON.parse(fileContents);
    return config;
}
exports.parseConfigFile = parseConfigFile;
