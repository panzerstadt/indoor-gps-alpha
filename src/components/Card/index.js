import React, { useContext, useState } from "react";
import styles from "./index.module.css";
import { MainContext } from "../../App";

const Card = props => {
  // it is a JS object
  let appState = useContext(MainContext);
  let [description, setDescription] = useState("");

  let { setPoint } = appState;

  // change the state here
  const handleButtonClick = v => {
    const data = appState.dataset.data.filter(lbl => {
      return lbl.label === v;
    })[0];
    console.log(data);
    setDescription(data.text);
    setPoint([data.latlng.lat, data.latlng.lng]);
  };

  const cardData = appState.dataset.data;
  const Cards = cardData.map((v, i) => {
    const s = {
      height: 30,
      backgroundColor: "white",
      border: "1px solid grey",
      margin: "2px 0"
    };

    return (
      <button key={i} style={s} onClick={() => handleButtonClick(v.label)}>
        {v.label}
      </button>
    );
  });

  const DescriptionCard = () => {
    const s = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      minHeight: 50
    };

    return <div style={s}>{description}</div>;
  };

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <DescriptionCard />
          {Cards}
        </div>
      </div>
    </div>
  );
};

export default Card;
