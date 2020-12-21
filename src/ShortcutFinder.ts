import Main from './Main'
import {CombinationEvent} from './Combinations'
import {isOrderedArraysSame, isUnOrderedArraysSame} from './helpers/arrays'
import {Action} from './interfaces/Action'


interface PreparedBinding extends Action {
  // main key codes. More than one for left and right Ctrl etc
  key: number[]
  // ordered modifiers
  orderedMod?: string[]
  unorderedMod?: string[]
  // act on release
  release?: boolean
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
    this.bindings = []
  }


  private onCombination(
    key: number,
    orderedMod: string[],
    unorderedMod: string[],
    event: CombinationEvent
  ): boolean {
    for (const binding of this.bindings) {
      if (binding.release && event != CombinationEvent.release) {
        continue
      }
      else if (!binding.release && event == CombinationEvent.release) {
        continue
      }
      else if (!binding.key.includes(key)) {
        continue
      }
      else if (binding.orderedMod && !isOrderedArraysSame(binding.orderedMod, orderedMod)) {
        continue
      }
      else if (!isUnOrderedArraysSame(binding.unorderedMod, unorderedMod)) {
        continue
      }

      this.main.runAction.run({
        cmd: binding.cmd,
        combination: binding.combination,
      })
      // means cancel of releases of modificators
      return true
    }

    return false
  }

  private prepareBindings(): PreparedBinding[] {
    // TODO: add
  }

}
