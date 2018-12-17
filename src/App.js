import React, { useState, useContext } from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";

import Classifier from "./components/Classifier";

// import map
// ref: https://leafletjs.com/examples/crs-simple/crs-simple.html
import LeafletMap from "./components/LeafletMap";
// carousel
import Dummy from "./components/Dummy";
// import iphone
import IPhone from "./components/IPhone";
// import infocard
import Card from "./components/Card";

// import camera + button

// import data
import tempDataset from "./dataset/test.json";

// main state
export const MainContext = React.createContext();

const ReactHeader = () => (
  <header className={styles.AppHeader}>
    <img src={logo} className={styles.AppLogo} alt="logo" />
  </header>
);

const App = props => {
  // customer journey
  // 1. customer detects image (eq: clicks on button)
  // 2. main location returned, with nearby locations, and description

  let [point, setPoint] = useState([55, 250]);
  const label = "a dinosaur! RAWR";

  const pt = {};

  const appState = {
    point: point,
    setPoint: setPoint,
    label: label,
    dataset: tempDataset
  };

  return (
    <div className={styles.viewRoot}>
      <div className={styles.iphoneX}>
        <MainContext.Provider value={appState}>
          <LeafletMap height={"100%"} />
          <Card />
        </MainContext.Provider>
      </div>
    </div>
  );
};

// this view is the main and only view.
// uses CSS MODULES
// uses Context API
// uses React Hooks

// const IPhoneContainer = () => {
//   let output = <App />;

//   const screenOutput = output ? output : <Dummy />;

//   return (
//     <div className={styles.App}>
//       <ReactHeader />
//       <IPhone mode="real" />
//       {screenOutput}
//     </div>
//   );
// };

// export default IPhoneContainer;

const ClassifierTest = () => {
  return <Classifier showInput />;
};

export default ClassifierTest;
