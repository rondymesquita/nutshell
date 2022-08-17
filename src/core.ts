import { fork } from 'child_process'
import { readdir } from 'fs-extra'
import { createLogger } from './logger'
import { Config } from './models/config'
import { exec, exportClassMembers } from './utils'

export let config: Config = {
  shell: 'bash',
  loggerLevel: 'info',
}

let logger = createLogger(config)

const prepareCommand = (cmd: string | Array<string> | TemplateStringsArray) => {
  let finalCmd: string | Array<string>
  if (typeof cmd === 'object') {
    finalCmd = cmd[0]
      .split('\n')
      .map((c) => c.trim())
      .filter((c) => c)
  } else {
    finalCmd = cmd.trim()
  }

  return finalCmd
}

export const $ = async (cmd: string | Array<string> | TemplateStringsArray) => {
  const finalCmd = prepareCommand(cmd)

  if (typeof finalCmd === 'object') {
    const results = []
    for (let index = 0; index < finalCmd.length; index++) {
      const cmd = finalCmd[index]

      logger.verbose(cmd)
      const result = await exec(cmd)
      logger.info(result.stdout)

      results.push(result)
    }
    return results
  } else {
    logger.verbose(finalCmd)
    const result = await exec(finalCmd)
    logger.info(result.stdout)

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
    childProcess.on('error', (error: Error) => {
      logger.error(error)
      reject(error)
    })
  })
}

export const setConfig = (userConfig: Partial<Config>) => {
  Object.assign(config, userConfig)
  logger = createLogger(config)
}

export const ls = async () => {
  logger.verbose('ls')
  const stdout = await readdir(process.cwd())
  logger.info(stdout)

  return stdout
}
