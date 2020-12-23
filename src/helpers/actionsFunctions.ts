import {ActionName, CmdAction, CombinationAction, DeShortcutAction} from '../interfaces/BindingAction'
import {AppProps} from '../interfaces/AppConfig'
import {execCmd} from './execCmd'


export const actionsFunctions: Record<ActionName, any> = {
  async cmd(appProps: AppProps, definition: CmdAction) {
    await execCmd(definition.cmd, appProps.execTimeoutMs);
  },
  async combination(appProps: AppProps, definition: CombinationAction) {
    if (definition.clearCaps) {
      const capsClearCmd = appProps.combinationTplLodash({
        // TODO: лучше конвертнуть комбинацию
        COMBINATION: '66',
      })

      await execCmd(capsClearCmd, appProps.execTimeoutMs);
    }

    const cmd = appProps.combinationTplLodash({
      COMBINATION: definition.combination,
    })

    await execCmd(cmd, appProps.execTimeoutMs);
  },
  async deShortcut(appProps: AppProps, definition: DeShortcutAction) {
    const cmd = appProps.deShortCutTplLodash({
      COMPONENT: definition.component,
      SHORTCUT: definition.shortcutName
    })

    await execCmd(cmd, appProps.execTimeoutMs);
  },
}
