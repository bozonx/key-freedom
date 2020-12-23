import {exec} from 'child_process'

import {ActionName, CmdAction, CombinationAction, DeShortcutAction} from '../interfaces/BindingAction'


export const actionsFunctions: Record<ActionName, any> = {
  cmd(definition: CmdAction) {
    console.log(111111111, cmd)
    // TODO: does it need arguments???
    const res = exec(cmd);

    // TODO: kill after timeout
    // TODO: errors write to log
  },
  combination(definition: CombinationAction) {

  },
  deShortcut(definition: DeShortcutAction) {

  },
}
