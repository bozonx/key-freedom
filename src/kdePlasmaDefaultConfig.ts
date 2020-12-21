import {ConfigProps} from './interfaces/AppConfig'


export const kdePlasmaDefaultConfig: ConfigProps = {
  runCombinationTpl: 'xdotool key --clearmodifiers ${COMBINATION}',
  runDeShortCutTpl: 'qdbus org.kde.kglobalaccel /component/${COMPONENT} invokeShortcut "${SHORTCUT}"',
}
