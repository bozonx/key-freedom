import Main from './Main'


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
    return 0
  }

  removeListener(handlerIndex: number) {

  }


  private onKeyEvent = (keyCode: number, press: boolean, release: boolean) => {
    console.log(111, keyCode, press, release)
  }

}
