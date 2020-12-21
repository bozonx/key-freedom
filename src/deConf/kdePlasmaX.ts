import {ConfigProps} from '../interfaces/AppConfig'


export const kdePlasmaX: ConfigProps = {
  runCombinationTpl: 'xdotool key --clearmodifiers ${COMBINATION}',
  runDeShortCutTpl: 'qdbus org.kde.kglobalaccel /component/${COMPONENT} invokeShortcut "${SHORTCUT}"',
}