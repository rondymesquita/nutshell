#!/usr/bin/env nbs
const nbs = require('nbs')
console.log('>>>nbs', {nbs});

setConfig({ logger: 'debug' })
;(async () => {
  await withContext(async () => {
    await $('ls -lha')
  })

  await $('ls')
})()
