import {renameSync} from 'fs'

function renamePath(
  files: string[] | undefined,
  matchRegex: RegExp,
  newName: string,
  log: (s: string) => void
) {
  // args validation
  if (!files) {
    log('no file to delete!')
    return
  }

  // sort by length, for rename files then folder
  files = files.sort((a, b) => b.length - a.length)

  // loop through folders
  files.forEach(element => {
    const filename = element.replace(/^.*[\\\/]/, '')

    let splitFilename = element.split('\\')

    const newPath =
      splitFilename.slice(0, splitFilename.length - 1).join('\\') +
      '\\' +
      filename.replace(matchRegex, newName)

    log(`FROM:\t${element}`)
    log(`TO:\t${newPath}`)
    renameSync(element, newPath)
    log('---')
  })
}

export {renamePath}
