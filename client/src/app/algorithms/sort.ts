// Swap Utility Function
function Swap(A: number[], lo: number, hi: number) {
  if (lo === hi) {
    return;
  }

  let temp = A[lo];
  A[lo] = A[hi];
  A[hi] = temp;
}

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
  }
  return A;
}

// O(NLOG(N)) Algorithms

/**
 * MergeSort
 * @param Array
 */
function* MergeSort(A: number[]) {
  if (A.length > 1) {
    let half = Math.floor(A.length / 2);
    // Splice used to change original array A
    let B = A.splice(0, half);
    let C = A.splice(half, A.length);
    MergeSort(B);
    MergeSort(C);
    Merge(B, C, A);
  }
  console.log(A);
  return A;
}

function Merge(B: number[], C: number[], A: number[]) {
  let i = 0,
    j = 0,
    k = 0;
  while (i < B.length - 1) {
    if (B[i] < C[j]) {
      A[k] = B[i];
      i++;
    } else {
      A[k] = C[j];
      j++;
    }
    k++;
  }
  // If we looped through all B array, then all of B is smaller than C and we copy C to the upper half
  if ((i = B.length)) {
    // Copy C to A
    A.push(...C);
  } else {
    // Copy B to A
    A.push(...B);
  }
}

// Quicksort with Hoare partioning
// Hoares partioning is faster but harder to implement
// Lumuto is slower but easier to understand/implement
function* QuickSort(A: number[]) {}

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
  QuickSort,
  Swap,
};
