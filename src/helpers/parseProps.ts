import {AppConfig, ConfigPreparedTemplates, ConfigProps} from '../interfaces/AppConfig'
import {defaultConfig} from '../defaultConfig'
import {omitObj} from './objects'
import {deConfigs} from '../Main'


export function parseProps(config: AppConfig): ConfigProps & ConfigPreparedTemplates {
  if (!config.de) throw new Error(`Please specify the "de"param in config`)

  return {
    ...defaultConfig,
    ...deConfigs[config.de],
    ...omitObj(config, 'bindings'),
  } as ConfigProps
}
