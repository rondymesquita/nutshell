export interface Config {
  shell: 'bash' | 'powershell' | 'cmd' | 'sh' | string
  loggerLevel: 'none' | 'error' | 'info' | 'debug' | 'trace'
}
