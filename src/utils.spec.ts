// import './globals'
import { exec } from './utils'

jest.mock('child_process', () => {
  const actual = jest.requireActual('child_process')

  return {
    ...actual,
    exec: jest.fn(),
  }
})

describe('utils', () => {
  it('should execute a shell command', async () => {
    await expect(exec('echo "hello"')).resolves.toEqual({})
  })
})
