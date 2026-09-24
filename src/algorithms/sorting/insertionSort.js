export const pseudocode = [
  'for i = 1 to n - 1',
  '  key = arr[i]',
  '  j = i - 1',
  '  while j >= 0 and arr[j] > key',
  '    arr[j + 1] = arr[j]',
  '    j = j - 1',
  '  arr[j + 1] = key',
]

export function insertionSort(input) {
  const arr = [...input]
  const n = arr.length
  const steps = []

  const push = (line, message, extra = {}) =>
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: extra.sortedUpTo ?? 0 }, (_, k) => k),
      line,
      message,
      ...extra,
    })

  push(0, 'Starting Insertion Sort.', { sortedUpTo: 1 })

  for (let i = 1; i < n; i++) {
    const key = arr[i]
    let j = i - 1
    push(1, `Picking key = arr[${i}] = ${key} to insert into the sorted region.`, {
      comparing: [i],
      sortedUpTo: i,
    })
    while (j >= 0 && arr[j] > key) {
      push(3, `arr[${j}] = ${arr[j]} > key (${key}), shifting it right.`, {
        comparing: [j],
        swapping: [j, j + 1],
        sortedUpTo: i,
      })
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = key
    push(6, `Placing key ${key} at index ${j + 1}.`, { comparing: [j + 1], sortedUpTo: i + 1 })
  }

  push(0, 'Insertion Sort complete — array is fully sorted.', { sortedUpTo: n })
  return steps
}
