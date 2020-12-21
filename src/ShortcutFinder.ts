import Main from './Main'


interface PreparedBinding {
  // main key
  key: string
  // ordered modifiers
  orderedMod?: string[]
  unorderedMod?: string[]
  // act on release
  release?: boolean
  // run some cmd
  cmd?: string
  // run some other combination
  combination?: string[][]
}


export default class ShortcutFinder {
  private readonly main: Main
  private bindings: PreparedBinding[]


  constructor(main: Main) {
    this.main = main
    this.bindings = this.prepareBindings()
  }

  async destroy() {
    // TODO: add
  }


  private prepareBindings(): PreparedBinding[] {

  }

}
