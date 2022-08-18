export interface Config {
  shell: 'bash' | 'powershell' | 'cmd' | 'sh' | string

  /**
   * Sets log level.
   *
   * - none: Disable logs.
   * - error: Logs only when errors occur.
   * - info: Logs only the outputs of the commands.
   * - verbose: Logs the commands being executed.
   * - debug: Logs extra information for helping with debugs.
   */
  loggerLevel: 'none' | 'error' | 'info' | 'verbose' | 'debug'
}
