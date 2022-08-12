import './globals'

describe('globals', () => {
  it('should expose globally methods and properties to script', async () => {
    expect(global).toMatchObject(
      expect.objectContaining({
        cd: expect.any(Function),
        withContext: expect.any(Function),
        setConfig: expect.any(Function),
        ls: expect.any(Function),
        $: expect.any(Function),
        config: expect.objectContaining({
          shell: expect.any(String),
          quiet: expect.any(Boolean),
          logger: expect.any(String),
        }),
      }),
    )
  })
})
