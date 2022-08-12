#!/usr/bin/env node

import { config } from './core'
import { createLogger } from './logger.factory'
import './globals'

const { debug } = createLogger(config)
;(async () => {
  const callerPath = process.cwd()
  const callerFile = process.argv[2]

  debug('bin', {
    callerFile,
    callerPath,
  })

  await import(`${callerPath}/${callerFile}`)
})()
