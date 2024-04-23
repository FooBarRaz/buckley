```
  ____             _    _
 | __ ) _   _  ___| | _| | ___ _   _
 |  _ \| | | |/ __| |/ / |/ _ \ | | |
 | |_) | |_| | (__|   <| |  __/ |_| |
 |____/ \__,_|\___|_|\_\_|\___|\__, |
                               |___/
########################### Build CLI (bcli)
```

A Command Line Interface for Build Teams

# What is Buckley?

Buckley is a modular and extensible CLI tool made to help Build Teams with rapid development.
It automates the provisioning of workstations with a set of tools and configurations to minimize time spent onboarding new team members and share good practices via tooling.

# Installation

To get started, run:

`curl https://raw.githubusercontent.com/FooBarRaz/buckley/main/bootstrap.sh | bash`

Once `bcli` is installed, you can run `bcli --help` for a list of available commands.

# Features

## Workstation Setup (`bcli provision`)

The configuration file should be a JSON file that specifies what tools and configurations to install on your workstation. Here's an example of what it might look like:

```json
{
  "system": {
    "supportedSystems": ["darwin", "linux"]
  },
  "provision": {
    "node": {
      "install": ["14"],
      "use": ["14"],
      "packageManager": "npm",
      "packages": [
        {
          "name": "typescript",
          "version": "latest",
          "global": true
        }
      ]
    }
  }
}
```

### Supported Provisioning Modules

#### Shell

The shell module handles the configuration of your shell environment. It can set environment variables, aliases, and more. Here's an example of how to use it in your configuration file:

```json
"shell": {
  "commands": [
    "export PATH=$PATH:/usr/local/bin",
    "alias ll='ls -la'"
  ],
  "scripts": [
    "./my-repo/setup.sh"
  ]
}
```

Commands are for one-liners, while scripts are for running shell scripts and multi-line commands.

#### Brew

The brew module handles the installation of Homebrew packages. It will ensure homebrew is installed before proceeding. Here's an example of how to use it in your configuration file:

```json
"brew": {
  "packages": ["wget", "jq", "--cask visual-studio-code"]
}
```

This configuration will install the wget and jq packages using Homebrew. To install casks, simply prefix the package name with --cask.

#### Git

The git module handles the configuration of Git, including setting up SSH keys for authentication. Here's an example of how to use it in your configuration file:

```json
"git": {
  "ssh": {
    "keyName": "my_rsa_key",
    "email": "example@example.com"
  },
  "clone": [{
    "name": "My-Repo",
    "path": "~/my-projects",
    "url": "git@github.com/myOrg/my-repo.git",
  }]
}
```

This configuration will setup the SSH keypair located at ~/.ssh/my_rsa_key for authentication with Git using the email you@example.com.
It will also clone the provided repos to the specified paths.

#### Node.js

The node module handles the installation and configuration of Node.js and npm packages. Here's an example of how to use it in your configuration file:
```json
"node": {
  "install": ["14"],
  "use": ["14"],
  "packageManager": "npm",
  "packages": [
    {
      "name": "typescript",
      "version": "latest",
      "global": true
    }
  ]
}
```

This module requires nvm for package management and will ensure it's installed before proceeding.

This configuration will install Node.js version 14, switch to it, and then install the TypeScript package globally.

Please note that the actual structure of the configuration file might be different depending on what modules are available in your bcli installation. You should check each module's handler.ts file for more details on how to use it.

This configuration file will install Node.js version 14, switch to it, and then install the TypeScript package globally.

## Contributing

The CLI is built using Node.js. There is a large variety of powerful tools available for building CLIs in Node.js, and JS skills tend to be more ubiquitous on most teams than bash skills. Even if you're particularly good at bash scripting, you'll find that it's a lot easier to do things in JS that would otherwise be quite painful to accomplish in bash.

This project, like most, is a perpetual work-in-progress and is intended to be maintained by the collective Build community.
Please feel free to make enhancements and improvements as you see fit, and merge directly to master (for now).

### References

Here are some useful libraries that are currently (or will soon be) in use in this project.

- [Commander.js](https://github.com/tj/commander.js/) - a powerful tool for building out command-line interfaces. Provides useful functions for organizing commands, parsing arguments, and outputting help.
- [Chalk](https://github.com/chalk/chalk) - A handy text-styling tool
- [JS Config Store](https://github.com/andrewhayward/js-config-store) - a tool for storing and reading local configs
- [Figlet](https://www.npmjs.com/package/figlet) - ASCII-based banners
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) - A tool for creating command-line prompts
- [Child Process](https://nodejs.org/api/child_process.html) - A node.js module that provides the ability to execute shell commands and spawn child processes

## Coming Soon

- Bootstrappers for different kinds of projects/services
- Abstract funtionality for making commits, running tests, shipping code, etc
- Project-specific configs
