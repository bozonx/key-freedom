import lodashTemplate from 'lodash.template'

import {AppConfig, AppProps, ConfigProps} from '../interfaces/AppConfig'
import {defaultConfig} from '../defaultConfig'
import {omitObj} from './objects'
import {deConfigs} from '../Main'


export function parseProps(config: AppConfig): AppProps {
  if (!config.de) throw new Error(`Please specify the "de"param in config`)

  const props = {
    ...defaultConfig,
    ...deConfigs[config.de],
    ...omitObj(config, 'bindings'),
  } as ConfigProps

  return {
    ...props,
    combinationTplLodash: lodashTemplate(props.runCombinationTpl),
    deShortCutTplLodash: lodashTemplate(props.runDeShortCutTpl),
  }
}
