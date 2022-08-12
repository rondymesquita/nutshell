import * as core from './core'

Object.assign(global, core)

declare global {
  const $: typeof core.$
  const withContext: typeof core.withContext
  const cd: typeof core.cd
  const setConfig: typeof core.setConfig
  const config: typeof core.config
  const ls: typeof core.ls
}
