import type { Stats } from 'node:fs'
import fs from 'node:fs'

export function readLoaclDir(localDir: string) {
  return new Promise<string[]>((resolve) => {
    fs.readdir(localDir, (err, files) => {
      if (err)
        throw new Error(`read ${localDir} error`)

      resolve(files)
    })
  })
}

export function getLoaclDirStat(localFilePath: string) {
  return new Promise<Stats>((resolve) => {
    fs.stat(localFilePath, async (err, stats) => {
      if (err)
        throw err

      resolve(stats)
    })
  })
}
