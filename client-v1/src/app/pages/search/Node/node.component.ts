import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  nodeSize: number;

  @Input() numNodes: number;
  @Input() isStart: boolean;
  @Input() isEnd: boolean;
  @Input() position: number[];

  constructor() {
    // Nodesize in px
    this.nodeSize = 16;
  }

  ngOnInit(): void {}

  styleNode() {
    let style = {
      'height.px': this.nodeSize,
      'width.px': this.nodeSize,
    };
    style['border'] = '0.5px solid blue';
    if (this.isStart === true) {
      style['background-color'] = 'blue';
      return style;
    } else if (this.isEnd === true) {
      style['background-color'] = 'pink';
      return style;
    } else {
      return style;
    }
  }

  // Testing Function to give information about a particular node
  test() {
    console.log(this.position);
  }
}
