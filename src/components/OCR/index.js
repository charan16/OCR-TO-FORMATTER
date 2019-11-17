import Tesseract from "tesseract.js";
import React, { Component } from "react";
import {
  rawTextCard,
  line_break_up,
  paragraphFormatter,
  rawHtmlCard
} from "./Cards";
import "./style.scss";

class OCR extends Component {
  state = {
    uploads: [],
    recognizedText: "",
    lines: [],
    rawText: "",
    paragraphs: [],
    html: ""
  };

  handleChange = event => {
    if (event.target.files[0]) {
      var uploads = [];
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key];
        uploads.push(URL.createObjectURL(upload));
      }
      this.setState({
        uploads: uploads
      });
    } else {
      this.setState({
        uploads: []
      });
    }
  };

  handleRecongnize = () => {
    Tesseract.recognize(this.state.uploads[0], {
      lang: "eng"
    }).then(data => {
      console.log(data);
      this.setState({ recognizedText: data });
      this.formatText("rawText");
      this.formatText("lines");
      this.formatText("paragraphs");
      this.formatText("html");
    });
  };

  formatText = case1 => {
    switch (case1) {
      case "lines":
        const k1 = line_break_up(this.state.recognizedText.lines);
        this.setState({ lines: k1 });
        break;
      case "rawText":
        const k = rawTextCard(
          this.state.recognizedText.text.replace(":>", "=>")
        );
        this.setState({ rawText: k });
        break;
      case "paragraphs":
        const k2 = paragraphFormatter(this.state.recognizedText.paragraphs);
        this.setState({ paragraphs: k2 });
        break;
      case "html":
        const k3 = rawHtmlCard(this.state.recognizedText.html);
        this.setState({ html: k3 });
      default:
        break;
    }
    return 0;
  };

  render() {
    return (
      <div>
        <div className="font">
          <p>
            {
              "This is a website that allows you to convert your image into text using Optical Character Recognition(OCR).It uses"
            }<br/>
            <a href="https://tesseract.projectnaptha.com/">tesseract.js</a>
            {" It gives multiple breakdowns of text like Raw Text, Line Breaks and Paragraphs and at each you can copy text to clipboard."}
          </p>
        </div>
        <div className="hero">
          {this.state.uploads.length <= 0 ? (
            <label className="fileUploaderContainer">
              Upload an Image
              <input
                type="file"
                id="fileUploader"
                onChange={this.handleChange}
                multiple
              />
            </label>
          ) : (
            <div>
              {this.state.uploads.map((value, index) => {
                return (
                  <img key={index} src={value} width="250px" height="250px" />
                );
              })}
            </div>
          )}
          <button className="button" onClick={this.handleRecongnize}>
            Generate
          </button>
          <div className="text cards-container flex-equal flex-row">
            <div className="flex-equal ">{this.state.rawText}</div>
            <div className="flex-equal">{this.state.lines}</div>
            <div className="flex-equal">{this.state.paragraphs}</div>
            {/* <div className="flex">
            {this.state.html}
          </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default OCR;
