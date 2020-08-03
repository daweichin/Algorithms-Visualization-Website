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
      yield { A, i, j };
    }
    console.log("Swap Made");
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
      yield { A, i, j };
    }
    A[j + 1] = v;
    yield { A, i, j };
  }
  return A;
}

// O(NLOG(N)) Algorithms

// Big problem: Recursion and Generator functions are tricky to implement

/**
 * MergeSort
 * @param Array
 */
function MergeSort(A: number[]) {
  if (A.length > 1) {
    let half = Math.floor(A.length / 2);
    // Splice used to change original array A
    let B = A.slice(0, half);
    let C = A.slice(half, A.length);
    let left = MergeSort(B);
    let right = MergeSort(C);
    // console.log("DEBUG: LRA");
    // console.log(left, right, A);
    let it = Merge2(left, right);
    let temp = [];
    for (const itItem of it) {
      console.log("IT ITEM");
      console.log(itItem);
      temp.push(itItem);
    }
    console.log(temp);
    return temp.reduce((acc, val) => acc.concat(val), []);
  }
  // Base Case: A is a single element just return
  else {
    return A;
  }
}

function Merge(B: number[], C: number[], A: number[]) {
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

function* Merge2(arr1, arr2) {
  console.log("DEBUG: Merging these");
  console.log(arr1, arr2);
  let sorted = [];

  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      sorted.push(arr1.shift());
    } else {
      sorted.push(arr2.shift());
    }
  }

  yield sorted.concat(arr1.slice().concat(arr2.slice()));
}
// Quicksort with Hoare partioning
// Hoares partioning is faster but harder to implement
// Lumuto is slower but easier to understand/implement

interface Steps {
  A: number[];
  currentIdx: number;
  comparingIdx: number;
}

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
  console.log("New Quicksort", A, lo, hi);
  console.log(JSON.stringify(results));
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
  console.log("Partioning");
  let p = A[Math.floor((lo + hi) / 2)],
    i = lo,
    j = hi;

  // Move indexes towards each other until they meet
  while (i <= j) {
    while (A[i] < p) {
      i++;
      const step: Steps = { A: A.slice(), currentIdx: i, comparingIdx: j };
      results.push(step);
      console.log(JSON.stringify(results));
    }
    while (A[j] > p) {
      j--;
      const step: Steps = { A: A, currentIdx: i, comparingIdx: j };
      results.push(step);
      console.log(JSON.stringify(results));
    }
    if (i <= j) {
      Swap(A, i, j);
      const step: Steps = { A: A, currentIdx: i, comparingIdx: j };
      results.push(step);
      console.log(JSON.stringify(results));

      i++;
      j--;
    }
  }
  return i;
}

// Swap Utility Function
function Swap(A: number[], lo: number, hi: number) {
  if (lo === hi) {
    return;
  }

  let temp = A[lo];
  A[lo] = A[hi];
  A[hi] = temp;
}
// Helper Functions
// Generating a random number of arrays based on a size n
function generateRandomArray(n: number) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    let rand = Math.floor(Math.random() * 100);
    arr.push(rand);
  }
  return arr;
}

export {
  SelectionSort,
  InsertionSort,
  generateRandomArray,
  MergeSort,
  GenQuickSort,
  QuickSort,
  Merge,
  Swap,
};
