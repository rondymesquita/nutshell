import { Config } from './models/config'
import { blue, green, red, white } from 'chalk'
import {
  createLogger as createWinstonLogger,
  format,
  Logger,
  transports,
} from 'winston'

const colors = {
  info: green,
  data: green,
  debug: blue,
  input: blue,
  error: red,
  trace: white,
}

const simpleLog = format.printf(({ level, message }) => {
  const color = colors[level]
  return `${color(message)}`
})

const completeLog = format.printf((context) => {
  const { level, message, timestamp } = context
  const color = colors[level]
  return `${timestamp} [${color(level.toUpperCase())}]: ${color(message)}`
})

const traceLog = format.printf((context) => {
  const { level, message, timestamp, ms } = context
  const color = colors[level]
  return `${timestamp} [${color(level.toUpperCase())}]: ${ms} ${color(message)}`
})

const createLoggerFormat = (config: Config) => {
  const logFormats = {
    error: completeLog,
    data: simpleLog,
    info: simpleLog,
    input: completeLog,
    debug: completeLog,
    trace: traceLog,
  }

  const logFormat = logFormats[config.loggerLevel]

  return format.combine(
    format.splat(),
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
    format.ms(),
    logFormat,
  )
}

class CustomLogger extends Logger {}

export const createLogger = (config: Config) => {
  const logger = createWinstonLogger({
    levels: {
      error: 1,
      data: 2,
      info: 3,
      input: 4,
      debug: 5,
      trace: 6,
    },
    level: config.loggerLevel,
    format: createLoggerFormat(config),
    transports: [new transports.Console()],
  })

  return logger as CustomLogger
}
