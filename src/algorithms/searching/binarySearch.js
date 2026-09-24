export const pseudocode = [
  'lo = 0, hi = n - 1',
  'while lo <= hi',
  '  mid = (lo + hi) / 2',
  '  if arr[mid] == target: return mid',
  '  elif arr[mid] < target: lo = mid + 1',
  '  else: hi = mid - 1',
  'return -1  // not found',
]

export function binarySearch(input, target) {
  const arr = [...input].sort((a, b) => a - b)
  const steps = []

  const push = (line, message, extra = {}) =>
    steps.push({
      array: [...arr],
      current: null,
      found: null,
      low: null,
      high: null,
      mid: null,
      line,
      message,
      ...extra,
    })

  let lo = 0
  let hi = arr.length - 1
  push(0, `Searching sorted array for ${target}. lo = ${lo}, hi = ${hi}.`, { low: lo, high: hi })

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    push(2, `mid = (${lo} + ${hi}) / 2 = ${mid}, arr[${mid}] = ${arr[mid]}.`, {
      low: lo,
      high: hi,
      mid,
      current: mid,
    })
    if (arr[mid] === target) {
      push(3, `Found ${target} at index ${mid}.`, { low: lo, high: hi, mid, found: mid })
      return steps
    } else if (arr[mid] < target) {
      push(4, `arr[${mid}] = ${arr[mid]} < ${target}, search the right half.`, {
        low: lo,
        high: hi,
        mid,
      })
      lo = mid + 1
    } else {
      push(5, `arr[${mid}] = ${arr[mid]} > ${target}, search the left half.`, {
        low: lo,
        high: hi,
        mid,
      })
      hi = mid - 1
    }
  }
  push(6, `${target} was not found in the array.`, { found: -1 })
  return steps
}
