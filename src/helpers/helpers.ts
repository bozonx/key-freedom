import {KEY_POSTFIX} from '../constants'
import {AppConfig} from '../interfaces/AppConfig'
import {ShortcutBinding} from '../interfaces/ShortcutBinding'
import {convertToKeyCode, parseCombination, prepareMods, replacePostfix} from './common'


export function isModsSame(pressedMods: string[], bindingMods?: string[]): boolean {
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

export function prepareBindings(config: AppConfig): ShortcutBinding[] {
  const result: ShortcutBinding[] = []

  for (const item of config.bindings) {
    result.push({
      key: convertToKeyCode(item.key),
      mod: prepareMods(item.mod),
      release: item.release || false,
      cmd: item.cmd,
      combination: parseCombination(item.combination)
    })
  }

  return result
}
