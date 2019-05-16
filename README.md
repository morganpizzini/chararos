Chararos
========


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/chararos.svg)](https://npmjs.org/package/chararos)
[![Downloads/week](https://img.shields.io/npm/dw/chararos.svg)](https://npmjs.org/package/chararos)
[![License](https://img.shields.io/npm/l/chararos.svg)](https://github.com/morganpizzini/chararos/blob/master/package.json)

# Description
Destroy all folders that fill space.

Select a target directory and remove all projects temporary files, like node_modules, bin or obj directory. Or choose your own directory to delete


# Install
```console
$ npm i -g chararos
```
<!-- toc -->
# Usage
```console
chararos <directory> <opts>
---
or
---
npx chararos <directory> <opts>
```
<!-- usage -->
# Arguments
**DIRECTORY** set target directory. Es. `chararos 'C:\Users\<usr_name>\Desktop\Projects'`
# Options
| Command | Description | Sample | Default
|---|---|--|--|
| `-h` / `--help` | Get help | `chararos -h` |
| `--version` | Get CLI version | `chararos -/version` |
| `-d` / `--dryrun` | Dry run process for getting forecast about folders to be removed | `chararos <dir> -d` | false |
| `-n` / `--node` | Setup for remove `node_modules` | `chararos <dir> -n` | false |
| `-v` / `--vs` | Setup for remove `bin` and `obj` | `chararos <dir> -v` | false |
| `-f` / `--folder` | Looking for a specific folder to remove | `chararos <dir> -f=<folder>` |  |
<!-- commands -->

# Contributing
Feel free to add new feature and enhancement