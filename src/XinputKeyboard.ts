import {spawn} from 'child_process'

import Main from './Main'
import {Keyboard, KeyboardHandler} from './interfaces/Keyboard'



function getXinputResult(): Promise<string> {
  return new Promise((resolve, reject) => {
    const proc = spawn('xinput')

    proc.stdout.on('data', (dataBuf: Buffer) => {
      // TODO: validate income data
      resolve(dataBuf.toString())
    })

    // TODO: add timeout of getting result
    // TODO: handle errors
  })
}

function extractKeyboardsIds(xinputResult: string): string[] {
  const xinputResultLines: string[] = xinputResult.split('\n')
  const ids: string[] = []

  for (const item of xinputResultLines) {
    if (!item.match(/\[slave\s+keyboard/)) continue

    const stripped = item.replace(/\[slave\s+keyboard/, '');

    if (!stripped.match(/XinputKeyboard/i)) continue

    if (
      stripped.indexOf('Virtual core XTEST keyboard') >= 0
      || stripped.indexOf('XinputKeyboard System Control') >= 0
      || stripped.indexOf('XinputKeyboard Consumer Control') >= 0
    ) continue

    const matchResult = stripped.match(/id=(\d+)/);

    // TODO: validate that it is exactly the stringified number

    if (matchResult?.[1]) ids.push(matchResult[1])
  }

  return ids;
}


export default class XinputKeyboard implements Keyboard {
  private readonly main: Main


  constructor(main: Main) {
    this.main = main
  }

  async destroy() {
    // TODO: add
  }


  async start() {
    const xInputResult = await getXinputResult()
    const keyboardsIds = extractKeyboardsIds(xInputResult)

    for (const id of keyboardsIds) {
      await this.addKeyboardListener(id, (keyCode: number, press: boolean, release: boolean) => {
        this.keyEvent.emit(keyCode, press, release)
      })
    }
  }

  addListener(cb: KeyboardHandler): number {

  }

  removeListener(handlerIndex: number) {

  }


  private addKeyboardListener(id: string, cb: KeyboardHandler): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const proc = spawn('xinput', ['test', id])

      proc.stdout.on('data', (dataBuf: Buffer) => {

        // TODO: validate income data

        const dataStr = dataBuf.toString()
        const press = dataStr.indexOf('press') >= 0
        const release = !press
        const matchResult = dataStr.match(/(\d+)\s*$/)

        if (!matchResult?.[1]) return

        const keyCode = parseInt(matchResult[1])

        cb(keyCode, press, release)
      });

      // TODO: handle errors on start

      resolve()
    })

  }

}
