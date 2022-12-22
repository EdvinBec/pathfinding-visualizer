import { NodeType } from "../interfaces";

export const dijkstra = (
  grid: Array<Array<NodeType>>,
  startNode: NodeType,
  finishNode: NodeType
) => {
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);

    const closestNode = unvisitedNodes.shift();

    if (closestNode?.isWall === true) {
      continue;
    }
    if (closestNode?.distance === Infinity) break;
    if (closestNode === finishNode) {
      break;
    }

    if (closestNode) {
      closestNode.isVisited = true;

      updateUnvisitedNeighbors(grid, closestNode);
    }
  }
  const shortestPath = getNodesInShortestPath(finishNode);
  return shortestPath;
};

const updateUnvisitedNeighbors = (
  grid: Array<Array<NodeType>>,
  closestNode: NodeType
) => {
  const neighbors = getAllNeighbors(grid, closestNode);

  for (const neighbor of neighbors) {
    neighbor.distance = closestNode.distance + 1;
    neighbor.previousNode = closestNode;
  }
};

const getAllNeighbors = (grid: Array<Array<NodeType>>, node: NodeType) => {
  const neighbors = [];
  const { row, col } = node;

  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row > 0) neighbors.push(grid[row][col - 1]);

  return neighbors.filter((neighbor) => {
    return neighbor ? !neighbor.isVisited : false;
  });
};

const sortNodesByDistance = (unvisitedNodes: Array<NodeType>) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const getAllNodes = (grid: Array<Array<NodeType>>) => {
  const nodes = [];

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }

  return nodes;
};

const getNodesInShortestPath = (finishNode: any) => {
  const nodesInShortestPath = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPath;
};
