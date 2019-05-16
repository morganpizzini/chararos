import { Command, flags } from '@oclif/command';
import { fileWalker } from './helpers/file-walker';
import { removeFromDisk } from './helpers/remove-from-disk';


class Chararos extends Command {
  static description = 'describe the command here'

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
      name: 'directory', // name of arg to show in help and reference with args[name]
      required: true, // make the arg required with `required: true`
      description: 'directory' // help description
    }
  ]

  async run() {
    const {args, flags} = this.parse(Chararos)

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
    // remove files
    fileWalker(args.directory, folders, (err, data) => {
      if (err) {
        throw err
      }
      if (flags.dryrun) {
        this.log('!dry-run! remove')
        if (data) {
          if (data.length === 0) {
            this.log('nothing to remove')
          }
          data.forEach(x => this.log(x))
        } else {
          this.log('nothing to remove')
        }
        return
      }

      this.log('removing..')
      // remove file from disk
      removeFromDisk(data)
    })
  }
}

export = Chararos
