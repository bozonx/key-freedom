export function lastItem(arr: any[]): any {
  // shift when you calculates length
  const ARRAY_INDEX_SHIFT = 1;

  return arr[arr.length - ARRAY_INDEX_SHIFT];
}

// TODO: test
export function withoutLastItem(arr: any[]): any[] {
  return arr.slice(0, arr.length - 1)
}

export function compactUndefined(arr: any[]): any[] {
  return arr.filter((item) => typeof item !== 'undefined');
}

// TODO: test
export function uniqueArray(arr: any[]): any[] {
  const result: any[] = []

  for (const item of arr) {

    // TODO: add checks for arrays, objects, and functions

    if (!result.includes(item)) result.push(item)
  }

  return result
}
