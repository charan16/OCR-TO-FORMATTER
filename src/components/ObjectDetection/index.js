import React, { Component } from "react";
import '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';





class ObjectDetection extends Component {

  constructor(props){
      super(props)
      this.state = {
        file: null
      }
      this.handleChange = this.handleChange.bind(this)
    }

componentDidMount() {
  this.myRef = React.createRef()
}

handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

  async getPredictions() {
    const image= document.getElementById('image')
    console.log(image)
    const model =  await cocoSsd.load();
    const predictions = await model.detect(image);
    console.log('Predictions: ');
    console.log(predictions);
    return '';
  }

  render() {
    const image=<input type="file" onChange={this.handleChange}/>
    return (
      <div>
        <span onClick={() => {this.getPredictions()}}>"Done Image Rendered"</span>
        {image}
        <img id="image" src={this.state.file}/>
      </div>
    )
  }
}

export default ObjectDetection;
