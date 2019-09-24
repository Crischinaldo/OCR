import React, { Component } from 'react'
import {Card, CardBody, CardHeader} from "reactstrap";
import Dropzone from 'react-dropzone'
import axios from 'axios';

class Upload extends Component {

  constructor(props) {
    super(props);
     this.state = {
      files: [],
       selectedFile: null,
       uploadedFileContents: null,
       waitingForFileUpload: false,
    };
     this.onDrop = this.onDrop.bind(this);
     this.postImage = this.postImage.bind(this)
  }

  static readFile = (inputFile) => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.readAsDataURL(inputFile);
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);

    };
  });
};

  onDrop  = async (files) => {
    const API = "http://localhost:8090/files";
    this.setState({
      files: this.state.files.concat(files),
      selectedFile: files[0]
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
          formData.append('hex_img', hexStr);
          formData.append('name', file.name);
        }
    } catch (e) {
      console.log(e);
      this.setState({
        waitingForFileUpload: false
      });
    }
    this.postImage(API, formData)
    };

  postImage = (API, formData) => {
    axios({
      method: 'post',
      url: API,
      data: formData,
      config: { headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data' }}
      })
      .then(function (response) {
          //handle success
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
              <h3> File Upload </h3>
            </CardHeader>
          <CardBody>
            <Dropzone
              onDrop={this.onDrop}
              accept="image/png, image/jpg, image/jpeg"
              minSize={0}
              maxSize={maxSize}
            >
              {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {!isDragActive && 'Click here or drop a file in .jpg or .png format to upload!'}
                  {isDragActive && !isDragReject && 'Drop file!'}
                  {isDragReject && "Incorrect file type!"}
                  </div>
              )}
            </Dropzone>
          </CardBody>
        </Card>
    );
  }

}


export default Upload;
