import {AppConfig} from '../interfaces/AppConfig'
import {Binding} from '../interfaces/Binding'


// export function prepareMods(mod?: string[]): string[] | undefined {
//   // TODO: add - Prefix "_A" added if need
//   return mod
// }

// export function parseCombination(combination?: string): string[][] | undefined {
//   // TODO: add somedate
//   return
// }

export function parseKeyStrDefinition (strDefinition: string): {key: string[], mod: string[]} {
  // TODO: add
  return {key: [], mod: []}
}

export function parseBindings(config: AppConfig): Binding[] {
  const result: Binding[] = []

  for (const item of config.bindings) {
    const {key, mod} = parseKeyStrDefinition(item.key)

    result.push({
      key,
      mod,
      release: item.release || false,
      cmd: item.cmd,
      // combination: parseCombination(item.combination)
    })
  }

  return result
}
