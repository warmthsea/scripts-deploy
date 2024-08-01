import type { Client, FileEntryWithStats, SFTPWrapper } from 'ssh2'

export function getSftp(client: Client) {
  return new Promise<SFTPWrapper>((resolve) => {
    client.sftp(async (err, sftp) => {
      if (err)
        throw err

      resolve(sftp)
    })
  })
}

export function readWWWDir(sftp: SFTPWrapper, wwwPath: string) {
  return new Promise<FileEntryWithStats[]>((resolve) => {
    sftp.readdir(wwwPath, (err, list) => {
      if (err) {
        throw err
      }
      resolve(list)
    })
  })
}

export function deleteWWWDirAllConetents(sftp: SFTPWrapper, wwwPath: string, fileList: FileEntryWithStats[]) {
  const deletePromises = fileList.map((file) => {
    const itemPath = `${wwwPath}/${file.filename}`

    return new Promise<void>((resolve) => {
      sftp.stat(itemPath, async (err, stats) => {
        if (err) {
          console.error(`Error checking path: ${err}`)
        }

        if (stats.isDirectory()) {
          const list = await readWWWDir(sftp, itemPath)
          await deleteWWWDirAllConetents(sftp, itemPath, list)
          resolve()
        }

        if (stats.isFile()) {
          console.log(`Deleted ${itemPath}`)
          resolve()
          // sftp.unlink(itemPath, (err) => {
          //   if (err) {
          //     throw err
          //   }
          //   else {
          //     console.log(`Deleted ${file.filename}`)
          //     resolve()
          //   }
          // })
        }
      })
    })
  })

  return new Promise<void>((resolve) => {
    Promise.all(deletePromises).then(() => {
      resolve()
    })
  })
}
