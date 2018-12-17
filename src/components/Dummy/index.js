import React from "react";
import Carousel from "../Carousel";

const Dummy = () => {
  const images = [
    {
      url: "./assets/images/dummy5.jpg",
      alt: "dummy1"
    },
    {
      url: "./assets/images/dummy6.jpg",
      alt: "dummy2"
    },
    {
      url: "./assets/images/dummy3.jpg",
      alt: "dummy3"
    }
  ];

  return <Carousel img_list={images} mode="iphoneX" />;
};

export default Dummy;
