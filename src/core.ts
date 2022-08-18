import { fork } from 'child_process'
import { readdir } from 'fs-extra'
import { DEFAULT_CONFIG } from './coredefaults'
import { createLogger } from './logger'
import { Config } from './models'
import { exec } from './utils'

let logger = createLogger(DEFAULT_CONFIG)
export let config = Object.assign({}, DEFAULT_CONFIG)

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

/**
 *
 * Runs a command using child_process.exec.
 */
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

/**
 *
 * Changes current directory using process.chdir.
 */
export const cd = (dir: string) => {
  logger.debug(`cd ${dir}`)
  process.chdir(dir)
}

/**
 *
 * Run a command in a separated process using child_process.fork.
 */
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

/**
 *
 * Update new configuration.
 */
export const setConfig = (userConfig: Partial<Config>) => {
  Object.assign(config, userConfig)
  logger = createLogger(config)
}

/**
 *
 * Lists file and directories from current working directory.
 */
export const ls = async () => {
  logger.verbose('ls')
  const stdout = await readdir(process.cwd())
  logger.info(stdout)

  return stdout
}
