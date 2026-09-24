export const pseudocode = [
  'mergeSort(arr, lo, hi):',
  '  if lo >= hi: return',
  '  mid = (lo + hi) / 2',
  '  mergeSort(arr, lo, mid)',
  '  mergeSort(arr, mid + 1, hi)',
  '  merge(arr, lo, mid, hi)',
]

export function mergeSort(input) {
  const arr = [...input]
  const n = arr.length
  const steps = []
  const sortedRanges = []

  const push = (line, message, extra = {}) =>
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: sortedRanges.flat(),
      range: null,
      line,
      message,
      ...extra,
    })

  push(0, 'Starting Merge Sort — repeatedly split the array in half, then merge sorted halves.')

  function sort(lo, hi) {
    if (lo >= hi) return
    const mid = Math.floor((lo + hi) / 2)
    push(2, `Splitting range [${lo}, ${hi}] at mid = ${mid}.`, { range: [lo, hi] })
    sort(lo, mid)
    sort(mid + 1, hi)
    merge(lo, mid, hi)
  }

  function merge(lo, mid, hi) {
    const left = arr.slice(lo, mid + 1)
    const right = arr.slice(mid + 1, hi + 1)
    let i = 0,
      j = 0,
      k = lo
    push(5, `Merging sorted ranges [${lo}, ${mid}] and [${mid + 1}, ${hi}].`, { range: [lo, hi] })
    while (i < left.length && j < right.length) {
      push(5, `Comparing ${left[i]} and ${right[j]}.`, {
        comparing: [lo + i, mid + 1 + j],
        range: [lo, hi],
      })
      if (left[i] <= right[j]) {
        arr[k] = left[i]
        i++
      } else {
        arr[k] = right[j]
        j++
      }
      push(5, `Placing ${arr[k]} at index ${k}.`, { swapping: [k], range: [lo, hi] })
      k++
    }
    while (i < left.length) {
      arr[k] = left[i]
      push(5, `Copying remaining left element ${arr[k]} to index ${k}.`, {
        swapping: [k],
        range: [lo, hi],
      })
      i++
      k++
    }
    while (j < right.length) {
      arr[k] = right[j]
      push(5, `Copying remaining right element ${arr[k]} to index ${k}.`, {
        swapping: [k],
        range: [lo, hi],
      })
      j++
      k++
    }
    if (lo === 0 && hi === n - 1) {
      sortedRanges.push(Array.from({ length: n }, (_, idx) => idx))
    }
    push(5, `Range [${lo}, ${hi}] is now sorted: [${arr.slice(lo, hi + 1).join(', ')}].`, {
      range: [lo, hi],
    })
  }

  sort(0, n - 1)
  push(0, 'Merge Sort complete — array is fully sorted.', {
    sorted: Array.from({ length: n }, (_, idx) => idx),
  })
  return steps
}
