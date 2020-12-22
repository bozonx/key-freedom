import Main from './Main'
import IndexedEvents from './helpers/IndexedEvents'
import {KEY_EVENT} from './constants'
import {isEmptyObject} from './helpers/objects'


export type CombinationHandler = (key: string, mod: string[], event: KEY_EVENT) => void


export default class Combinations {
  private readonly main: Main
  private readonly keyEvents = new IndexedEvents<CombinationHandler>()
  private readonly pressedMods: Record<string, string> = {}
  private pressedKey?: string
  private oneShotTimeout?: NodeJS.Timeout


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


  private handlePress(key: string) {
    // TODO: add total timeout
    // TODO: add press timeout

    if (this.pressedKey) {
      // some keys have pressed and some else pressed
      // set it as current pressed key
      // move previously pressed key to modifier
      // cancel one shot timeout if set
      this.clearOneShotTimeout()

      if (this.pressedKey === key) {
        // pressed second time - it is kind or error
        // because release has to be called before
        return
      }
      else {
        // different key has pressed
        this.moveCurrentToModifier()
        // save it as current
        this.pressedKey = key
      }
    }
    else {
      // this is the first pressed key ==> add one shot timeout
      this.pressedKey = key
      // which cancels release of this key - removes it from pressed
      this.oneShotTimeout = setTimeout(() => {
        if (
          !this.pressedKey
          || this.pressedKey !== key
        ) {
          delete this.oneShotTimeout
          // do nothing
          return
        }
        // if it still pressed then move it to modifier
        this.moveCurrentToModifier()
      }, this.main.props.oneShotTimeoutMs)
    }

    this.keyEvents.emit(this.pressedKey, Object.keys(this.pressedMods), KEY_EVENT.press)
  }

  private handleRelease(key: string) {
    if (this.pressedKey === key) {
      // release of currently pressed key
      if (isEmptyObject(this.pressedMods)) {
        // it is release of single key
        if (this.oneShotTimeout) {
          // it is one shot single key release
          // then clear timeout and rise event and delete current key
          this.emitRelease()

          return
        }
        else {
          // something wrong
          delete this.pressedKey

          return
        }
      }
      else {
        // it is release of current key which have modifiers
        // Clear oneShot timeout, emit event, delete current key
        this.emitRelease()
      }
    }
    else if (this.pressedKey) {
      // one of modifier has released but main key(some other) is pressed
      // just remove modifier
      this.clearOneShotTimeout()
      this.removeModifier(key)
    }
    else {
      // release of some modifier and no one main key pressed
      // just remove it but don't emit any event
      this.clearOneShotTimeout()
      this.removeModifier(key)
    }
  }

  private emitRelease() {
    this.clearOneShotTimeout()

    if (!this.pressedKey) return

    // release currently pressed key
    this.keyEvents.emit(
      this.pressedKey,
      Object.keys(this.pressedMods),
      KEY_EVENT.release
    )

    delete this.pressedKey
  }

  private moveCurrentToModifier() {
    if (!this.pressedKey || this.pressedMods[this.pressedKey]) return

    this.pressedMods[this.pressedKey] = this.pressedKey

    delete this.pressedKey
  }

  private clearOneShotTimeout() {
    clearTimeout(this.oneShotTimeout as any)

    delete this.oneShotTimeout
  }

  private removeModifier(key: string) {
    delete this.pressedMods[key]
  }

}
