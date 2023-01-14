import {GridNode} from "./Node"
import { Action } from "./Plan";

// Graph Interface for Adjacency Lists
export interface Graph {
    adjLists?: Map<string,GridNode[]>
    adjListWithAction?: Map<string, Array<[GridNode,Action]>>;
}