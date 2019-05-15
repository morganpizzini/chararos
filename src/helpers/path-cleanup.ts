function extractPath(args: string[], i: number) {
  let path = ''
  while (i < args.length && !args[i].endsWith("'")) {
    path += args[i] + ' '
    i++
  }
  if (i < args.length) {
    path += args[i]
  }
  return {
    path: pathCleanUp(path.trim()),
    index: i
  }
}
function pathCleanUp(path: string) {
  if (path.startsWith("'")) {
    // start string
    path = path.substr(1, path.length - 1)
  }
  if (path.endsWith("'")) {
    // end string
    path = path.substr(0, path.length - 1)
  }
  return path
}

module.exports.pathCleanUp = pathCleanUp
module.exports.extractPath = extractPath
