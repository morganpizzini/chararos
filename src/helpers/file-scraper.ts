// import fs = require('fs');
import {readdir, stat} from 'fs'

import {FileScraperResult} from '../models/file-scraper-result'

// const getFileSize = require('get-folder-size')

const path = require('path')

/**
 * recoursive method for find folders
 * @param dir directory
 * @param foldersName folders name
 * @param done callback
 */
function fileScraper(
  {
    dir,
    searchTerm,
    log
  }: {
    // directory to look in
    dir: string;
    // search term to look for
    searchTerm: RegExp;
    // logger function
    log(s: string): void;
  },
  done: (err: NodeJS.ErrnoException | null, results?: FileScraperResult[]) => void
) {
  // arguments validation
  if (!searchTerm) {
    log('no target folders provided')
    return null
  }

  let results: FileScraperResult[] = []

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

        // Add directory to array [comment if you need to remove the directories from the array]
        let folder = file.substr(file.lastIndexOf('\\') + 1)

        // check for folder path

        if (searchTerm.test(folder)) {
          log(file)

          results.push({
            fileName: file
          })
        }

        if (stat.isDirectory()) {
          // recursive if directive
          fileScraper({dir: file, searchTerm, log}, (err, res) => {
            if (res) {
              results = results.concat(res)
            }
            // call callback if no folders left to parse
            if (!--pending) done(null, results)
          })
        } else {
          if (!--pending) done(null, results)
        }
      })
    })
  })
}

export { fileScraper }
