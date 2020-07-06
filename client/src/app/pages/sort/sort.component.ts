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

  currentIdxColor = "#3D1173";
  comparingIdxColor = "#FBEAE3";

  arrayLength = 30;

  // Function? Could make it class of Algorithm
  selectedAlgorithm: any;

  constructor() {
    this.unsortedArray = Sort.generateRandomArray(this.arrayLength);
    this.scaledBarWidth = window.innerWidth * 0.7;
    this.selectedAlgorithm = Sort.SelectionSort;
  }

  ngOnInit() {}

  // Style the background depending on if the current
  // index is the current one or the one we are comparing to
  styleBackground(arr: number[], n: number): Object {
    let style = {
      "height.px": n.valueOf() * 4,
      "width.px": this.scaledBarWidth,
    };
    if (this.currentIdx === arr.indexOf(n)) {
      style["background-color"] = this.currentIdxColor;
      console.log(style);
      return style;
    } else if (this.comparingIdx === arr.indexOf(n)) {
      style["background-color"] = this.comparingIdxColor;
      return style;
    } else {
      style["background-color"] = "blue";
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
        console.log(temp.value);
        this.currentIdx = temp.value["i"];
        this.comparingIdx = temp.value["j"];
        done = temp.done;
        console.log(temp.done);
        await timer(10);
      }
    })();
  }

  generateRandomArray() {
    this.unsortedArray = Sort.generateRandomArray(this.arrayLength);
  }
}
