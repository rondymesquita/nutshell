#!/usr/bin/env nbs

// import './globals'

// config.logger = 'debug'
// config.quiet = false

// console.log(global)
setConfig({ logger: 'verbose' })
;(async () => {
  await withContext(async () => {
    cd('src/models')
    await $('ls')
  })

  // await $('npm install -g yarn')
})()
