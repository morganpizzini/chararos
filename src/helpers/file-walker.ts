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
  dir: string,
  foldersName: string[],
  done: (err: NodeJS.ErrnoException | null, results?: string[]) => void
) {
  let results: string[] = []

  readdir(dir, (err, list) => {
    if (err) return done(err)

    let pending = list.length

    if (!pending) return done(null, results)
    list.forEach(file => {
      file = path.resolve(dir, file)

      stat(file, (err, stat) => {
        // If directory, execute a recursive call
        if (stat && stat.isDirectory()) {
          // Add directory to array [comment if you need to remove the directories from the array]
          let folder = file.substr(file.lastIndexOf('\\') + 1)
          // check for folder path
          if (foldersName && foldersName.includes(folder)) {
            results.push(file)
            // stop recursive due to delete main folder
            if (!--pending) done(null, results)
            return
          }
          fileWalker(file, foldersName, (err, res) => {
            if (res) {
              results = results.concat(res)
            }
            if (!--pending) done(null, results)
          })
        } else {
          // file found
          //   results.push(file);
          if (!--pending) done(null, results)
        }
      })
    })
  })
}

// module.exports.fileWalker = fileWalker;
export {fileWalker}
