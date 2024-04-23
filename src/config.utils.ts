import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';


type Platforms = "darwin" | "win32" | "linux";

export type Configuration = {
  id: string;
  name: string;
  description: string;
  version: string;
  system: {
    supportedSystems: Array<Platforms>;
  },
  provision: {
    git: {

    }
  }
}

export function parseConfigFile(filePath: string): Configuration {
  const absolutePath = path.resolve(filePath);
  const fileContents = fs.readFileSync(absolutePath, 'utf-8');

  let config: Configuration;
  if (path.extname(filePath) === '.json') {
    config = JSON.parse(fileContents);
  } else if (path.extname(filePath) === '.yaml' || path.extname(filePath) === '.yml') {
    config = yaml.load(fileContents) as Configuration;
  } else {
    throw new Error(`Unsupported file type: ${filePath}`);
  }

  return config;
}