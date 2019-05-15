let rimraf = require('rimraf')

function removeFromDisk(files: string[] | undefined) {
  if (!files) {
    // tslint:disable-next-line: no-console
    console.log('no file to delete!')
    return
  }
  files.forEach(element => {
    rimraf(element, () => {
      // tslint:disable-next-line: no-console
      console.log('removed', element)
    })
  })
}

export {removeFromDisk}
