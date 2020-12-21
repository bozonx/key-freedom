import Main from './Main'
import {CombinationEvent} from './Combinations'
import {isOrderedArraysSame, isUnOrderedArraysSame} from './helpers/arrays'


interface PreparedBinding {
  // main key codes. More than one for left and right Ctrl etc
  key: number[]
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

    this.main.combinations.addListener(this.onCombination)
  }

  async destroy() {
    // TODO: add
  }


  private onCombination(
    key: number,
    orderedMod: string[],
    unorderedMod: string[],
    event: CombinationEvent
  ): boolean {
    for (const binding of this.bindings) {
      if (!binding.key.includes(key)) {
        continue
      }
      else if (binding.orderedMod && !isOrderedArraysSame(binding.orderedMod, orderedMod)) {
        continue
      }
      else if (!isUnOrderedArraysSame(binding.unorderedMod, unorderedMod)) {
        continue
      }

      this.runAction(binding)
      // means cancel of releases of mods
      return true
    }

    return false
  }

  private runAction(binding: PreparedBinding) {
    // TODO: add
  }

  private prepareBindings(): PreparedBinding[] {
    // TODO: add
  }

}
