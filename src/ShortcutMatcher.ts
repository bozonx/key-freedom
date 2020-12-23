import Main from './Main'
import {isCombinationMatches} from './helpers/matchDefinition'
import {KEY_EVENT} from './constants'
import {omitObj} from './helpers/objects'


export default class ShortcutMatcher {
  private readonly main: Main


  constructor(main: Main) {
    this.main = main

    this.main.combinations.addListener(this.onCombination)
  }

  async destroy() {
  }


  private onCombination = (
    key: string,
    pressedMods: string[],
    event: KEY_EVENT
  ) => {
    this.main.log.debug(
      `Combination ${(event === KEY_EVENT.press) ? 'press' : 'release'} ` +
      `${key}, mods: ${pressedMods.join(', ')}`
    )
    // try to find corresponding binging definition
    for (const binding of this.main.bindings) {
      const isMatches = isCombinationMatches(
        key,
        pressedMods,
        event,
        binding
      )
      // go further if doesn't match
      if (!isMatches) continue
      // matched
      this.main.log.info(`Matched ${pressedMods.join('+')} + ${key}`)

      this.main.runAction.run(binding.actions)
    }
  }

}
