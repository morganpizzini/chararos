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
* [Description](#description)
* [Install](#install)
* [Usage](#usage)
* [Generic commands](#generic-commands)
* [Arguments 'rename'](#arguments-rename)
* [Options](#options)
* [Contributing](#contributing)
<!-- tocstop -->
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
```sh-session
$ npm install -g chararos
$ chararos COMMAND
running command...
$ chararos (-v|--version|version)
chararos/1.0.7 win32-x64 node-v10.16.0
$ chararos --help [COMMAND]
USAGE
  $ chararos COMMAND
...
```
<!-- usagestop -->
# Commands

<!-- commands -->
* [`chararos clean DIRECTORY`](#chararos-clean-directory)
* [`chararos help [COMMAND]`](#chararos-help-command)
* [`chararos rename DIRECTORY FROMNAME TONAME`](#chararos-rename-directory-fromname-toname)

## `chararos clean DIRECTORY`

clean folder from unnecessary files

```
USAGE
  $ chararos clean DIRECTORY

ARGUMENTS
  DIRECTORY  directory

OPTIONS
  -d, --dryrun         make a dry run
  -f, --folder=folder  custom target folder to delete
  -h, --help           show CLI help
  -n, --node           cleanup node projects
  -v, --vs             cleanup vs projects
  --version            show CLI version

EXAMPLE
  $ chararos clean '%YOUR-PATH%' -v
  removing visual studio files
```

_See code: [src\commands\clean.ts](https://github.com/morganpizzini/chararos/blob/v1.0.7/src\commands\clean.ts)_

## `chararos help [COMMAND]`

display help for chararos

```
USAGE
  $ chararos help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src\commands\help.ts)_

## `chararos rename DIRECTORY FROMNAME TONAME`

rename folders name

```
USAGE
  $ chararos rename DIRECTORY FROMNAME TONAME

ARGUMENTS
  DIRECTORY  directory
  FROMNAME   from name
  TONAME     to name

OPTIONS
  -d, --dryrun  make a dry run
  -h, --help    show CLI help
  -s, --strict  strict search
  --version     show CLI version

EXAMPLE
  $ chararos rename '%YOUR-PATH%' "x" "y"
  rename folders from 'x' to 'y'
```

_See code: [src\commands\rename.ts](https://github.com/morganpizzini/chararos/blob/v1.0.7/src\commands\rename.ts)_
<!-- commandsstop -->

# Contributing
Feel free to add new feature and enhancement
