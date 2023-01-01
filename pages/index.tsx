import Moment from "react-moment";
import PathfindingVisualizer from "../components/PathfindingVisualizer";

export default function Home() {
  return (
    <div className="container">
      <header>
        <title>Pathfinding Visualizer</title>
      </header>
      <PathfindingVisualizer />
      <footer>
        {" "}
        &copy; Copyright <Moment format="YYYY"></Moment> GitHub, Edvin Becic{" "}
      </footer>
    </div>
  );
}
