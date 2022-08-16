# Nutshell

Write better shell scripts using NodeJS

<div align="center"><img src="https://img.icons8.com/plasticine/100/1A1A1A/nutshell.png"/></div>
<h2 align="center">Nutshell</h2>
<h4 align="center">Node Useful Tool for Shell</h4>
<br>

```ts
#!/usr/bin/env nutshell

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
})()
```

## Using Typescript

For using with Typescript, change intepreter for `ts-node`.
You should have `ts-node` installed.

```ts
#!/usr/bin/env ts-node

// import to enable type checking
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
})()

```

Inpired by [Google zx](https://github.com/google/zx), but using libraries I prefer.

#### Motivation

Sometimes, write shell scripts can be challenging, specially when we need to do conditionals, loops, reading files like JSON or YAML. Nutshell helps in these cases leveraing the knowledge in Javascript without being too far of Shell Scripts.

<br>

Logo By [icons8](https://icons8.com/icon/yF1Jnxh1CN0X/nutshell)
