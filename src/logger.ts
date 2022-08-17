import { Config } from './models/config'
import { blue, green, red, white } from 'chalk'
import {
  createLogger as createWinstonLogger,
  format,
  transports,
} from 'winston'
import { LOGGER_DONE } from './logmessages'

const colors = {
  error: red,
  info: green,
  verbose: blue,
  debug: blue,
}

const handleArrayObject = (message: any) => {
  let finalMessage = message || ''

  if (typeof message === 'object') {
    finalMessage = JSON.stringify(message, null, 2)
  }

  return finalMessage
}

const buildLogMessage = (context, formatFn) => {
  const { level, message, timestamp, ms } = context
  // @ts-ignore
  const splat = context[Symbol.for('splat')]

  const color = colors[level]

  const parsedContext = {
    timestamp,
    level: color(level.toUpperCase()),
    ms,
    message: color(handleArrayObject(message)),
    splat: handleArrayObject(splat),
  }

  return formatFn(parsedContext)
}

const simpleLog = format.printf((context) => {
  return buildLogMessage(context, ({ timestamp, level, message, splat }) => {
    return `${message}`
  })
})

const completeLog = format.printf((context) => {
  return buildLogMessage(context, ({ timestamp, level, message, splat }) => {
    return `${timestamp} [${level}]: ${message} ${splat}`
  })
})

const debugLog = format.printf((context) => {
  return buildLogMessage(
    context,
    ({ timestamp, level, ms, message, splat }) => {
      return `${timestamp} [${level}]: ${ms} ${message} ${splat}`
    },
  )
})

const createLoggerFormat = (config: Config) => {
  const logFormats = {
    error: completeLog,
    info: simpleLog,
    verbose: completeLog,
    debug: debugLog,
  }

  const logFormat = logFormats[config.loggerLevel] || simpleLog

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

  // logger.verbose(LOGGER_DONE)

  return logger
}
