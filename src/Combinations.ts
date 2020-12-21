import Main from './Main'
import IndexedEvents from './helpers/IndexedEvents'
import {keyCodeToModName} from './helpers/helpers'


export enum CombinationEvent {
  press,
  release,
}


export type CombinationsHandler = (
  key: number,
  orderedMod: string[],
  event: CombinationEvent
) => boolean


export default class Combinations {
  private readonly main: Main
  private readonly keyEvents = new IndexedEvents<CombinationsHandler>()
  private readonly pressedMods: Record<string, number> = {}
  private pressedKey?: number


  constructor(main: Main) {
    this.main = main

    this.main.keyboard.addListener(this.onKeyEvent)
  }

  async destroy() {
    this.keyEvents.destroy()
    // TODO: add
  }


  // TODO: blocking of modifiers releases do on next key press

  addListener(cb: CombinationsHandler): number {
    return this.keyEvents.addListener(cb)
  }

  removeListener(handlerIndex: number) {
    this.keyEvents.removeListener(handlerIndex)
  }


  private handlePress(keyCode: number) {
    // TODO: ??? если какая-то кнопка нажата то отменяем ее release
    // TODO: добавляем таймаут чтобы убрать себя из модификатора

    if (this.pressedKey) {
      // move previously pressed key to modifier
      this.pressedMods[keyCodeToModName(keyCode)] = keyCode
      // TODO: cancel one shot timeout
    }
    else {
      // TODO: для первой нажатой клавиши добавляем таймаут one shot
    }

    this.pressedKey = keyCode

    this.keyEvents.emit(
      this.pressedKey,
      Object.keys(this.pressedMods),
      CombinationEvent.press
    )
  }

  private handleRelease(keyCode: number) {
    // TODO: cancel one shot timeout
  }

  private onKeyEvent = (keyCode: number, press: boolean, release: boolean) => {
    this.main.log.debug(`Keyboard ${(press) ? 'press' : 'release'} ${keyCode}`)

    if (press) {
      this.handlePress(keyCode)
    }
    else {
      this.handleRelease(keyCode)
    }
  }

}
