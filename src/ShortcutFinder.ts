import Main from './Main'
import {CombinationEvent} from './Combinations'
import {Action} from './interfaces/Action'
import {KEY_POSTFIX} from './constants'
import {replacePostfix} from './helpers/helpers'


interface PreparedBinding extends Action {
  // main key codes. More than one for left and right Ctrl etc
  key: number[]
  // ordered modifiers
  orderedMod?: string[]
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
      else if (!this.isModsSame(orderedMod, binding.orderedMod)) {
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

  private isModsSame(pressedMods: string[], bindingMods?: string[]): boolean {
    // TODO: отработать one shot
    if (!bindingMods || !bindingMods.length) return false;
    // TODO: check the same length

    let foundCount = 0

    for (const pressedMod of pressedMods) {
      if (bindingMods.includes(pressedMod)) {
        // means it has the same key
        foundCount++

        continue
      }
      else {
        // try to find key with postfix _A
        if (bindingMods.includes(replacePostfix(pressedMod, KEY_POSTFIX.any))) {
          foundCount++

          continue
        }

        return false
      }
    }

    return foundCount === bindingMods.length
  }

  private prepareBindings(): PreparedBinding[] {

    // TODO: add
  }

}
