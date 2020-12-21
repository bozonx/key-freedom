import Main from './Main'
import {CombinationEvent} from './Combinations'
import {
  isCombinationMatches,
  prepareBindings,
} from './helpers/shurtcutMatchHelpers'
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


  private onCombination = (
    key: number,
    pressedMods: string[],
    event: CombinationEvent
  ): boolean => {
    for (const binding of this.bindings) {
      const isMatches = isCombinationMatches(
        key,
        pressedMods,
        event,
        binding
      )

      if (isMatches) {
        this.main.runAction.run({
          cmd: binding.cmd,
          combination: binding.combination,
        })
        // means cancel of releases of modifiers
        return true
      }
    }

    return false
  }

}
