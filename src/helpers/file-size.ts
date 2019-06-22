import {readdirSync, statSync} from 'fs'
import {sum} from 'lodash'
//const sum = require('lodash').sum

function calculateDirSize(dir: any): number {
  dir = dir.replace(/\/$/, '')
  return sum(
    readdirSync(dir).map(function (file: any) {
      let fileOrDir = statSync([dir, file].join('/'))
      if (fileOrDir.isFile()) {
        return fileOrDir.size
      } else if (fileOrDir.isDirectory()) {
        return calculateDirSize([dir, file].join('/'))
      }
    })
  )
}

const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
const k = 1024

/**
 * format byte to readable size
 * @param bytes bytes
 * @param decimals decimal to take
 */
function formatBytes(bytes: number, decimals= 0): string {
  if (bytes === 0) {
    return '0 Bytes'
  }
  const dm = decimals <= 0 ? 0 : decimals || 2
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export {calculateDirSize, formatBytes}
