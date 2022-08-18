import * as core from './core'
import * as libs from './libs'

/**
 * For typedocs
 */
export * from './libs'
export * from './models'
export * from './core'
/**
 *
 */

Object.assign(global, core)
Object.assign(global, libs)

declare global {
  const $: typeof core.$
  const withContext: typeof core.withContext
  const cd: typeof core.cd
  const setConfig: typeof core.setConfig
  const ls: typeof core.ls
  const chalk: typeof libs.chalk
  const fs: typeof libs.fs
}
