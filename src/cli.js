import { getDirContents, sortContents } from './parse'

let run = async () => {
  let dir = process.argv[2]
  let contents = await getDirContents(dir)
  console.info(sortContents(contents))
}

run()
