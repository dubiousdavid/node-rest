import stdin from 'get-stdin'
import { getDirContents, sortContents } from './parse'

let run = async () => {
  let dir = process.argv[2]
  // Get directory file contents if directory is passed, otherwise read from stdin
  let contents = dir ? await getDirContents(dir) : [await stdin()]
  // Parse and sort contents
  console.info(sortContents(contents))
}

run()
