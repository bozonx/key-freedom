export const COMBINATION_SEPARATOR = '+'
export const MIRROR_KEYS = [
  'Ctrl',
  'Alt',
  'Shift',
  'Super',
]

export enum KEY_EVENT {
  press,
  release,
}

export const KEY_POSTFIX = {
  left: '_L',
  right: '_R',
  // means left or right button
  any: '_A',
}
