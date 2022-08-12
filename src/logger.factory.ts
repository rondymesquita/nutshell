import { Config } from './models/config'
import chalk from 'chalk'

export const createLogger = (config: Config) => {
  // console.log({ config })

  const debug = (message: any, ...params: any[]) => {
    if (['debug'].includes(config.logger)) {
      const finalMessage = message ? message : 'undefined'
      console.log(`${chalk.white(finalMessage)}`, ...params)
    }
  }

  const verbose = (message: any, ...params: any[]) => {
    if (['verbose', 'debug'].includes(config.logger)) {
      console.log(`${chalk.greenBright(message)}`, ...params)
    }
  }

  const info = (message: any, ...params: any[]) => {
    if (['info', 'verbose', 'debug'].includes(config.logger)) {
      console.log(`${chalk.blueBright(message)}`, ...params)
    }
  }

  // debug({ config })

  return {
    debug,
    verbose,
    info,
  }
}
