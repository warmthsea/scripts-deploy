import process from 'node:process'
import path from 'node:path'
import { loadConfig } from 'unconfig'
import ora from 'ora'
import chalk from 'chalk'
import { Client } from 'ssh2'
import { utilAwaitTime } from './utils'
import type { ScriptsDeployOption } from './type'
import { deleteWWWDirAllConetents, getSftp, readWWWDir, uploadFiles } from './www-fs'

const { config } = await loadConfig<ScriptsDeployOption | undefined>({
  sources: [{
    files: 'deploy.config',
    extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
  }],
})

const rootDir = process.cwd()
const spinner = ora()

if (!config) {
  spinner.fail('deploy.config is not defined')
  process.exit()
}

spinner.start('Start load')
if (config.host && config.port && config.username && config.password && config.wwwPath) {
  spinner.succeed('Check user config success')
}
else {
  spinner.fail('Please check you deploy.config file')
  process.exit()
}

spinner.start(`Start connect ${chalk.blue('SSH')}`)

await utilAwaitTime(800)

const client = new Client()

client.connect({
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
}).on('ready', async () => {
  spinner.succeed('Client ready')
  try {
    const sftp = await getSftp(client)

    const list = await readWWWDir(sftp, config.wwwPath)
    await deleteWWWDirAllConetents(sftp, config.wwwPath, list)
    spinner.succeed('Delete Success All')

    const localDir = path.join(rootDir, config.rootDir)
    spinner.start(`Upload Files`)

    await utilAwaitTime(800)
    await uploadFiles(sftp, localDir, config.wwwPath)

    spinner.succeed('Upload Success All')
    client.end()
    process.exit()
  }
  catch (error) {
    console.log(error)
    client.end()
  }
}).on('error', (error) => {
  spinner.fail(error.message)
  process.exit()
})
