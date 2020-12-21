import Main from './Main'
import {CombinationEvent} from './Combinations'
import {
  isCombinationMatches,
  prepareBindings,
} from './helpers/shurtcutMatchHelpers'
import {ShortcutBinding} from './interfaces/ShortcutBinding'
import {keyCodeToModName} from './helpers/helpers'


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
  ) => {
    this.main.log.debug(
      `Combination ${(event === CombinationEvent.press) ? 'press' : 'release'} ` +
      `${key}, mods: ${pressedMods.join(', ')}`
    )

    for (const binding of this.bindings) {
      const isMatches = isCombinationMatches(
        key,
        pressedMods,
        event,
        binding
      )

      if (!isMatches) continue

      this.main.log.info(`Matched ${pressedMods.join('+')} + ${keyCodeToModName(key)}`)

      this.main.runAction.run({
        cmd: binding.cmd,
        combination: binding.combination,
      })
    }
  }

}
