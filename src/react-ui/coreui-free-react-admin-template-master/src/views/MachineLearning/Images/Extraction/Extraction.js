import React, { Component } from 'react'
import {Card, CardBody, CardHeader, Spinner, Table} from "reactstrap";
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


    const API = "http://127.0.0.1:5001/extraction";
    let formData = new FormData();
    try {

      const buffer = Buffer.from(file.split(',')[1], 'base64');
      const b64Str = buffer.toString('base64');
      this.props.fileIsPDF
        ? formData.append('type', 'pdf')
        : formData.append('type', 'img');
      formData.append('file', encodeURI(b64Str));
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
               bankDetails: response.data.result.bank_details,
               invoiceDetails: response.data.result.invoice_details,
               recipient: response.data.result.recipient,
               calculation: response.data.result.calculation,
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

    return (
      <div className='animated fadeIn'>
        {
          this.state.loading
            ? <Spinner color="primary" />
            :
            <div className='animated fadeIn'>
            <Card>
              <CardHeader> <h1>Extracted Information</h1> </CardHeader>
              <CardBody>
                {this.state.recipient ?
                  <Table responsive>
                    <thead>
                    <tr>
                      {Object.keys(this.state.recipient).map((key, index) => (
                        <th key={index}>{key}</th>
                      ))
                      }
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      {Object.values(this.state.recipient).map((value, index) => (
                        <td key={index}>{value}</td>
                      ))
                      }
                    </tr>
                    </tbody>
                  </Table>
                  : null
                }
                {this.state.bankDetails ?
                  <Table responsive>
                    <thead>
                    <tr>
                      {Object.keys(this.state.bankDetails).map((key, index) => (
                        <th key={index}>{key}</th>
                      ))
                      }
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      {Object.values(this.state.bankDetails).map((value, index) => (
                        <td key={index}>{value}</td>
                      ))
                      }
                    </tr>
                    </tbody>
                  </Table>
                  : null
                }
                {this.state.invoiceDetails ?
                  <Table responsive>
                    <thead>
                    <tr>
                      {Object.keys(this.state.invoiceDetails).map((key, index) => (
                        <th key={index}>{key}</th>
                      ))
                      }
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      {Object.values(this.state.invoiceDetails).map((value, index) => (
                        <td key={index}>{value}</td>
                      ))
                      }
                    </tr>
                    </tbody>
                  </Table>
                  : null
                }
                {
                  this.state.calculation ?
                    <h1>Balance Fee: {this.state.calculation}</h1>
                    :
                    null
                }
              </CardBody>
            </Card>
            </div>
          }
      </div>
    );
  }
}

export default Extraction
