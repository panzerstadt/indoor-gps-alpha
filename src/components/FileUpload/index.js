import React from "react";
import styles from "./index.module.css";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file

    // send file to parent
    if (this.props.handleFileUpload) {
      this.props.handleFileUpload(this.state.imagePreviewUrl);
    }
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = <img style={{ height: "100%" }} src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <div className={styles.previewText}>
          Please select an Image for Preview
        </div>
      );
    }

    return (
      <div className={styles.fileUpload}>
        <form onSubmit={e => this._handleSubmit(e)}>
          <input
            className={styles.fileInput}
            type="file"
            onChange={e => this._handleImageChange(e)}
          />
          <button
            className={styles.submitButton}
            type="submit"
            onClick={e => this._handleSubmit(e)}
          >
            Upload Image
          </button>
        </form>
        <div className={styles.imgPreview}>{$imagePreview}</div>
      </div>
    );
  }
}

export default ImageUpload;
