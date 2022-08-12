if (process.argv[2] !== 'subprocess') {
  console.log('Missing "subprocess" flag argument!')
  process.exit(0)
}

import './globals'

process.on('message', async (message: any) => {
  const fn = eval(message.fn)
  await fn()
  process.exit()
})
