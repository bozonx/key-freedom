import Main from './Main'

export type KeyboardHandler = () => void


export default class Keyboard {
  private readonly main: Main


  constructor(main: Main) {
    this.main = main
  }

  async destroy() {
    // TODO: add
  }


  async start() {
    // TODO: add
  }

  addListener(cb: KeyboardHandler): number {

  }

  removeListener(handlerIndex: number) {

  }

}
