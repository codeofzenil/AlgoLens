import { bubbleSort, pseudocode as bubblePseudo } from '../algorithms/sorting/bubbleSort.js'
import { selectionSort, pseudocode as selectionPseudo } from '../algorithms/sorting/selectionSort.js'
import { insertionSort, pseudocode as insertionPseudo } from '../algorithms/sorting/insertionSort.js'
import { mergeSort, pseudocode as mergePseudo } from '../algorithms/sorting/mergeSort.js'
import { quickSort, pseudocode as quickPseudo } from '../algorithms/sorting/quickSort.js'
import { linearSearch, pseudocode as linearPseudo } from '../algorithms/searching/linearSearch.js'
import { binarySearch, pseudocode as binaryPseudo } from '../algorithms/searching/binarySearch.js'

export const CATEGORIES = {
  sorting: { label: 'Sorting' },
  searching: { label: 'Searching' },
}

// Single source of truth: every algorithm's metadata, pseudocode, and step
// generator lives here. Add a new algorithm by adding one file under
// src/algorithms/ and one entry below — nothing else needs to change.
export const ALGORITHMS = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    description:
      'Repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order.',
    howItWorks: [
      'Compare each pair of adjacent elements.',
      'Swap them if the left is greater than the right.',
      'After each full pass, the largest unsorted element bubbles to its final position.',
      'Repeat until a full pass makes no swaps.',
    ],
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    pseudocode: bubblePseudo,
    run: (input) => bubbleSort(input),
    inputKind: 'array',
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'sorting',
    description:
      'Divides the array into a sorted and unsorted region, repeatedly selecting the smallest remaining element.',
    howItWorks: [
      'Find the minimum element in the unsorted region.',
      'Swap it with the first element of the unsorted region.',
      'Move the sorted/unsorted boundary one step forward.',
      'Repeat until the whole array is sorted.',
    ],
    complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    pseudocode: selectionPseudo,
    run: (input) => selectionSort(input),
    inputKind: 'array',
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'sorting',
    description:
      'Builds the sorted array one element at a time by inserting each new element into its correct position.',
    howItWorks: [
      'Take the next unsorted element as the "key".',
      'Shift sorted elements greater than the key one position right.',
      'Insert the key into the gap left behind.',
      'Repeat for every element in the array.',
    ],
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    pseudocode: insertionPseudo,
    run: (input) => insertionSort(input),
    inputKind: 'array',
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    description:
      'A divide-and-conquer algorithm that splits the array in half, sorts each half, and merges the results.',
    howItWorks: [
      'Recursively split the array into halves until each has one element.',
      'Merge pairs of sorted halves back together in order.',
      'Continue merging until the full array is reassembled, sorted.',
    ],
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    pseudocode: mergePseudo,
    run: (input) => mergeSort(input),
    inputKind: 'array',
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'sorting',
    description:
      'A divide-and-conquer algorithm that partitions the array around a pivot, then recursively sorts each side.',
    howItWorks: [
      'Choose a pivot element (here, the last element of the range).',
      'Partition the range so smaller elements sit left of the pivot, larger sit right.',
      'Recursively apply the same process to each side of the pivot.',
    ],
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
    pseudocode: quickPseudo,
    run: (input) => quickSort(input),
    inputKind: 'array',
  },
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'searching',
    description: 'Checks every element in sequence until the target is found or the array ends.',
    howItWorks: [
      'Start at the first element.',
      'Compare it to the target value.',
      'If it matches, return the index; otherwise move to the next element.',
      'If the end of the array is reached, the target is not present.',
    ],
    complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
    pseudocode: linearPseudo,
    run: (input, target) => linearSearch(input, target),
    inputKind: 'array-target',
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'searching',
    description: 'Repeatedly halves a sorted array to quickly locate a target value.',
    howItWorks: [
      'Requires a sorted array.',
      'Compare the target to the middle element.',
      'If equal, done. If smaller, search the left half; if larger, search the right half.',
      'Repeat until found or the search range is empty.',
    ],
    complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
    pseudocode: binaryPseudo,
    run: (input, target) => binarySearch(input, target),
    inputKind: 'array-target',
    requiresSorted: true,
  },
]

export const getAlgorithm = (id) => ALGORITHMS.find((a) => a.id === id)
export const algorithmsByCategory = (category) => ALGORITHMS.filter((a) => a.category === category)
