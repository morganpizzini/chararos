import {Command, flags} from '@oclif/command'
import {sumBy} from 'lodash'

import {formatBytes} from '../helpers/file-size'
import {dirWalker} from '../helpers/dir-walker'
import {removeFromDisk} from '../helpers/remove-from-disk'

export default class Clean extends Command {
  static description = 'clean folder from unnecessary files'


  static examples = [
    `$ chararos clean '%YOUR-PATH%' -v
removing visual studio files
`,
  ]

  static flags = {
    // add --version flag to show CLI version
    version: flags.version(),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    // force: flags.boolean({ char: 'f' }),

    // dry run
    dryrun: flags.boolean({
      char: 'd',
      default: false,
      description: 'make a dry run'
    }),

    // looking for node projects
    node: flags.boolean({char: 'n', default: false, description: 'cleanup node projects'}),

    // looking for vs projects
    vs: flags.boolean({
      char: 'v',
      default: false,
      description: 'cleanup vs projects'
    }),

    // custom folder to delete
    folder: flags.string({char: 'f', description: 'custom target folder to delete'})

    // directory: flags.string({char: 'd', default:undefined, description: 'where run cleaner'}),
  }

  // directory where run the cleaner
  static args = [
    {
      name: 'directory', // name
      required: true,
      description: 'directory' // description
    }
  ]

  async run() {
    const {args, flags} = this.parse(Clean)

    const folders: string[] = []

    // vs arguments validator
    if (flags.vs) {
      folders.push('bin')
      folders.push('obj')
    }

    // node arguments validator
    if (flags.node) {
      folders.push('node_modules')
    }

    // file arguments validator
    if (flags.folder) {
      folders.push(flags.folder)
    }

    // cleanup directory path
    let directory = args.directory;
    if (directory === '.' || directory.startsWith('.')) {
      directory = directory.replace('.', process.cwd())
    }
    if (directory.endsWith('\\')) {
      directory = args.directory.substr(0, args.directory.length - 1)
    }

    // remove files
    dirWalker({dir: directory, foldersName: folders, log: flags.dryrun ? this.log : _ => {}}, (err: any, data: any) => {
      // check errors
      if (err) {
        throw err
      }

      // check datas
      if (!data) {
        this.log('Ops! An error as occured and we cannot process datas')
        return
      }

      // no data founds
      if (data.length === 0) {
        this.log('nothing to remove')
        return
      }

      // evaluate dryrun flag
      if (flags.dryrun) {
        this.warn(
          `!dry-run! Folders above are going to be deleted (${formatBytes(
            sumBy(data, (x: any) => x.folderSize)
          )})`
        )
        this.warn('Remove -dryrun for start cleaning up')
      } else {
        this.log('removing..')

        // remove files from disk
        removeFromDisk(data.map((x: any) => x.folderName), this.log)
      }
    })
  }
}
