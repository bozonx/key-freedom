import Main from './Main'
import IndexedEvents from './helpers/IndexedEvents'
import {KEY_EVENT} from './constants'
import {isEmptyObject} from './helpers/objects'


export type CombinationHandler = (key: string, mod: string[], event: KEY_EVENT) => void


export default class Combinations {
  private readonly main: Main
  private readonly keyEvents = new IndexedEvents<CombinationHandler>()
  private pressedMods: Record<string, string> = {}
  private pressedKey?: string
  // after it has been exceeded the one shot pressing won't rise a release event
  private oneShotTimeout?: NodeJS.Timeout
  // after it has been exceeded all of pressed keys will be terminated
  private combinationTimeout?: NodeJS.Timeout


  constructor(main: Main) {
    this.main = main

    this.main.keyboard.addListener(this.handleKeyboardEvent)
  }

  async destroy() {
    this.keyEvents.destroy()
  }


  someKeyPressed(): boolean {
    return Boolean(this.pressedKey) || !isEmptyObject(this.pressedMods)
  }

  addListener(cb: CombinationHandler): number {
    return this.keyEvents.addListener(cb)
  }

  removeListener(handlerIndex: number) {
    this.keyEvents.removeListener(handlerIndex)
  }


  private handleKeyboardEvent = (key: string, press: boolean, release: boolean) => {
    if (press) {
      this.handlePress(key)
    }
    else {
      this.handleRelease(key)
    }
  }


  private handlePress(key: string) {
    if (this.pressedMods[key]) {
      // If mod key pressed second time - it is an error case
      // do noting
      return
    }
    else if (!this.pressedKey && isEmptyObject(this.pressedMods)) {
      // No key or mods pressed before
      this.pressedKey = key
      // Set combination timeout because it is the freshest press
      this.setCombinationTimeout()
      this.setOneShotTimeout()
    }
    else {
      // Some key or mods pressed before.
      // Set it as current pressed key
      // move previously pressed key to modifier
      // cancel one shot timeout if set and start new one
      this.setOneShotTimeout()
      // If different key has pressed
      if (this.pressedKey !== key) this.moveCurrentToModifier()
      // save it as current
      this.pressedKey = key
    }

    this.keyEvents.emit(this.pressedKey, Object.keys(this.pressedMods), KEY_EVENT.press)
  }

  private handleRelease(key: string) {
    if (this.pressedKey === key) {
      // Currently pressed key has released
      if (isEmptyObject(this.pressedMods)) {
        // it is release of single key without mods
        if (this.oneShotTimeout) {
          // it is one shot single key release
          // then clear timeout and rise event and delete current key
          this.emitRelease()
        }
        else {
          // Release of current key with exceeded one shot timeout
          // Then just delete it and do noting else
          delete this.pressedKey

        }
        // if no one pressed key has remained then clear combination timeout
        if (!this.someKeyPressed()) this.clearCombinationTimeout()

        return
      }
      // it is release of current key with mods
      // Clear oneShot timeout, emit event, delete current key
      this.emitRelease()

      return
    }
    // release of some modifier and no one main key pressed
    // just remove it but don't emit any event
    // Some other pressed key has released.
    // In case of exceeded oneShot timeout or release of some modifier.
    // But main key(some other) is pressed.
    // Then remove this key from mods if it is mod and remove one shot timeout.
    // If some other key had been released then do nothing - don't emit an event
    this.clearOneShotTimeout()
    this.removeModifier(key)
    // if no one pressed key has remained then clear combination timeout
    if (!this.someKeyPressed()) this.clearCombinationTimeout()
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

  private removeModifier(key: string) {
    delete this.pressedMods[key]
  }

  private setOneShotTimeout() {
    clearTimeout(this.oneShotTimeout as any)
    // which cancels release of this key - removes it from pressed
    this.oneShotTimeout = setTimeout(() => {
      if (
        !this.pressedKey
        // TODO: review
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

  private setCombinationTimeout() {
    this.combinationTimeout = setTimeout(() => {
      delete this.combinationTimeout
      delete this.pressedKey

      this.clearOneShotTimeout()

      this.pressedMods = {}
    }, this.main.props.combinationTimeoutMs)
  }

  private clearOneShotTimeout() {
    clearTimeout(this.oneShotTimeout as any)

    delete this.oneShotTimeout
  }

  private clearCombinationTimeout() {
    clearTimeout(this.combinationTimeout as any)

    delete this.combinationTimeout
  }

}
