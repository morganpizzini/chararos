// import fs = require('fs');
import {readdir, stat} from 'fs'

import {DirWalkerResult} from '../models/dir-walker-result'

import {calculateDirSize, formatBytes} from './file-size'

// const getFileSize = require('get-folder-size')

const path = require('path')

/**
 * recoursive method for find folders
 * @param dir directory
 * @param foldersName folders name
 * @param done callback
 */
function dirWalker(
  {
    dir,
    foldersName,
    log
  }: {
    // directory to look in
    dir: string;
    // folder name to look for
    foldersName: string[];
    // logger function
    log(s: string): void;
  },
  done: (err: NodeJS.ErrnoException | null, results?: DirWalkerResult[]) => void
) {
  // arguments validation
  if (!foldersName) {
    log('no target folders provided')
    return null
  }

  let results: DirWalkerResult[] = []

  readdir(dir, (err, list) => {
    if (err) return done(err)

    // folder to be parsed
    let pending = list.length

    // call callback if no folders
    if (!pending) return done(null, results)

    list.forEach(file => {
      file = path.resolve(dir, file)

      stat(file, (err, stat) => {
        if (err) {
          log('error occured' + JSON.stringify(err))
          // call callback if no items left to parse
          if (!--pending) done(null, results)
          return
        }

        // If directory, execute a recursive call
        if (stat && stat.isDirectory()) {
          // Add directory to array [comment if you need to remove the directories from the array]
          let folder = file.substr(file.lastIndexOf('\\') + 1)

          // check for folder path
          if (foldersName.includes(folder)) {
            const folderSize = calculateDirSize(file)

            log(`${file} (${formatBytes(folderSize)})`)

            results.push({
              folderName: file,
              folderSize
            })

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
          dirWalker({dir: file, foldersName, log}, (err, res) => {
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

export {dirWalker}
