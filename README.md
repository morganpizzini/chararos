Chararos
========


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/chararos.svg)](https://npmjs.org/package/chararos)
[![Downloads/week](https://img.shields.io/npm/dw/chararos.svg)](https://npmjs.org/package/chararos)
[![License](https://img.shields.io/npm/l/chararos.svg)](https://github.com/morganpizzini/chararos/blob/master/package.json)

# Description

Usefull CLI commands for handle standard projects issues, like remove unecessary files or duplicate/rename files and folders

With Chararos you can:

- Destroy all folders that fill space.
  - Select a target directory and remove all projects temporary files, like node_modules, bin or obj directory. Or choose your own directory to delete
- Rename all occurence of string, in directory or file name, from provided path
  - Select a target directory, a name and his replace.


# Install
```console
$ npm i -g chararos
```
<!-- toc -->
# Usage
```console
$ chararos clean <directory> <opts>
$ chararos rename <directory> <opts>
---
or
---
$ npx chararos <directory> <opts>
```
<!-- usage -->
# Generic commands

## Options
| Command | Description | Sample | Default
|---|---|--|--|
| `-h` / `--help` | Get help | `chararos -h` |
| `--version` | Get CLI version | `chararos -v/version` |

## Clean Command

### Clean Arguments

- **DIRECTORY**  set target directory. \[REQUIRED\]

Sample command `chararos clean 'C:\Users\<usr_name>\Desktop\Projects'` or `chararos clean .`

### Clean Options

| Command | Description | Sample | Default
|---|---|--|--|
| `-h` / `--help` | Get help | `chararos clean -h` |
| `--version` | Get CLI version | `chararos clean --version` |
| `-d` / `--dryrun` | Dry run process for getting forecast about folders to be removed | `chararos clean <dir> -d` | false |
| `-n` / `--node` | Setup for remove `node_modules` | `chararos clean <dir> -n` | false |
| `-v` / `--vs` | Setup for remove `bin` and `obj` | `chararos clean <dir> -v` | false |
| `-f` / `--folder` | Looking for a specific folder to remove | `chararos clean <dir> -f=<folder>` |  |

# Arguments 'rename'

- **DIRECTORY** set target directory. \[REQUIRED\]
- **FROMNAME** set name to replace. \[REQUIRED\]
- **TONAME** set new name. \[REQUIRED\]

Sample command `chararos rename 'C:\Users\<usr_name>\Desktop\Projects' 'x' 'y'` or `chararos rename .  'x' 'y'`

# Options
| Command | Description | Sample | Default
|---|---|--|--|
| `-h` / `--help` | Get help | `chararos rename -h` |
| `-v` / `--version` | Get CLI version | `chararos rename --v` |
| `-d` / `--dryrun` | Dry run process for getting forecast about folders to be removed | `chararos rename <dir> -d` | false |
| `-s` / `--strict` | Looking for strict match | `chararos rename <dir> <from> <to> -s` | false |
<!-- commands -->

# Contributing
Feel free to add new feature and enhancement