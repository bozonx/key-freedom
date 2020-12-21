import Main from './Main'
import IndexedEvents from './helpers/IndexedEvents'


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
  private keyEvents = new IndexedEvents<CombinationsHandler>()
  private readonly pressedMods: Record<string, boolean> = {}


  constructor(main: Main) {
    this.main = main

    this.main.keyboard.addListener(this.onKeyEvent)
  }

  async destroy() {
    // TODO: add
  }


  // TODO: blocking of modifiers releases do on next key press

  addListener(cb: CombinationsHandler): number {
    return this.keyEvents.addListener(cb)
  }

  removeListener(handlerIndex: number) {
    this.keyEvents.removeListener(handlerIndex)
  }


  private onKeyEvent = (keyCode: number, press: boolean, release: boolean) => {
    this.main.log.debug(`Keyboard ${(press) ? 'press' : 'release'} ${keyCode}`)

    // TODO: если какая-то кнопка нажата то отменяем ее release
    // TODO:
  }

}
