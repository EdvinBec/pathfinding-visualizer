import React, { useState } from "react";
import welcomeImage from "../assets/img/welcomeImage.png";
import startAnimation from "../assets/img/startAnimation.gif";
import finishAnimation from "../assets/img/finishAnimation.gif";
import wallsAnimation from "../assets/img/wallsAnimation.gif";
import visualizeAnimation from "../assets/img/visualizeAnimation.gif";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { saveGrid } from "../redux/gridSlice";

type Props = {};

const Introduction = (props: Props) => {
  const dispatch = useDispatch();

  const [slideNumber, setSlideNumber] = useState(1);

  if (slideNumber === 1) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="headline">
            <span
              className="close"
              onClick={() =>
                dispatch(saveGrid({ hasSeenIntro: { state: true } }))
              }
            >
              &times;
            </span>
            <div className="headlineWrapper">
              <h3>Introduction</h3>
            </div>
          </div>
          <div className="mainContent">
            <Image
              className="welcomeImage"
              src={welcomeImage}
              alt="welcomeImage"
            ></Image>
            <h2>Welcome!</h2>
            <p>
              Take a 1-minute spin through the app. See how our pathfinding
              visualizer works.
            </p>
          </div>
          <div className="modalFooter">
            <span>{slideNumber} of 5</span>
            <button className="nextButton" onClick={() => setSlideNumber(2)}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  } else if (slideNumber === 2) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="headline">
            <span
              className="close"
              onClick={() =>
                dispatch(saveGrid({ hasSeenIntro: { state: true } }))
              }
            >
              &times;
            </span>
            <div className="headlineWrapper">
              <h3>Introduction</h3>
            </div>
          </div>
          <div className="mainContent">
            <Image
              className="welcomeImage animation"
              src={startAnimation}
              alt="welcomeImage"
            ></Image>
            <h2>Choose starting position</h2>
            <p>
              Click on the start button to be able to change starting node
              position.
            </p>
          </div>
          <div className="modalFooter">
            <span>{slideNumber} of 5</span>
            <button className="nextButton" onClick={() => setSlideNumber(3)}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  } else if (slideNumber === 3) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="headline">
            <span
              className="close"
              onClick={() =>
                dispatch(saveGrid({ hasSeenIntro: { state: true } }))
              }
            >
              &times;
            </span>
            <div className="headlineWrapper">
              <h3>Introduction</h3>
            </div>
          </div>
          <div className="mainContent">
            <Image
              className="welcomeImage animation"
              src={finishAnimation}
              alt="welcomeImage"
            ></Image>
            <h2>Choose finish position</h2>
            <p>
              Click on the finish button to be able to change finish node
              position.
            </p>
          </div>
          <div className="modalFooter">
            <span>{slideNumber} of 5</span>
            <button className="nextButton" onClick={() => setSlideNumber(4)}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  } else if (slideNumber === 4) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="headline">
            <span
              className="close"
              onClick={() =>
                dispatch(saveGrid({ hasSeenIntro: { state: true } }))
              }
            >
              &times;
            </span>
            <div className="headlineWrapper">
              <h3>Introduction</h3>
            </div>
          </div>
          <div className="mainContent">
            <Image
              className="welcomeImage animation"
              src={wallsAnimation}
              alt="welcomeImage"
            ></Image>
            <h2>Place walls</h2>
            <p>
              Click on the Wall button, and hold down the mouse button to be
              able to place walls between nodes and create barriers.
            </p>
          </div>
          <div className="modalFooter">
            <span>{slideNumber} of 5</span>
            <button className="nextButton" onClick={() => setSlideNumber(5)}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  } else if (slideNumber === 5) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="headline">
            <span
              className="close"
              onClick={() =>
                dispatch(saveGrid({ hasSeenIntro: { state: true } }))
              }
            >
              &times;
            </span>
            <div className="headlineWrapper">
              <h3>Introduction</h3>
            </div>
          </div>
          <div className="mainContent">
            <Image
              className="welcomeImage animation"
              src={visualizeAnimation}
              alt="welcomeImage"
            ></Image>
            <h2>Visualize</h2>
            <p>
              Click on the Visualize button and let the app do the magic of
              pathfinding.
            </p>
          </div>
          <div className="modalFooter">
            <span>{slideNumber} of 5</span>
            <button
              className="nextButton"
              onClick={() =>
                dispatch(saveGrid({ hasSeenIntro: { state: true } }))
              }
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Introduction;
