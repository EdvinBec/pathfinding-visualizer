export interface NodeType {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  previousNode: NodeType | null;
  distance: number;
  isWall: boolean;
}

export interface StartFinishPosition {
  start: {
    x: number;
    y: number;
  };
  finish: {
    x: number;
    y: number;
  };
}
