import {spawn} from 'child_process'

import Main, {keyMaps} from '../Main'
import {Keyboard, KeyboardHandler} from '../interfaces/Keyboard'
import IndexedEvents from '../helpers/IndexedEvents'


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

    if (!stripped.match(/Keyboard/i)) continue

    if (
      stripped.indexOf('Virtual core XTEST keyboard') >= 0
      || stripped.indexOf('System Control') >= 0
      || stripped.indexOf('Consumer Control') >= 0
    ) continue

    const matchResult = stripped.match(/id=(\d+)/);

    // TODO: validate that it is exactly the stringified number

    if (matchResult?.[1]) ids.push(matchResult[1])
  }

  return ids;
}


export default class Xinput implements Keyboard {
  private readonly main: Main
  private keyEvents = new IndexedEvents<KeyboardHandler>()


  constructor(main: Main) {
    this.main = main
  }

  async destroy() {
    this.keyEvents.destroy()
  }


  async start() {
    const xInputResult = await getXinputResult()
    const keyboardsIds = extractKeyboardsIds(xInputResult)

    for (const id of keyboardsIds) {
      await this.addKeyboardListener(
        id,
        (key: string, press: boolean, release: boolean) => {
          this.keyEvents.emit(key, press, release)
        }
      )
    }
  }

  addListener(cb: KeyboardHandler): number {
    return this.keyEvents.addListener(cb)
  }

  removeListener(handlerIndex: number) {
    this.keyEvents.removeListener(handlerIndex)
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

        const key = this.convertKeyCodeToName(parseInt(matchResult[1]))

        cb(key, press, release)
      });

      // TODO: handle errors on start

      resolve()
    })

  }

  private convertKeyCodeToName(keyCode: number): string {
    return keyMaps[this.main.props.keyMap][keyCode]
  }

}
