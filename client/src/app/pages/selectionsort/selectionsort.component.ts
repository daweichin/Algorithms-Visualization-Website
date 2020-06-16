import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-selectionsort',
  templateUrl: './selectionsort.component.html',
  styleUrls: ['./selectionsort.component.css']
})
export class SelectionsortComponent implements OnInit, AfterViewInit {


  @ViewChild("canvas")
  canvas: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;

  unsortedArray: number[] = [];
  sortedArray: number[];
  loadedAlgorithm: any;

  constructor() {
    this.generateUnsortedArray(30);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.canvas.nativeElement.getContext('2d');
  }

  initArray(algo: string){
    switch(algo) {
      case "SelectionSort":
        this.loadedAlgorithm = this.selectionSort;
      default:
        console.log("Default switch")
    }
  }

  sort() {}

  // TODO: Move sorting algorithms to separate 'core' module
  selectionSort() {
    console.log("Sorting with selection sort");
  }

  generateUnsortedArray(n: number) {
    for(var i=0; i < n; i++) {
      this.unsortedArray.push(Math.floor(50*(Math.random()+0.5)));
    }
    console.log(this.unsortedArray)
  }
}
