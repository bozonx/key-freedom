import Main from './Main'
import {isCombinationMatches} from './helpers/shurtcutMatchHelpers'
import {keyCodeToModName} from './helpers/helpers'
import {KEY_EVENT} from './constants'


export default class ShortcutFinder {
  private readonly main: Main


  constructor(main: Main) {
    this.main = main

    this.main.combinations.addListener(this.onCombination)
  }

  async destroy() {
  }


  private onCombination = (
    key: number,
    pressedMods: string[],
    event: KEY_EVENT
  ) => {
    this.main.log.debug(
      `Combination ${(event === KEY_EVENT.press) ? 'press' : 'release'} ` +
      `${key}, mods: ${pressedMods.join(', ')}`
    )

    for (const binding of this.main.bindings) {
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
