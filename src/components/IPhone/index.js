import React from "react";

import styles from "./index.module.css";

const IPhone = props => {
  const { mode = "default", children, ...rest } = props;
  return (
    <div className={[styles[mode], styles.iphone].join(" ")} {...rest}>
      <img
        className={styles.img}
        src="./assets/images/iphone-x-noshadow.png"
        alt="iphone"
      />
      {children}
    </div>
  );
};

export default IPhone;
