// Bubble Sort — generates a sequence of visualization states.
// Each state: { array, comparing, swapping, sorted, line, message }
export const pseudocode = [
  'for i = 0 to n - 1',
  '  for j = 0 to n - i - 2',
  '    if arr[j] > arr[j + 1]',
  '      swap(arr[j], arr[j + 1])',
]

export function bubbleSort(input) {
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

  push(0, 'Starting Bubble Sort.')

  for (let i = 0; i < n; i++) {
    push(0, `Pass ${i + 1}: bubble the largest remaining element to the end.`)
    let swappedAny = false
    for (let j = 0; j < n - i - 1; j++) {
      push(2, `Comparing arr[${j}] = ${arr[j]} and arr[${j + 1}] = ${arr[j + 1]}.`, {
        comparing: [j, j + 1],
      })
      if (arr[j] > arr[j + 1]) {
        push(3, `${arr[j]} > ${arr[j + 1]}, swapping.`, {
          comparing: [j, j + 1],
          swapping: [j, j + 1],
        })
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swappedAny = true
        push(3, `Swapped. Array is now [${arr.join(', ')}].`, { swapping: [j, j + 1] })
      } else {
        push(2, `${arr[j]} <= ${arr[j + 1]}, no swap needed.`)
      }
    }
    sorted.unshift(n - i - 1)
    push(0, `Element ${arr[n - i - 1]} is now in its final sorted position.`)
    if (!swappedAny) break
  }

  for (let k = 0; k < n; k++) if (!sorted.includes(k)) sorted.push(k)
  push(0, 'Bubble Sort complete — array is fully sorted.', { comparing: [], swapping: [] })

  return steps
}
