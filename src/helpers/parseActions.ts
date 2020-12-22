import {ConfigAction} from '../interfaces/AppConfig'
import {BindingAction} from '../interfaces/BindingAction'
import {COMBINATIONS_DELIMITER} from '../constants'
import {prepareCombination} from './parseBindings'


export function parseCombinations(rawCombinations?: string): string[][] | undefined {
  if (!rawCombinations) return

  const combinations: string[] = rawCombinations.split(COMBINATIONS_DELIMITER)
    .map((item) => item.trim())

  return combinations.map((item) => prepareCombination(item))
}

export function parseActions(rawActions: ConfigAction[]): BindingAction[] {

}
