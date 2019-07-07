import { Command, flags } from '@oclif/command';
import { fileScraper } from '../helpers/file-scraper';
import { renamePath } from '../helpers/rename-path';


export default class Rename extends Command {
  static description = 'rename folders name'

  static examples = [
    `$ chararos rename '%YOUR-PATH%' "x" "y"
rename folders from 'x' to 'y'
use * as catch-all char, at start or end, for replace suffix and prefix
$ chararos rename '%YOUR-PATH%' "x*" "y"
`
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
    strict: flags.boolean({char: 's', default: false, description: 'strict search'})

    // looking for vs projects
    // vs: flags.boolean({
    //   char: 'v',
    //   default: false,
    //   description: 'cleanup vs projects'
    // }),

    // custom folder to delete
    // folder: flags.string({char: 'f', description: 'custom target folder to delete'})

    // directory: flags.string({char: 'd', default:undefined, description: 'where run cleaner'}),
  }

  // directory where run the cleaner
  static args = [
    {
      name: 'directory', // name
      required: true,
      description: 'directory' // description
    },
    {
      name: 'fromName', // name
      required: true,
      description: 'from name' // description
    },
    {
      name: 'toName', // name
      required: true,
      description: 'to name' // description
    }
  ]

  async run() {
    const {args, flags} = this.parse(Rename)

    let searchTerm: RegExp

    const matchAllChar = '*'

    // cleanup directory path
    let directory = args.directory
    if (directory === '.' || directory.startsWith('.')) {
      directory = directory.replace('.', process.cwd())
    }
    if (directory.endsWith('\\')) {
      directory = args.directory.substr(0, args.directory.length - 1)
    }

    let fromName = args.fromName
    const toName = args.toName

    let hasMatchAllChar = false
    // looking for catch-all char at start
    if (fromName.startsWith(matchAllChar)) {
      fromName = fromName = `(.?)+${fromName.substr(1)}`
      hasMatchAllChar = true
    }

    if (fromName.endsWith(matchAllChar)) {
      fromName = `${fromName.slice(0, -1)}(.?)+`
      hasMatchAllChar = true
    }

    // check for strict
    if (flags.strict) {
      searchTerm = new RegExp(`\\b${fromName}\\b`)
    } else {
      if (hasMatchAllChar) {
        searchTerm = new RegExp(`^${fromName}$`)
      } else {
        searchTerm = new RegExp(`${fromName}`)
      }
    }
    // remove files
    fileScraper(
      {dir: directory, searchTerm, log: flags.dryrun ? this.log : _ => {}},
      (err: any, data: any) => {
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
          this.log('nothing to rename')
          return
        }

        this.log(`Found ${data.length} occurrences`)

        // evaluate dryrun flag
        if (flags.dryrun) {
          this.warn('!dry-run! Folders above are going to be renamed')
          this.warn('Remove -dryrun for start renaming')
        } else {
          this.log('renaming..')

          // remove files from disk
          renamePath(data.map((x: any) => x.fileName), searchTerm, toName, this.log)
        }
      }
    )
  }
}
