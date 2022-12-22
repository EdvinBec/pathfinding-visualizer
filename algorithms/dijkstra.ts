import { NodeType } from "../interfaces";

export const dijkstra = (
  grid: Array<Array<NodeType>>,
  startNode: NodeType,
  finishNode: NodeType
) => {
  let errorMsg = ""; //If there is no available path, save message here

  const visitedNodesInOrder = []; //Saved nodes in the order that they were visited
  const unvisitedNodes = getAllNodes(grid);

  startNode.distance = 0;

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);

    const closestNode = unvisitedNodes.shift();

    if (closestNode?.isWall) {
      continue;
    }

    if (closestNode?.distance === Infinity) {
      //If start node is surrounded by walls break loop
      errorMsg = "No way!";
      break;
    }

    if (closestNode === finishNode) {
      break;
    }

    if (closestNode) {
      closestNode.isVisited = true; //Once you visit node, change it's status
      visitedNodesInOrder.push(closestNode);

      updateUnvisitedNeighbors(grid, closestNode);
    }
  }
  const shortestPath = getNodesInShortestPath(finishNode);
  return { shortestPath, errorMsg, visitedNodesInOrder };
};

const updateUnvisitedNeighbors = (
  grid: Array<Array<NodeType>>,
  closestNode: NodeType
) => {
  const neighbors = getAllNeighbors(grid, closestNode);

  for (const neighbor of neighbors) {
    neighbor.distance = closestNode.distance + 1;
    neighbor.previousNode = closestNode; //Once you visit a node, save it's previous node for figuring out shortest path
  }
};

const getAllNeighbors = (grid: Array<Array<NodeType>>, node: NodeType) => {
  const neighbors = [];
  const { row, col } = node;

  /* Check if elements are not on the edges and get their neighbors */
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row > 0) neighbors.push(grid[row][col - 1]);

  return neighbors.filter((neighbor) => {
    //Check if the element was not already visited and retrieve only unvisited
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

const getNodesInShortestPath = (finishNode: NodeType | null) => {
  const nodesInShortestPath = [];

  let currentNode = finishNode;

  while (currentNode !== null) {
    nodesInShortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPath;
};
