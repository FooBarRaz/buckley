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

function parseFile(filePath: string): any {
  const absolutePath = path.resolve(filePath);
  const fileContents = fs.readFileSync(absolutePath, 'utf-8');

  let data: any;
  if (path.extname(filePath) === '.json') {
    data = JSON.parse(fileContents);
  } else if (path.extname(filePath) === '.yaml' || path.extname(filePath) === '.yml') {
    data = yaml.load(fileContents);
  } else {
    throw new Error(`Unsupported file type: ${filePath}`);
  }

  return data;
}

export function parseConfigFile(filePath: string, varsFilePath?: string): Configuration {
  let fileContents = fs.readFileSync(path.resolve(filePath), 'utf-8');

  if (varsFilePath) {
    const vars = parseFile(varsFilePath);

    for (const [key, value] of Object.entries(vars)) {
      console.log('looking to replace: ', key, 'with: ', value, 'in: ', filePath);
      const placeholder = new RegExp(`\\$\{${key}\}`, 'g');
      fileContents = fileContents.replace(placeholder, value as string);
    }
  }


  return JSON.parse(fileContents) as Configuration;
}