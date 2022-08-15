import { fork } from 'child_process'
import { readdir } from 'fs-extra'
import { createLogger } from './logger'
import { Config } from './models/config'
import { exec, exportClassMembers } from './utils'

export let config: Config = {
  shell: 'bash',
  quiet: false,
  loggerLevel: 'debug',
}

let logger = createLogger(config)

export const $ = async (cmd: string | Array<string> | TemplateStringsArray) => {
  let finalCmd: string | Array<string>
  if (typeof cmd === 'object') {
    finalCmd = cmd[0]
      .split('\n')
      .map((c) => c.trim())
      .filter((c) => c)
  } else {
    finalCmd = cmd.trim()
  }

  if (typeof finalCmd === 'object') {
    const results = []
    for (let index = 0; index < finalCmd.length; index++) {
      const cmd = finalCmd[index]

      logger.input(cmd)
      const result = await exec(cmd)
      logger.data(result.stdout)

      results.push(result)
    }
    return results
  } else {
    logger.input(finalCmd)
    const result = await exec(finalCmd)
    logger.data(result.stdout)

    return result
  }
}

export const cd = (dir: string) => {
  logger.debug(`cd ${dir}`)
  process.chdir(dir)
}

export const withContext = async (fn: Function) => {
  const childProcess = fork(`${__dirname}/subprocess`, ['subprocess'])
  childProcess.send({ fn: fn.toString() })

  return new Promise((resolve, reject) => {
    childProcess.on('close', (exitCode) => {
      resolve({ exitCode })
    })
    childProcess.on('error', (exitCode) => {
      reject({ exitCode })
    })
  })
}

export const setConfig = (userConfig: Partial<Config>) => {
  Object.assign(config, userConfig)
  logger = createLogger(config)
}

export const ls = async () => {
  const stdout = await readdir(process.cwd())
  logger.data(stdout)
  return stdout
}
