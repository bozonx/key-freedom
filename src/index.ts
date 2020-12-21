import YAML from 'yaml'
import fs from 'fs'
import {AppConfig} from './interfaces/AppConfig'
import Main from './Main'


// TODO: use from home dir or specified
const pathToConfig = './src/testConfig.yaml'


async function start () {
  const configStr: string = fs.readFileSync(pathToConfig, 'utf8')
  const parsedConfig: AppConfig = YAML.parse(configStr)
  const main = new Main(parsedConfig)

  await main.start()

  // TODO: handle Ctrl+C
}

start()
  .catch(console.error)
