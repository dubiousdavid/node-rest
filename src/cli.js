import { readFiles } from './parse'

let run = async () => {
  let dir = process.argv[2]
  let files = await readFiles(dir)
  console.log(files);
}

run()
