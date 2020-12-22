export type KeyboardHandler = (
  // resolved key name
  key: string,
  press: boolean,
  release: boolean
) => void


export interface Keyboard {
  destroy(): Promise<void>
  start(): Promise<void>
  addListener(cb: KeyboardHandler): number
  removeListener(handlerIndex: number): void
}
