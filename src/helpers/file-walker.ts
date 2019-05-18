// import fs = require('fs');
import {readdir, stat} from 'fs'

const path = require('path')

/**
 * recoursive method for find folders
 * @param dir directory
 * @param foldersName folders name
 * @param done callback
 */
function fileWalker(
  {
    dir,
    foldersName,
    log
  }: {
    dir: string;
    foldersName: string[];
    log?: boolean;
  },
  done: (err: NodeJS.ErrnoException | null, results?: string[]) => void
) {
  // arguments validation
  if (!foldersName) {
    console.log('no target folders provided')
    return null
  }

  let results: string[] = []

  readdir(dir, (err, list) => {
    if (err) return done(err)

    // folder to be parsed
    let pending = list.length

    // call callback if no folders
    if (!pending) return done(null, results)

    list.forEach(file => {
      file = path.resolve(dir, file)

      stat(file, (err, stat) => {
        // If directory, execute a recursive call
        if (stat && stat.isDirectory()) {
          // Add directory to array [comment if you need to remove the directories from the array]
          let folder = file.substr(file.lastIndexOf('\\') + 1)

          // check for folder path
          if (foldersName.includes(folder)) {
            if (log) {
              // tslint:disable-next-line: no-console
              console.log(file)
            }
            results.push(file)

            // stop recursive due to delete main folder
            if (!--pending) done(null, results)
            return
          }
          // don't recursive in node_modules folder
          if (folder === 'node_modules') {
            // call callback if no folders left to parse
            if (!--pending) done(null, results)
            return
          }

          // recursive
          fileWalker({dir: file, foldersName, log}, (err, res) => {
            if (res) {
              results = results.concat(res)
            }
            // call callback if no folders left to parse
            if (!--pending) done(null, results)
          })
        } else {
          // call callback if no folders left to parse
          if (!--pending) done(null, results)
        }
      })
    })
  })
}

// module.exports.fileWalker = fileWalker;
export {fileWalker}
