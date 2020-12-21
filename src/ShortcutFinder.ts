import Main from './Main'
import {CombinationEvent} from './Combinations'
import {
  isModsSame,
  prepareBindings,
} from './helpers/helpers'
import {ShortcutBinding} from './interfaces/ShortcutBinding'


export default class ShortcutFinder {
  private readonly main: Main
  private bindings: ShortcutBinding[]


  constructor(main: Main) {
    this.main = main
    this.bindings = prepareBindings(this.main.config)

    this.main.combinations.addListener(this.onCombination)
  }

  async destroy() {
    this.bindings = []
  }


  private onCombination(
    key: number,
    pressedMods: string[],
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
      else if (!isModsSame(pressedMods, binding.mod)) {
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

}
