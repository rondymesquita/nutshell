export interface Config {
  shell: 'bash' | 'powershell' | 'cmd' | 'sh' | string
  quiet: boolean
  logger: 'none' | 'info' | 'verbose' | 'debug'
}
