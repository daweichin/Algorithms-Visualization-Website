import { Heap, Node } from "../interfaces/Heap";

export type NodeObject = {
    [prop: string]: number;
  };

export class MinHeap<T extends number | NodeObject> implements Heap<T> {
    data: HeapNode<T>[];
  
    constructor(arr?: Iterable<T>, keyPropName?: string) {
      this.data = [];
  
      // If keyPropName is supplied, we have an object PQ
      // HACK: This means the object HAS to have a KeyValuePair<keyPropName, number>
      if (arr && keyPropName) {
        const elements = Array.from(arr);
        elements.forEach((el) => {
          const elObj = el as NodeObject;
          this.insert(el, elObj[keyPropName] as number);
        });
      }
  
      else if (arr) {
        const elements = Array.from(arr);
        elements.forEach((el) => {
          const key = el as number;
          this.insert(el, key);
        });
      }
    }
  
    /**********
     * Heap data access
     **********/
  
    /**
     * Get a value at any index of the heap - O(1)
     * @param index
     * @returns
     */
    get(index: number): T | null {
      if (index < this.data.length) {
        // If T is type number, it returns the number
        // If T is type NodeObject, it returns a pointer to the object
        // TODO: Is it better to return a pointer or a deep-copy?
        return this.data[index].value;
      }
      return null;
    }
  
    /**
     * Return the value at the top of the queue
     * @returns T
     */
    peek(): T {
      return this.data[0].value;
    }
  
    /**
     * Heap Modification
     */
  
    /**
     * Removes and returns the top element of the queue
     * @returns T
     */
    pop(): T | undefined {
      if (this.data && this.data.length > 0) {
        // First, swap the first and last element
        this.swap(this, 0, this.data.length)
        // Remove the last element and 

        // TODO: TS saying that "pop" returns undefined even though I have narrowed it, needs investigation
        const minValue = this.data.pop() as HeapNode<T>

        // Heapify Down the root node to restore heap order
        this.heapifyDown(this, 0)

        return minValue.value;
      }
      return undefined;
    }
  
    /**
     * Insertion of an element to the heap - O(logi)
     * @param item
     * @param key Denotes the priority of the item
     */
    insert(item: T, key: number): void {
      if (!item) return;
  
      let newListNode: HeapNode<T> = {
        value: item,
        key: key,
        parent: undefined,
        leftChild: undefined,
        rightChild: undefined,
      };
  
      // Add a heap node to the final position
      const newNodeIndex = this.data.length + 1;
      newListNode.parent = this.data[this.getParentNodeIndex(newNodeIndex)];
      this.data.push(newListNode);
  
      // Maintain heap invariant
      this.heapifyUp(this, newNodeIndex);
    }

    /**
     * Delete an item from the heap
     * 1. Maintain Heap Length Invariant (n -> n-1 items in array) by swapping
     * the last element to the hole
     * 2. Either heapify up if key is smaller than parent, or down, or do nothing
     * @param nodeIndex index to be deleted
     */
    delete(nodeIndex: number): void
    {
        const lastElement = this.data.pop()
        if(lastElement)
        {
            this.data[nodeIndex] = lastElement
            const parentIndex = this.getParentNodeIndex(nodeIndex)
            const parentNode = this.data[parentIndex]

            const shouldHeapifyUp: boolean = lastElement.key < parentNode.key
            const shouldHeapifyDown: boolean = (lastElement.leftChild && lastElement.leftChild.key < lastElement.key) || (lastElement.rightChild && lastElement.rightChild.key < lastElement.key) as boolean

            if(shouldHeapifyUp)
            {
                this.heapifyUp(this, nodeIndex)
            }
            else if (shouldHeapifyDown)
            {             
                this.heapifyDown(this, nodeIndex)
            }
            else 
            {
                return
            }
        }


    }  
    /**
     * Heap invariants
     */
    getLeftChild(nodeIndex: number): HeapNode<T> | never {
      const leftChildIndex = this.getLeftChildIndex(nodeIndex);
      return this.data[leftChildIndex];
    }

    getLeftChildIndex(nodeIndex: number): number {
        return 2 * nodeIndex 
    }

    getRightChild(nodeIndex: number): HeapNode<T> | never {
      const rightChildIndex = this.getRightChildIndex(nodeIndex)
      return this.data[rightChildIndex];
    }

    getRightChildIndex(nodeIndex: number): number {
        return 2 * nodeIndex + 1
    }
  
    getParentNodeIndex(nodeIndex: number): number {
      return Math.floor(nodeIndex / 2);
    }
  
    heapifyUp(heap: Heap<T>, nodeIndex: number) {
      if (nodeIndex > 0) {
        let parentIndex = this.getParentNodeIndex(nodeIndex);
        // If our newly inserted item breaks the min-heap invariant
        if (heap.data[nodeIndex].key < heap.data[parentIndex].key) {
          this.swap(heap, nodeIndex, parentIndex);
        // Recursively fix heap invariant issues going UP the heap
          this.heapifyUp(heap, parentIndex);
        }
      }
    }
    
    heapifyDown(heap: Heap<T>, nodeIndex: number) {
        let len = heap.data.length
        let smallestChildNodeIndex: number = 0;
        
        // If the nodeIndex is already a leaf node do nothing
        if(2*nodeIndex > len) {
            return
        }
        // Else we are heapifyDowning on an element in the "middle" of heap
        else if (2*nodeIndex < len)
        {
            const node = heap.data[nodeIndex]
            const leftChild = this.getLeftChild(nodeIndex)
            const rightChild = this.getRightChild(nodeIndex)
            // Get the smallest index between the two children
            leftChild.key < rightChild.key 
            ? smallestChildNodeIndex = this.getLeftChildIndex(nodeIndex) 
            : smallestChildNodeIndex = this.getRightChildIndex(nodeIndex)
        }
        else if (2*nodeIndex === len)
        {
            // This case occurs when we have a "almost complete" balanced binary-heap
            smallestChildNodeIndex = 2 * nodeIndex
        }

        if (heap.data[nodeIndex].key < heap.data[smallestChildNodeIndex].key) {
            this.swap(this, nodeIndex, smallestChildNodeIndex)
            // Recursively fix heap invariant issues going DOWN the heap
            this.heapifyDown(this, smallestChildNodeIndex)
        }
    }
    /**
     * Utility Functions
     */
  
    /**
     * Swap two elements of a given Heap
     * @param heap
     * @param heapNodeIndexA child node index
     * @param heapNodeIndexB parent node index
     */
    swap(heap: Heap<T>, heapNodeIndexA: number, heapNodeIndexB: number) {
      const temp = heap.data[heapNodeIndexA];
      heap.data[heapNodeIndexA] = heap.data[heapNodeIndexB];
      heap.data[heapNodeIndexB] = temp;
    }
}

export interface HeapNode<T> extends Node<T> {
    // Parent can be undefined if it is root node
    parent: HeapNode<T> | undefined;
    // Left/Right Child can be undefined if they are at the "bottom" of heap
    leftChild: HeapNode<T> | undefined;
    rightChild: HeapNode<T> | undefined;
  }