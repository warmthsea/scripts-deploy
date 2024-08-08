/* eslint-disable no-async-promise-executor */
import path from 'node:path'
import type { Client, FileEntryWithStats, SFTPWrapper, Stats } from 'ssh2'
import type { Ora } from 'ora'
import { getLoaclDirStat, readLoaclDir } from './local-fs'

export function getSftp(client: Client) {
  return new Promise<SFTPWrapper>((resolve) => {
    client.sftp(async (err, sftp) => {
      if (err)
        throw err

      resolve(sftp)
    })
  })
}

export function getWWWDirStat(sftp: SFTPWrapper, wwwPath: string) {
  return new Promise<Stats>((resolve) => {
    sftp.stat(wwwPath, async (err, stats) => {
      if (err)
        throw err

      resolve(stats)
    })
  })
}

export function readWWWDir(sftp: SFTPWrapper, wwwPath: string) {
  return new Promise<FileEntryWithStats[]>((resolve) => {
    sftp.readdir(wwwPath, (err, list) => {
      if (err)
        throw err

      resolve(list)
    })
  })
}

export function createWWWDir(sftp: SFTPWrapper, remoteFilePath: string) {
  return new Promise<void>((resolve) => {
    sftp.mkdir(remoteFilePath, {}, (err) => {
      if (err)
        throw err

      resolve()
    })
  })
}

export function deleteDir(sftp: SFTPWrapper, wwwPath: string) {
  return new Promise<void>((resolve) => {
    sftp.rmdir(wwwPath, (err) => {
      if (err)
        throw err

      resolve()
    })
  })
}

export function deleteFile(sftp: SFTPWrapper, wwwFilePath: string) {
  return new Promise<void>((resolve) => {
    sftp.unlink(wwwFilePath, (err) => {
      if (err)
        throw err

      resolve()
    })
  })
}

export function deleteWWWDirAllConetents(sftp: SFTPWrapper, wwwPath: string, fileList: FileEntryWithStats[]) {
  const deletePromises = fileList.map((file) => {
    const itemPath = `${wwwPath}/${file.filename}`

    return new Promise<void>(async (resolve) => {
      const stats = await getWWWDirStat(sftp, itemPath)

      if (stats.isDirectory()) {
        const list = await readWWWDir(sftp, itemPath)
        await deleteWWWDirAllConetents(sftp, itemPath, list)
        await deleteDir(sftp, itemPath)
        resolve()
      }

      if (stats.isFile()) {
        await deleteFile(sftp, itemPath)
        resolve()
      }
    })
  })

  return new Promise<void>((resolve) => {
    Promise.all(deletePromises).then(() => {
      resolve()
    })
  })
}

export function sendLocaWWWfile(sftp: SFTPWrapper, localFilePath: string, remoteFilePath: string) {
  return new Promise<void>((resolve) => {
    sftp.fastPut(localFilePath, remoteFilePath, async (err) => {
      if (err)
        throw err

      resolve()
    })
  })
}

export async function uploadFiles(spinner: Ora, sftp: SFTPWrapper, localDir: string, wwwPath: string) {
  const files = await readLoaclDir(localDir)

  for (const [index, file] of files.entries()) {
    const localFilePath = path.join(localDir, file)
    const remoteFilePath = path.posix.join(wwwPath, file)

    const stats = await getLoaclDirStat(localFilePath)

    if (stats.isDirectory()) {
      await createWWWDir(sftp, remoteFilePath)
      spinner.start(`Create folder ${localFilePath}`)
      await uploadFiles(spinner, sftp, localFilePath, remoteFilePath)
    }
    else {
      await sendLocaWWWfile(sftp, localFilePath, remoteFilePath)
      spinner.start(`Upload files [${index + 1}/${files.length}] ${localFilePath}`)
    }
  }
}
