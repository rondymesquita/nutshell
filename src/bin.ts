#!/usr/bin/env node

import { DEFAULT_CONFIG } from './coredefaults'
import { createLogger } from './logger'
import './globals'

const { debug } = createLogger(DEFAULT_CONFIG)
;(async () => {
  const callerPath = process.cwd()
  const callerFile = process.argv[2]

  debug('bin', {
    callerFile,
    callerPath,
  })

  await import(`${callerPath}/${callerFile}`)
})()
