import { Config } from './models/config'
import { blue, green, red, white } from 'chalk'
import {
  createLogger as createWinstonLogger,
  format,
  transports,
} from 'winston'

const colors = {
  error: red,
  info: green,
  verbose: blue,
  debug: blue,
}

const handleArrayObject = (message: any) => {
  let finalMessage = message

  if (typeof message === 'object') {
    finalMessage = JSON.stringify(message, null, 2)
  }

  return finalMessage
}

const simpleLog = format.printf((context) => {
  const { level, message } = context
  const color = colors[level]
  const finalMessage = handleArrayObject(message)
  return `${color(finalMessage)}`
})

const completeLog = format.printf((context) => {
  const { level, message, timestamp } = context
  const color = colors[level]

  const finalMessage = handleArrayObject(message)
  return `${timestamp} [${color(level.toUpperCase())}]: ${color(finalMessage)}`
})

const debugLog = format.printf((context) => {
  const { level, message, timestamp, ms } = context
  const color = colors[level]
  const finalMessage = handleArrayObject(message)
  return `${timestamp} [${color(level.toUpperCase())}]: ${ms} ${color(
    finalMessage,
  )}`
})

const createLoggerFormat = (config: Config) => {
  const logFormats = {
    error: completeLog,
    info: simpleLog,
    verbose: completeLog,
    debug: debugLog,
  }

  const logFormat = logFormats[config.loggerLevel]

  return format.combine(
    format.splat(),
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
    format.ms(),
    logFormat,
  )
}

export const createLogger = (config: Config) => {
  const logger = createWinstonLogger({
    levels: {
      error: 1,
      info: 2,
      verbose: 3,
      debug: 4,
    },
    level: config.loggerLevel !== 'none' ? config.loggerLevel : 'info',
    silent: config.loggerLevel === 'none',
    format: createLoggerFormat(config),
    transports: [new transports.Console()],
  })

  return logger
}
