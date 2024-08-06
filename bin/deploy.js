#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { exec } from 'node:child_process' // 确保导入 exec
import { Command } from 'commander'

const program = new Command()
const rootDir = process.cwd()
const gitignorePath = path.join(rootDir, '.gitignore')

const configFileName = 'deploy.config.js'
const gitignoreFileName = 'deploy.config'

program
  .name('deploy')
  .description('A simple deployment tool')
  .version('1.0.0')

// 定义 init 命令
program.command('init').description('Initialize the deployment configuration').action(() => {
  const configPath = path.join(rootDir, configFileName)

  if (!fs.existsSync(configPath)) {
    const configContent = `// Deployment configuration
export default {
  host: '192.xxx',
  port: 10022,
  username: 'xxx',
  password: 'xxx',
  wwwPath: '/usr/xxx/xxx',
  rootDir: '/dist'
};\n`

    fs.writeFile(configPath, configContent, (err) => {
      if (err) {
        console.error(`Error creating ${configFileName}:`, err)
      }
      else {
        console.log(`${configFileName} created successfully!`)
        addToGitignore()
      }
    })
  }
  else {
    console.log(`${configFileName} already exists.`)
    addToGitignore()
  }
})

if (process.argv.length === 2) {
  exec('npm run start', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`Script error: ${stderr}`)
      return
    }
    console.log(stdout)
  })
}
else {
  program.parse(process.argv)
}

function addToGitignore() {
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8')
    if (!gitignoreContent.includes(gitignoreFileName)) {
      fs.appendFile(gitignorePath, `\n${gitignoreFileName}.*`, (err) => {
        if (err) {
          console.error('Error updating .gitignore:', err)
        }
        else {
          console.log(`${gitignoreFileName} added to .gitignore.`)
        }
      })
    }
    else {
      console.log(`${gitignoreFileName} is already in .gitignore.`)
    }
  }
  else {
    console.log('.gitignore does not exist.')
  }
}
