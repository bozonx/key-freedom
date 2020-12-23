import {exec} from 'child_process'

import {ActionName, CmdAction, CombinationAction, DeShortcutAction} from '../interfaces/BindingAction'
import {ConfigProps} from '../interfaces/AppConfig'


export const actionsFunctions: Record<ActionName, any> = {
  async cmd(appProps: ConfigProps, definition: CmdAction) {
    const res = exec(definition.cmd);

    // TODO: kill after timeout
    // TODO: handle errors
  },
  async combination(appProps: ConfigProps, definition: CombinationAction) {
    // TODO: Add
  },
  async deShortcut(appProps: ConfigProps, definition: DeShortcutAction) {
    // TODO: Add
  },
}
