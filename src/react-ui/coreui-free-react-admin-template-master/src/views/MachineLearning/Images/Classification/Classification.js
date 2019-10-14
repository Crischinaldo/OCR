// @author: ct

// imports
import React, { Component } from 'react'
import {Media, Card, CardBody, CardHeader, Spinner} from "reactstrap";
import doc_analysis from '../../../../assets/img/icons/doc_analysis.png'
import Upload from '../../../Document/Images/Upload.js'
import Dropzone from 'react-dropzone'
import axios from "axios";
import Prediction from './Prediction'

// Renders elements for classifying an image. Uploading an image creates
// a component instance of the child component "./Prediction". "./Prediction"
// in turn, renders its child-component "./Extraction".
class Classification extends Component {
  constructor(props) {
    super(props);

    // Init state with mostly prediction based variables for pass as properties to "./Prediction"
    this.state = {
      accuracy: null,
      fileName: null,
      predictedClass: null,
      loading: false,
      UploadedFile: null,
      fileIsPDF: false,
    };
    this.onDrop = this.onDrop.bind(this);
    this.getResult = this.getResult.bind(this);
  }

   onDrop  = async (files) => {
    console.log(files[0]);
    const API = "http://127.0.0.1:5001/classification";
    let formData = new FormData();
    try {
        for (const file of files) {
          const fileContent = await Upload.readFile(file);
          if (fileContent.split(',')[0].includes("application/pdf")) {
            this.setState({
              fileIsPDF: true,
            })
          }
          this.setState({
            UploadedFile: fileContent,
          });

          const buffer = Buffer.from(fileContent.split(',')[1], 'base64');
          const b64Str = buffer.toString('base64');

          formData.append('file', encodeURI(b64Str));
          formData.append('name', file.name);
          this.state.fileIsPDF
            ? formData.append('type', 'pdf')
            : formData.append('type', 'img');
        }
    } catch (e) {
      console.log(e);

    }
    /*
    Begin by setting loading = true, and use the callback function
    of setState() to make the ajax request. Set loading = false after
    the request completes.
    */
    this.setState({ loading: true }, () => {
      this.getResult(API, formData)
    });
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
            predictedClass: response.data.result.pred_class,
            accuracy: response.data.result.accuracy,
            fileName: response.data.result.name,
            loading: false
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
    const maxSize = 10485000;
    const { accuracy, fileName, predictedClass, loading, UploadedFile, fileIsPDF} = this.state;
    return (
      <div className="animated fadeIn">
        <Card body outline color="primary">
            <CardHeader tag="h3">Predict class of an Image</CardHeader>
          <CardBody>
            <Media>
                <Dropzone
              onDrop={this.onDrop}
              accept="image/png, image/jpg, image/jpeg, application/pdf"
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
                Image upload
              </Media>
                Click on the Symbol or drag & drop a *.png, *.jpg or *.pdf file onto it to classify a file.
            </Media>
          </Media>
          </CardBody>
        </Card>
        {
          loading
          ? <Spinner color="primary" />
          : predictedClass
            ? <Prediction
              predictedClass={predictedClass}
              accuracy={accuracy}
              fileName={fileName}
              UploadedFile={UploadedFile}
              fileIsPDF={fileIsPDF}
            />
            : <div/>
        }
      </div>
    );

  }
}

export default Classification
