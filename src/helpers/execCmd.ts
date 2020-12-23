import {exec} from 'child_process'


export function execCmd(cmd: string, execTimeoutMs: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(`Timeout has been exceeded`)
    }, execTimeoutMs)

    exec(cmd, (error, stdout, stderr) => {
      clearTimeout(timeout)

      if (error) return reject(error)
      else if (stderr) return reject(stderr)

      resolve(stdout)
    })
  })
}
