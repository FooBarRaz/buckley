#!/usr/bin/env node
const commander = require('commander');
const { cloneRepos }  = require('./cloneRepos');
const { configureAliases } = require('./configureGit');

const cli = new commander.Command();

cli
    .command('clone')
    .description('clones repos defined for your project')
    .option('-p, --project <name>', 'name of project')
    .option('-d, --dir <dirNamh>', 'absolute path to directory')
    .action(cloneRepos);

cli
    .command('config-aliases')
    .description('configures git aliases')
    .action(configureAliases);

cli.parse(process.argv);
