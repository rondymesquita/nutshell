#!/usr/bin/env ts-node
import '@rondymesquita/nutshell'
;(async () => {
  await $`echo "Hello"`

  await $`
    echo "Multiline commands"
    echo "using template literals"
  `
  await withContext(async () => {
    await $`
      echo "I am running"
      echo "in a separated process"
    `
  })

  await ls()
})()
