// https://www.npmjs.com/package/react-responsive-carousel
import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const defaultStyle = {
  background: {
    position: "absolute",
    zIndex: -999,
    width: "inherit",
    height: "inherit",
    objectFit: "cover"
  },
  default: {
    //height: "100%",
    width: "100%",
    //borderRadius: 999,
    objectFit: "cover"
  }
};

const defaultImages = [
  {
    url: "./assets/images/dummy1.jpg",
    alt: "dummy1"
  },
  {
    url: "./assets/images/dummy2.jpg",
    alt: "dummy2"
  },
  {
    url: "./assets/images/dummy3.jpg",
    alt: "dummy3"
  }
];

export default class CarouselBlock extends Component {
  state = {
    carouselOutput: ""
  };
  heights = [];
  widths = [];
  onImgLoad = this.onImgLoad.bind(this);

  componentDidMount() {
    const { raw_list, img_list, style, mode, ...children } = this.props;
    let output_divs;

    const images = img_list ? img_list : defaultImages;
    // ensure correct format
    try {
      const t = images[0].url;
      console.log("image url: " + t);
    } catch (e) {
      console.log("Carousel Image List ERROR: " + e);
    }

    const styleOut = style => {
      const defaultStyle = {
        div: { width: "400px" },
        img: { width: "400px" }
      };

      if (style) {
        return style;
      } else if (!style && mode) {
        if (mode === "iphoneX") {
          return {
            div: {
              height: "812px",
              width: "380px" // added 5px for padding
            },
            img: {
              height: "812px",
              width: "380px" // added 5px for padding
            }
          };
        } else {
          return defaultStyle;
        }
      } else {
        return defaultStyle;
      }
    };

    if (images) {
      output_divs = images.map((v, i) => {
        return (
          <div key={i} style={styleOut(style).div}>
            <img
              onLoad={this.onImgLoad}
              style={{ ...defaultStyle.default, ...styleOut(style).img }}
              src={v.url}
              alt={v.alt}
            />
          </div>
        );
      });
    }

    // settings
    // https://github.com/leandrowd/react-responsive-carousel
    this.setState({
      carouselOutput: (
        <Carousel
          autoPlay
          dynamicHeight
          showStatus={false}
          showIndicators={false}
          infiniteLoop={true}
          width={styleOut(style).div.width}
          {...children}
        >
          {output_divs}
        </Carousel>
      )
    });
  }

  onImgLoad({ target: img }) {
    let ht = this.heights;
    let wd = this.widths;

    this.setState({
      heights: ht.push(img.offsetHeight),
      widths: wd.push(img.offsetWidth)
    });
  }

  render() {
    const { heights } = this;
    const { style } = this.props;

    const rootStyle = style
      ? style.root
      : {
          position: "absolute",
          height: "inherit",
          width: "100%",

          top: 35,
          // left: "52vw",
          // marginLeft: -200,

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          zIndex: -1
        };

    let carouselHeight = Math.min(...heights);
    carouselHeight = carouselHeight === Infinity ? 0 : carouselHeight;

    return (
      <div style={rootStyle}>
        <div
          style={{
            height: carouselHeight,
            overflowY: "scroll",
            overflowX: "hidden"
          }}
        >
          {this.state.carouselOutput}
        </div>
      </div>
    );
  }
}
