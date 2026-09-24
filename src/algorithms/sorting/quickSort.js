export const pseudocode = [
  'quickSort(arr, lo, hi):',
  '  if lo < hi:',
  '    p = partition(arr, lo, hi)',
  '    quickSort(arr, lo, p - 1)',
  '    quickSort(arr, p + 1, hi)',
  'partition(arr, lo, hi): pivot = arr[hi]',
  '  ...scan and swap elements < pivot to the left',
]

export function quickSort(input) {
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
      range: null,
      line,
      message,
      ...extra,
    })

  push(0, 'Starting Quick Sort — partition around a pivot, then recurse.')

  function partition(lo, hi) {
    const pivot = arr[hi]
    push(5, `Choosing pivot = arr[${hi}] = ${pivot}.`, { comparing: [hi], range: [lo, hi] })
    let i = lo - 1
    for (let j = lo; j < hi; j++) {
      push(6, `Comparing arr[${j}] = ${arr[j]} with pivot ${pivot}.`, {
        comparing: [j, hi],
        range: [lo, hi],
      })
      if (arr[j] < pivot) {
        i++
        if (i !== j) {
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          push(6, `${arr[i]} < pivot, swapping into position ${i}.`, {
            swapping: [i, j],
            range: [lo, hi],
          })
        }
      }
    }
    ;[arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]]
    push(2, `Placing pivot ${pivot} at its sorted position ${i + 1}.`, {
      swapping: [i + 1, hi],
      range: [lo, hi],
    })
    sorted.push(i + 1)
    return i + 1
  }

  function sort(lo, hi) {
    if (lo < hi) {
      const p = partition(lo, hi)
      sort(lo, p - 1)
      sort(p + 1, hi)
    } else if (lo === hi) {
      sorted.push(lo)
    }
  }

  sort(0, n - 1)
  push(0, 'Quick Sort complete — array is fully sorted.', {
    sorted: Array.from({ length: n }, (_, idx) => idx),
  })
  return steps
}
