// import { describe, expect, test as it } from 'vitest'
import { $, cd, config, setConfig, ls } from './core'
import { exec as execMock } from './utils'
import path from 'path'

jest.mock('./utils', () => {
  const actual = jest.requireActual('./utils')

  return {
    ...actual,
    exec: jest.fn(),
  }
})

const mockFileSystem = describe('core', () => {
  it('should execute a single line command', async () => {
    ;(execMock as jest.Mock).mockResolvedValueOnce({
      stderr: '',
      stdout: 'Hello\n',
    })
    await expect($('echo "Hello"')).resolves.toEqual({
      stderr: '',
      stdout: 'Hello\n',
    })

    expect(execMock).toHaveBeenNthCalledWith(1, 'echo "Hello"')
  })

  it('should execute a multiple line command', async () => {
    ;(execMock as jest.Mock)
      .mockResolvedValueOnce({
        stderr: '',
        stdout: 'Hello\n',
      })
      .mockResolvedValueOnce({
        stderr: '',
        stdout: 'World\n',
      })
    await expect(
      $`
			echo "Hello"
			echo "World"
		`,
    ).resolves.toEqual([
      { stderr: '', stdout: 'Hello\n' },
      { stderr: '', stdout: 'World\n' },
    ])

    expect(execMock).toHaveBeenNthCalledWith(1, 'echo "Hello"')
    expect(execMock).toHaveBeenNthCalledWith(2, 'echo "World"')
  })

  it('should enters into folder', async () => {
    const cwd = process.cwd()

    cd('./src/__fixtures__')
    expect(process.cwd()).toEqual(path.join(cwd, './src/__fixtures__'))

    cd('../../')
    expect(process.cwd()).toEqual(path.join(cwd, ''))

    process.chdir(cwd)
  })

  it('should have default configuration', () => {
    expect(config).toEqual({
      logger: 'info',
      quiet: false,
      shell: 'bash',
    })
  })

  it('should set config', () => {
    expect(config).toEqual({
      logger: 'info',
      quiet: false,
      shell: 'bash',
    })

    setConfig({ logger: 'none', shell: 'cmd' })

    expect(config).toEqual({
      logger: 'none',
      quiet: false,
      shell: 'cmd',
    })
  })

  it('should run ls', async () => {
    cd('./src/__fixtures__')
    await expect(ls()).resolves.toEqual(['sample-file.txt', 'sample-folder'])
    cd('../../')
  })
})
