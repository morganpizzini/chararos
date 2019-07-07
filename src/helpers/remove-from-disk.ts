// let rimraf = require('rimraf')
// const { cli } = require('cli-ux')
// import * as rimraf from 'rimraf'
const rimraf = require('rimraf')

function removeFromDisk(files: string[] | undefined, log: (s: string) => void) {
  // args validation
  if (!files) {
    // tslint:disable-next-line: no-console
    log('no file to delete!')
    return
  }

  // loop through folders
  files.forEach(element => {
    rimraf(element, () => {
      // tslint:disable-next-line: no-console
      log('removed: ' + element)
    })
  })
}

export {removeFromDisk}
