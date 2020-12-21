import Main from './Main'

export type CombinationsHandler = () => void


export default class Combinations {
  private readonly main: Main


  constructor(main: Main) {
    this.main = main
  }


  addListener(cb: CombinationsHandler): number {

  }

  removeListener(handlerIndex: number) {

  }

}
