import { Component, OnInit } from '@angular/core';
import { NodeComponent } from './Node/node.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  // Grid Related Initialization
  // Although the indexes are fine, why does increasing numCols increase the displayed ROWS and numRows increase COLS??
  numCols = Array(40);
  numRows = Array(20);
  startNode = [10, 10];
  endNode = [30, 10];

  // Grid is a 2-d array
  grid: [];

  constructor() {}

  ngOnInit(): void {}

  initializeGrid() {
    const grid = [];
  }

  isStart(pos): boolean {
    if (JSON.stringify(pos) === JSON.stringify(this.startNode)) {
      return true;
    }
  }

  isEnd(pos): boolean {
    if (JSON.stringify(pos) === JSON.stringify(this.endNode)) {
      return true;
    }
  }
}
