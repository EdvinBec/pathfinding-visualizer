import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import Introduction from "../components/Introduction";
import PathfindingVisualizer from "../components/PathfindingVisualizer";

export default function Home() {
  const hasSeenIntro = useSelector((state: any) => state.grid.hasSeenIntro);

  useEffect(() => {
    setHasSeenIntroduction(hasSeenIntro);
  }, [hasSeenIntro]);

  const [hasSeenIntroduction, setHasSeenIntroduction] =
    useState<boolean>(hasSeenIntro);

  return (
    <div className="container">
      <header>
        <title>Pathfinding Visualizer</title>
      </header>
      <PathfindingVisualizer />
      {!hasSeenIntroduction && <Introduction />}
      <footer>
        {" "}
        &copy; Copyright <Moment format="YYYY"></Moment> GitHub, Edvin Becic{" "}
      </footer>
    </div>
  );
}
