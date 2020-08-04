import { animation } from "@angular/animations";
// Implementation in ts
// O(N^2) Algorithms
/*
 * Time Complexity: O(N^2)
 * Inplace, not stable
 */
function* SelectionSort(A: number[]) {
  let minIndex;
  for (let i = 0; i < A.length; i++) {
    minIndex = i;
    for (let j = i + 1; j < A.length; j++) {
      if (A[j] < A[minIndex]) {
        // minIndex represents the next smallest element
        minIndex = j;
      }
      // Yield the array, current index and comparing index
      let currentIdx = i;
      let comparingIdx = j;
      yield { A, currentIdx, comparingIdx };
    }
    const temp = A[i];
    A[i] = A[minIndex];
    A[minIndex] = temp;
  }
  return A;
}

/**
 * Idea is to loop through all elements, keeping a left sorted subarray,
 * then shift the element to its sorted position in the left subarray,
 * shifting sorted elements in the subarray upwards if needed.
 * This creates a best case of O(N) if all the elements are already sorted, and worst case of O(N^2) if the list is reversed
 * @param A
 */
function* InsertionSort(A: number[]) {
  for (let i = 0; i < A.length; i++) {
    let v = A[i];
    let j = i - 1;
    while (j >= 0 && v < A[j]) {
      A[j + 1] = A[j];
      j = j - 1;
      let currentIdx = i;
      let comparingIdx = j;
      yield { A, currentIdx, comparingIdx };
    }
    A[j + 1] = v;
    let currentIdx = i;
    let comparingIdx = j;
    yield { A, currentIdx, comparingIdx };
  }
  return A;
}

// O(NLOG(N)) Algorithms

function* GenMergeSort(A: number[]) {
  // Sort the algorithm and return steps]
  const results: Steps[] = [];

  // Async/await for the quicksort to finish before yielding values
  let fullArray = A.slice();
  MergeSort(A, results, fullArray, 0);
  console.log("MergeSort Complete", fullArray);

  while (results.length > 0) {
    let a = results.shift();
    yield a;
  }
}

/**
 * MergeSort
 * @param Array
 */
function MergeSort(
  A: number[],
  results: Steps[],
  fullArray: number[],
  depth: number
) {
  if (A.length > 1) {
    // add one to depth
    depth++;
    let currentDepth = depth;
    let insertionsLeft = Math.pow(2, currentDepth - 1);
    let counter = 0;
    let half = Math.floor(A.length / 2);
    // Slice used to not change original array A
    let B = A.slice(0, half);
    let C = A.slice(half, A.length);
    let left = MergeSort(B, results, fullArray, depth);
    let right = MergeSort(C, results, fullArray, depth);

    // Visualization Code:
    // Return 'full-array' by concating the subarrays into the correct 'partitions'
    let temp: number[] = Merge2(left, right, results, fullArray);
    // Replace part of the fullarray by calculating index based on 1. depth
    let numPartitionsAtDepth = Math.pow(2, currentDepth - 1);
    let indexFactor = fullArray.length / numPartitionsAtDepth;

    if (insertionsLeft > 0) {
      fullArray.splice(counter * indexFactor, temp.length, ...temp);
      console.log(insertionsLeft, counter, currentDepth, fullArray);
      const step: Steps = {
        A: fullArray.slice(),
      };
      results.push(step);
      counter++;
      insertionsLeft--;
    }

    return temp;
  }
  // Base Case: A is a single element just return
  else {
    return A;
  }
}

function Merge(B: number[], C: number[], A: number[], fullArray) {
  let i = 0,
    j = 0,
    k = 0;
  while (i < B.length && j < C.length) {
    if (B[i] <= C[j]) {
      // yield { A, i, j };
      A[k] = B[i];
      i++;
    } else {
      // yield { A, i, j };
      A[k] = C[j];
      j++;
    }
    k++;
  }
  // If we looped through all B array, then all of B is smaller than C and we copy C to the upper half
  // Splice array A from index k to length of 'smaller array', updating it
  var C = C.splice(j);
  var B = B.splice(i);
  console.log("DEBUG: Merged A");
  console.log(B, C);
  console.log(i, k, C.length, ...C);

  console.log(A);
  if ((i = B.length)) {
    // Copy C to A
    A.splice(k, C.length, ...C);
  } else {
    // Copy B to A
    A.splice(k, B.length, ...B);
  }
  // yield { A, array: true };
  console.log(A);
  return A;
}

function Merge2(arr1, arr2, results, fullArray) {
  // console.log("DEBUG: Merging these");
  // console.log(arr1, arr2);
  let sorted = [];

  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      sorted.push(arr1.shift());
    } else {
      sorted.push(arr2.shift());
    }
  }
  let concated = sorted.concat(arr1.slice().concat(arr2.slice()));
  const step: Steps = { A: fullArray.slice(), currentIdx: 0, comparingIdx: 0 };
  results.push(step);
  return concated;
}

// Quicksort with Hoare partioning
// Hoares partioning is faster but harder to implement
// Lumuto is slower but easier to understand/implement

function* GenQuickSort(A: number[]) {
  // const temp = [...A].sort((a, b) => a - b);
  // console.log(temp, A);

  // Sort the algorithm and return steps]
  const results: Steps[] = [];

  // Async/await for the quicksort to finish before yielding values
  QuickSort(A, 0, A.length - 1, results);
  console.log("QuickSort Complete", A);

  while (results.length > 0) {
    let a = results.shift();
    yield a;
  }
}

// Some implementation help from
// https://humanwhocodes.com/blog/2012/11/27/computer-science-in-javascript-quicksort/

function QuickSort(A: number[], lo, hi, results) {
  // console.log("New Quicksort", A, lo, hi);
  // console.log(JSON.stringify(results));
  let s;
  if (A.length > 1) {
    s = HoarePartition(A, lo, hi, results);
    if (lo < s - 1) {
      QuickSort(A, lo, s - 1, results);
    }
    if (s < hi) {
      QuickSort(A, s, hi, results);
    }
  }
  return A;
}

function HoarePartition(A: number[], lo, hi, results) {
  let p = A[Math.floor((lo + hi) / 2)],
    i = lo,
    j = hi;

  // Move indexes towards each other until they meet
  while (i <= j) {
    while (A[i] < p) {
      i++;
      const step: Steps = { A: A.slice(), currentIdx: i, comparingIdx: j };
      results.push(step);
    }
    while (A[j] > p) {
      j--;
      const step: Steps = { A: A.slice(), currentIdx: i, comparingIdx: j };
      results.push(step);
    }
    if (i <= j) {
      Swap(A, i, j);
      const step: Steps = { A: A.slice(), currentIdx: i, comparingIdx: j };
      results.push(step);

      i++;
      j--;
    }
  }
  return i;
}

// Helper Functions

// Swap Utility Function
function Swap(A: number[], lo: number, hi: number) {
  if (lo === hi) {
    return;
  }

  let temp = A[lo];
  A[lo] = A[hi];
  A[hi] = temp;
}

function generateRandomArray(n: number) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    let rand = Math.floor(Math.random() * 100);
    arr.push(rand);
  }
  return arr;
}

interface Steps {
  A: number[];
  currentIdx?: number;
  comparingIdx?: number;
  stackDepth?: number;
}

export {
  SelectionSort,
  InsertionSort,
  generateRandomArray,
  MergeSort,
  GenQuickSort,
  GenMergeSort,
  QuickSort,
  Merge,
  Swap,
};
