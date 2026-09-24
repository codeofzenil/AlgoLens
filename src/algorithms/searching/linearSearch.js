export const pseudocode = [
  'for i = 0 to n - 1',
  '  if arr[i] == target',
  '    return i',
  'return -1  // not found',
]

export function linearSearch(input, target) {
  const arr = [...input]
  const steps = []

  const push = (line, message, extra = {}) =>
    steps.push({ array: [...arr], current: null, found: null, line, message, ...extra })

  push(0, `Searching for ${target}, scanning left to right.`)

  for (let i = 0; i < arr.length; i++) {
    push(1, `Checking arr[${i}] = ${arr[i]}.`, { current: i })
    if (arr[i] === target) {
      push(2, `Found ${target} at index ${i}.`, { current: i, found: i })
      return steps
    }
  }
  push(3, `${target} was not found in the array.`, { found: -1 })
  return steps
}
