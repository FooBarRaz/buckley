import fs from 'fs';
import path from 'path';

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
  const config: Configuration = JSON.parse(fileContents);
  return config;
}