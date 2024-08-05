import fs from 'node:fs'
import path from 'node:path'
import type { SFTPWrapper } from 'ssh2'

export function readLoaclDir(localDir: string) {
  return new Promise<string[]>((resolve) => {
    fs.readdir(localDir, (err, files) => {
      if (err)
        throw err

      resolve(files)
    })
  })
}
