import fs from 'fs';
import path from 'path';

interface Configuration {
  installNode: boolean;
  installGit: boolean;
  // Add other configuration options as needed
}

function parseConfigFile(filePath: string): Configuration {
  const absolutePath = path.resolve(filePath);
  const fileContents = fs.readFileSync(absolutePath, 'utf-8');
  const config: Configuration = JSON.parse(fileContents);
  return config;
}