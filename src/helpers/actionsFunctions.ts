import {exec} from 'child_process'

import {ActionName, CmdAction, CombinationAction, DeShortcutAction} from '../interfaces/BindingAction'
import {AppProps} from '../interfaces/AppConfig'


export const actionsFunctions: Record<ActionName, any> = {
  async cmd(appProps: AppProps, definition: CmdAction) {
    const res = exec(definition.cmd);

    // TODO: kill after timeout
    // TODO: handle errors
  },
  async combination(appProps: AppProps, definition: CombinationAction) {
    const cmd = appProps.combinationTplLodash({
      COMBINATION: definition.combination,
    })

    const res = exec(cmd);

    // TODO: kill after timeout
    // TODO: handle errors
  },
  async deShortcut(appProps: AppProps, definition: DeShortcutAction) {
    const cmd = appProps.deShortCutTplLodash({
      COMPONENT: definition.component,
      SHORTCUT: definition.shortcutName
    })
    // lodashTemplate(tpl)
    const res = exec(cmd);

    // TODO: kill after timeout
    // TODO: handle errors
  },
}
