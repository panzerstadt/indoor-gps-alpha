import React, { useContext, useState, Component } from "react";
import styles from "./index.module.css";
import * as tf from "@tensorflow/tfjs";

import FileUpload from "../FileUpload";

export default class Classifier extends Component {
  state = {
    loaded: false,
    clear: false,
    img: null,
    preprocess_sequence: [],
    makePred: false,
    canvasContext: null,
    top5: []
  };
  loadModel = this.loadModel.bind(this);
  handleFileUpload = this.handleFileUpload.bind(this);

  async loadModel() {
    console.log("loading model async");
    try {
      // the model has to be placed in a public place
      this.model = await tf.loadModel("/model/model.json");
      this.classNames = await fetch("/model/class_names.txt")
        .then(r => r.text())
        .then(s => {
          const allLines = s.split(/\r\n|\n/);
          return allLines.filter(v => v.length > 1);
        });
    } catch (error) {
      console.log("error: ", error);
    }
  }

  getClassNames(indices) {
    var outp = [];
    for (var i = 0; i < indices.length; i++)
      outp[i] = this.classNames[indices[i]];
    return outp;
  }

  makePrediction(img) {
    let imgElement = new Image();
    imgElement.src = img;
    const imgData = imgElement;

    const preprocess = imgData => {
      return tf.tidy(() => {
        // convert img to tensor
        let tensor = tf.fromPixels(imgData); // second input is optional number of channels

        // resize to 28 x 28
        const resized = tf.image.resizeBilinear(tensor, [224, 224]).toFloat();

        // normalize
        const offset = tf.scalar(255.0);
        // sub == subtract
        const normalized = tf.scalar(1.0).sub(resized.div(offset));
        // we add a dimension to get a batch shape (??)
        const batched = normalized.expandDims(0);

        return batched;
      });
    };

    const pred = this.model.predict(preprocess(imgData)).dataSync();

    console.log(pred);

    let predictions = Object.values(pred).map((v, i) => {
      return { index: i, value: v };
    });

    predictions = predictions.sort((x, y) =>
      x.value > y.value ? 1 : x.value === y.value ? 0 : -1
    );
    predictions = predictions.reverse();

    console.log(predictions.slice(0, 10));

    let classes = predictions.map(v => v.index);
    classes = this.getClassNames(classes);

    console.log("top 5");
    console.log(classes);
    this.setState({ top5: classes.slice(0, 5), clear: false });
  }

  componentDidMount() {
    this.loadModel();
  }

  handleFileUpload(htmlImg) {
    this.setState({ img: htmlImg });
  }

  render() {
    const { showInput } = this.props;

    const inputForm = (
      <div>
        <p>1. upload image</p>
        <FileUpload handleFileUpload={this.handleFileUpload} />
      </div>
    );

    return (
      <div className={styles.classifierDiv}>
        {showInput ? inputForm : null}
        <p>2. predict</p>
        {this.state.img ? (
          <button onClick={() => this.makePrediction(this.state.img)}>
            predict image
          </button>
        ) : (
          <button>waiting for upload</button>
        )}
        <p>3. results</p>
        <ol>
          {this.state.top5.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ol>
        <p>todo:</p>
        <p>load image in react. currently image is as URI file</p>
        <p>
          references:
          <br />
          <a
            href="https://towardsdatascience.com/tensorflow-js-full-stack-starter-kit-2e6693192bcf"
            target="_blank"
          >
            link
          </a>
          <br />
          <a
            href="https://github.com/justinjrussell/tensorflowjs-react"
            target="_blank"
          >
            link 2
          </a>
          <br />
          <a
            href="https://aralroca.com/2018/08/24/first-steps-with-tensorflow-js/"
            target="_blank"
          >
            link 3
          </a>
        </p>
      </div>
    );
  }
}
