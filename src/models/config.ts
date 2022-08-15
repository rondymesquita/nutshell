export interface Config {
  shell: 'bash' | 'powershell' | 'cmd' | 'sh' | string
  quiet: boolean
  loggerLevel: 'none' | 'error' | 'info' | 'debug' | 'trace'
}
