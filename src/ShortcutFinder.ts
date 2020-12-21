import Main from './Main'
import {CombinationEvent} from './Combinations'
import {Action} from './interfaces/Action'
import {KEY_POSTFIX} from './constants'
import {replacePostfix} from './helpers/helpers'


interface PreparedBinding extends Action {
  // main key codes. More than one for left and right Ctrl etc
  key: number[]
  // prepared modifiers. Prefix "_A" added if need
  mod?: string[]
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
      else if (!this.isModsSame(pressedMods, binding.mod)) {
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
    if (!bindingMods || !bindingMods.length) {
      // if no pressedMods then means one shot
      // else if pressed some mods then means mods aren't same
      return !pressedMods.length
    }
    else if (pressedMods.length !== bindingMods.length) {
      // if lengths of pressed keys and expected keys aren't same
      return false;
    }

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
