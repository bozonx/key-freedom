import * as yargs from 'yargs';
import YAML from 'yaml'
import fs from 'fs'
import {AppConfig} from './interfaces/AppConfig'
import Main from './Main'
import ConsoleLogger from './ConsoleLogger'


const defaultConfigPath = `${process.env.HOME}/.config/key-freedom/config.yaml`
const pathToConfig = (yargs.argv.c) ? yargs.argv.c as string : defaultConfigPath


async function start () {
  const configStr: string = fs.readFileSync(pathToConfig, 'utf8')
  const parsedConfig: AppConfig = YAML.parse(configStr)
  const logger = new ConsoleLogger((yargs.argv.debug) ? 'debug' : 'info')
  const main = new Main(logger, parsedConfig)

  await main.start()

  // TODO: handle Ctrl+C
}

start()
  .catch(console.error)
