export const pseudocode = [
  'for i = 0 to n - 1',
  '  min = i',
  '  for j = i + 1 to n - 1',
  '    if arr[j] < arr[min]',
  '      min = j',
  '  swap(arr[i], arr[min])',
]

export function selectionSort(input) {
  const arr = [...input]
  const n = arr.length
  const steps = []
  const sorted = []

  const push = (line, message, extra = {}) =>
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      line,
      message,
      ...extra,
    })

  push(0, 'Starting Selection Sort.')

  for (let i = 0; i < n; i++) {
    let min = i
    push(1, `Assume arr[${i}] = ${arr[i]} is the minimum of the unsorted region.`, {
      comparing: [i],
    })
    for (let j = i + 1; j < n; j++) {
      push(3, `Comparing arr[${j}] = ${arr[j]} with current minimum arr[${min}] = ${arr[min]}.`, {
        comparing: [min, j],
      })
      if (arr[j] < arr[min]) {
        min = j
        push(4, `New minimum found: arr[${min}] = ${arr[min]}.`, { comparing: [min] })
      }
    }
    if (min !== i) {
      push(5, `Swapping arr[${i}] = ${arr[i]} with arr[${min}] = ${arr[min]}.`, {
        swapping: [i, min],
      })
      ;[arr[i], arr[min]] = [arr[min], arr[i]]
    }
    sorted.push(i)
    push(5, `Element ${arr[i]} placed at index ${i}.`)
  }

  push(0, 'Selection Sort complete — array is fully sorted.', { comparing: [], swapping: [] })
  return steps
}
