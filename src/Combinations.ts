import Main from './Main'
import IndexedEvents from './helpers/IndexedEvents'
import {keyCodeToModName} from './helpers/helpers'
import {KEY_EVENT} from './constants'


export type CombinationHandler = (key: string, mod: string[], event: KEY_EVENT) => void


export default class Combinations {
  private readonly main: Main
  private readonly keyEvents = new IndexedEvents<CombinationHandler>()
  private readonly pressedMods: Record<string, string> = {}
  private pressedKey?: string


  constructor(main: Main) {
    this.main = main

    this.main.keyboard.addListener(this.handleKeyboardEvent)
  }

  async destroy() {
    this.keyEvents.destroy()
  }


  addListener(cb: CombinationHandler): number {
    return this.keyEvents.addListener(cb)
  }

  removeListener(handlerIndex: number) {
    this.keyEvents.removeListener(handlerIndex)
  }


  private handleKeyboardEvent = (key: string, press: boolean, release: boolean) => {
    this.main.log.debug(`Keyboard ${(press) ? 'press' : 'release'} ${key}`)

    if (press) {
      this.handlePress(key)
    }
    else {
      this.handleRelease(key)
    }
  }

  // TODO: blocking of modifiers releases do on next key press

  private handlePress(key: string) {
    // TODO: add total timeout
    // TODO: add press timeout

    if (this.pressedKey) {
      if (this.pressedKey === keyCode) {
        // pressed second time
        return
      }
      else {
        // pressed some other key
        // move previously pressed key to modifier
        this.pressedMods[keyCodeToModName(this.pressedKey)] = this.pressedKey

        this.pressedKey = keyCode
        // TODO: cancel one shot timeout
      }
    }
    else {
      // TODO: для первой нажатой клавиши добавляем таймаут one shot
    }

    this.pressedKey = keyCode

    this.keyEvents.emit(
      this.pressedKey,
      Object.keys(this.pressedMods),
      KEY_EVENT.press
    )
  }

  private handleRelease(key: string) {
    if (this.pressedKey && this.pressedKey === keyCode) {
      // release currently pressed key
      this.keyEvents.emit(
        this.pressedKey,
        Object.keys(this.pressedMods),
        KEY_EVENT.release
      )

      delete this.pressedKey
      // TODO: delete modifiers ???
    }
    else {
      // some other key. Means modifier
      for (const key of Object.keys(this.pressedMods)) {
        if (this.pressedMods[key] !== keyCode) continue

        delete this.pressedMods[key]

        // TODO: remove modifier timeout also
      }
    }

    // do not emit releases of modifiers
    //if (this.pressedKey !== keyCode) return

    // TODO: cancel one shot timeout


  }

}
