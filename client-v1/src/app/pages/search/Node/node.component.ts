import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  // Rendering Variables
  nodeSize: number;
  unsortedArray: number[] = [];
  sortedArray: number[];
  currentIdx: number;
  comparingIdx: number;
  currentIdxColor = 'green';
  comparingIdxColor = '#FF4081';

  @Input() numNodes: number;

  constructor() {
    this.nodeSize = 16;
  }

  ngOnInit(): void {}

  styleNode() {
    let style = {
      'height.px': this.nodeSize,
      'width.px': this.nodeSize,
    };
    style['border'] = '1px solid red';
    return style;
    // if (this.currentIdx == n) {
    //   style['background-color'] = this.currentIdxColor;
    //   return style;
    // } else if (this.comparingIdx == n) {
    //   style['background-color'] = this.comparingIdxColor;
    //   return style;
    // } else {
    //   style['background-color'] = '#3F51B5';
    //   return style;
    // }
  }

  test() {
    alert('Clicked on node');
    console.log('clicked');
  }
}
