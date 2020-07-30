import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";

import * as Sort from "../../algorithms/sort";

@Component({
  selector: "app-selectionsort",
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.css"],
})
export class SortingAlgorithmsComponent implements OnInit {
  scaledBarWidth: number;

  // Sorting Variables
  unsortedArray: number[] = [];
  sortedArray: number[];
  currentIdx: number;
  comparingIdx: number;

  currentIdxColor = "green";
  comparingIdxColor = "#FF4081";

  // Adjustable Params
  arrayLength = 10;
  sortSpeed = 30;

  // Function reference
  selectedAlgorithm: any;
  selectedAlgorithmName: String;

  constructor() {
    this.unsortedArray = Sort.generateRandomArray(this.arrayLength);
    this.scaledBarWidth = window.innerWidth * 0.7;
    // Default to selection sort
    this.selectedAlgorithm = Sort.SelectionSort;
    this.selectedAlgorithmName = "Selection Sort";
  }

  ngOnInit() {}

  // Idea behind animation is to conditionally style each array element based on its index
  styleBackground(arr: number[], n: number): Object {
    let style = {
      "height.px": arr[n].valueOf() * 4,
      "width.px": this.scaledBarWidth,
    };
    if (this.currentIdx == n) {
      style["background-color"] = this.currentIdxColor;
      return style;
    } else if (this.comparingIdx == n) {
      style["background-color"] = this.comparingIdxColor;
      return style;
    } else {
      style["background-color"] = "#3F51B5";
      return style;
    }
  }

  // Could have had seperate functions for each sort
  // I basically need 2 values - the current index and comparing index
  loadAlgorithm(algo: string) {
    switch (algo) {
      case "SelectionSort":
        console.log("SelectionSort Loaded");
        this.selectedAlgorithm = Sort.SelectionSort;
        this.selectedAlgorithmName = "Selection Sort";
        break;
      case "InsertionSort":
        console.log("InsertionSort Loaded");
        this.selectedAlgorithm = Sort.InsertionSort;
        this.selectedAlgorithmName = "Insertion Sort";
        break;
      case "MergeSort":
        console.log("MergeSort Loaded");
        this.selectedAlgorithm = Sort.MergeSort;
        this.selectedAlgorithmName = "Merge Sort";
        break;
      case "QuickSort":
        console.log("QuickSort Loaded");
        this.selectedAlgorithm = Sort.QuickSort;
        this.selectedAlgorithmName = "Quick Sort";
        break;
      default:
        console.log("Default switch");
    }
  }

  sort() {
    let A = this.unsortedArray;
    console.log(A);

    // Adapted from
    // https://stackoverflow.com/questions/59164452/javascript-settimeout-order-of-execution
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    let stepper = this.selectedAlgorithm(A),
      done = false;
    (async () => {
      while (!done) {
        // visualization here
        let temp = stepper.next();
        console.log("temp is" + temp);
        if (temp.done) {
          this.unsortedArray = temp.value["A"];
          break;
        }
        console.log(temp.value);

        // Render new array and indexs
        // Generator function will either yield just an array or array and indices

        if (temp.value.hasOwnProperty("array")) {
          this.unsortedArray = temp.value["A"];
        } else {
          this.unsortedArray = temp.value["A"];
          this.currentIdx = temp.value["i"];
          this.comparingIdx = temp.value["j"];
        }

        done = temp.done;
        console.log(temp.done);
        // Each animation frame will resolve every x ms
        await timer(1000 / this.sortSpeed);
      }
    })();
  }

  mergeSort() {
    let A = this.unsortedArray;
    this.unsortedArray = Sort.MergeSort(A);
  }

  generateRandomArray() {
    this.unsortedArray = Sort.generateRandomArray(this.arrayLength);
    this.currentIdx = null;
    this.comparingIdx = null;
  }
}
