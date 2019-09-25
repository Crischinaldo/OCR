import React, { Component } from 'react'
import {Media, Card, CardBody, CardHeader, Spinner} from "reactstrap";
import doc_analysis from '../../assets/img/icons/doc_analysis.png'
import Upload from '../Document/Images/Upload.js'
import axios from "axios";

class Extraction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extractedText: null,
      loading: false,
      file: null,
    };
    this.extractedText = this.extractedText.bind(this);
  }
  componentDidMount() {
      this.extractedText(this.props.UploadedFile)
  }

  extractedText = (file) => {

    const API = "http://127.0.0.1:8090/machine-learning/extraction";
    let formData = new FormData();
    try {

      const buffer = Buffer.from(file.split(',')[1], 'base64');
      const hexStr = buffer.toString('hex');
      this.props.fileIsPDF
        ? formData.append('type', 'pdf')
        : formData.append('type', 'img');
      formData.append('file', encodeURI(hexStr));
      formData.append('name', file.name);
    } catch (e) {
      console.log(e);
    }
     this.setState({ loading: true }, () => {
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
               extractedText: response.data.result,
               loading: false,
             });
           }
           console.log(response);
         })
         .catch(function (response) {
           //handle error
           console.log(response);
           console.log('error');
         });
     })
  };

   render() {

     const { extractedText, loading } = this.state;
    return (
      <div className='animated fadeIn'>
        {
          loading
            ? <Spinner color="primary" />
            :
            <div className='animated fadeIn'>
            <Card>
            <CardHeader> Extracted Text from Uploaded file </CardHeader>
              <CardBody>{this.state.extractedText}</CardBody>
            </Card>
            </div>
          }
      </div>
    );
  }
}

export default Extraction
