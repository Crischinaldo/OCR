import React, { Component } from 'react'
import {Media, Card, CardBody, CardHeader} from "reactstrap";
import doc_analysis from '../../assets/img/icons/doc_analysis.png'
import Upload from '../Document/Images/Upload.js'
import Dropzone from 'react-dropzone'
import axios from "axios";

const Prediction = (props) => {
  console.log(props.predictedClass);
  return <h2> predicted class: { props.predictedClass == null ? 'not loaded' : props.predictedClass } </h2>
};

class Classify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classifyFile: false,
      predictedClass: null,
    };
    this.onDrop = this.onDrop.bind(this);
    this.getResult = this.getResult.bind(this);
  }

   onDrop  = async (files) => {
    this.setState({ classifyFile: true });
    const API = "http://127.0.0.1:5001/classify";
    this.setState({
      classifyFile: true,
    });

    let formData = new FormData();
    try {
        for (const file of files) {
          const fileContent = await Upload.readFile(file);
          this.setState({
            uploadedFileContents: fileContent,
            waitingForFileUpload: false
          });
          const buffer = Buffer.from(fileContent.split(',')[1], 'base64');
          const hexStr = buffer.toString('hex');
          formData.append('hex_img', encodeURI(hexStr));
          formData.append('name', file.name);
        }
    } catch (e) {
      console.log(e);
      this.setState({
        waitingForFileUpload: false
      });
    }
    this.getResult(API, formData)
    };

  getResult = (API, formData) => {
    axios({
      method: 'post',
      url: API,
      data: formData,
      config: {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data'
        }
      }
    })
      .then((response) => {
        if (response.data.result) {
          this.setState({
            predictedClass: response.data.result,
            classifyFile: true
          });
        }
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        console.log('error');
      });
  };

   render() {
    const maxSize = 1048576;

    return (
        <Card>
            <CardHeader>
              <h3>Classify</h3>
              {this.state.predictedClass}

            </CardHeader>
          <CardBody>
            <Media>

                <Dropzone
              onDrop={this.onDrop}
              accept="image/png, image/jpg, image/jpeg"
              minSize={0}
              maxSize={maxSize}
            >
              {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                    <Media object src={doc_analysis} className="classify_img"  />
                  </div>
              )}
            </Dropzone>


            <Media body>
              <Media heading>
                Classify Image
              </Media>
                Classify an Image
            </Media>
          </Media>
          </CardBody>
        </Card>

    );
  }
}

export default Classify
