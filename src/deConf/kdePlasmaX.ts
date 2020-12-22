import {ConfigProps} from '../interfaces/AppConfig'


export const kdePlasmaX: Partial<ConfigProps> = {
  listener: 'xinput',
  keyMap: 'xinput',
  runCombinationTpl: 'xdotool key --clearmodifiers ${COMBINATION}',
  // see shortcut names in ~/.config/kglobalshortcutsrc
  runDeShortCutTpl: 'qdbus org.kde.kglobalaccel /component/${COMPONENT} invokeShortcut "${SHORTCUT}"',
}
