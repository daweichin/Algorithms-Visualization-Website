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
  // Rendering Variables
  scaledBarWidth: number;
  unsortedArray: number[] = [];
  sortedArray: number[];
  currentIdx: number;
  comparingIdx: number;
  currentIdxColor = "green";
  comparingIdxColor = "#FF4081";

  // Adjustable Params
  arrayLength = 25;
  sortSpeed = 30;
  sortInProgress = false;

  // Function reference
  selectedAlgorithm: any;
  selectedAlgorithmName: string;

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
        break;
      case "InsertionSort":
        console.log("InsertionSort Loaded");
        this.selectedAlgorithm = Sort.InsertionSort;
        break;
      case "MergeSort":
        console.log("MergeSort Loaded");
        this.selectedAlgorithm = Sort.GenMergeSort;
        break;
      case "QuickSort":
        console.log("QuickSort Loaded");
        this.selectedAlgorithm = Sort.GenQuickSort;
        break;
      default:
        console.log("Default switch");
    }
  }

  sort() {
    this.sortInProgress = true;

    this.loadAlgorithm(this.selectedAlgorithmName);
    let A = this.unsortedArray;

    // Adapted from
    // https://stackoverflow.com/questions/59164452/javascript-settimeout-order-of-execution
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    let stepper = this.selectedAlgorithm(A),
      done = false;
    (async () => {
      while (!done) {
        // visualization here

        let temp = stepper.next();
        done = temp.done;
        console.log(temp.value);

        if (temp.done) {
          // Sort is over
          this.currentIdx = null;
          this.comparingIdx = null;
          this.sortInProgress = false;
          break;
        } else {
          this.unsortedArray = temp.value["A"];
          this.currentIdx = temp.value["currentIdx"];
          this.comparingIdx = temp.value["comparingIdx"];
        }

        console.log(temp.done);
        // Each animation frame will resolve every x ms
        await timer(1000 / this.sortSpeed);
      }
    })();
  }

  generateRandomArray() {
    this.unsortedArray = Sort.generateRandomArray(this.arrayLength);
    this.currentIdx = null;
    this.comparingIdx = null;
  }
}
