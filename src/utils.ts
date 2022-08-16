import { promisify } from 'util'
import { exec as nodeExec } from 'child_process'

const execAsync = promisify(nodeExec)

export const exec = async (cmd: string) => {
  // return await execAsync(cmd, {
  //   shell: 'bash',
  // })
  return await execAsync(cmd)
}

interface ExportedClassMembers {
  [k: string]: Function
}

export const exportClassMembers = (instance: any): ExportedClassMembers => {
  const properties = Reflect.ownKeys(Object.getPrototypeOf(instance)).filter(
    (p) => p !== 'constructor',
  )

  const members = {}
  properties.forEach((prop) => {
    members[prop] = instance[prop].bind(instance)
  })

  return members
}
