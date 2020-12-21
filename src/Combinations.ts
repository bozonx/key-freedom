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


  constructor(main: Main) {
    this.main = main
  }

  async destroy() {
    // TODO: add
  }


  // TODO: blocking of modifiers releases do on next key press

  addListener(cb: CombinationsHandler): number {

  }

  removeListener(handlerIndex: number) {

  }

}
