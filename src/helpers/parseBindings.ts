import {AppConfig} from '../interfaces/AppConfig'
import {Binding} from '../interfaces/Binding'
import {parseCombination, prepareMods} from './helpers'


export function parseBindings(config: AppConfig): Binding[] {
  const result: Binding[] = []

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
