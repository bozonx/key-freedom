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
