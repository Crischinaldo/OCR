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


    const API = "http://127.0.0.1:8090/extraction";
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
               iban: response.data.result.iban,
               bic: response.data.result.bic,
               balance_due: response.data.result.balance_due,
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
              <CardHeader> <h1>Extracted Information</h1> </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    {this.state.amount
                      ? <th>balance due</th>
                      : null
                    }
                    {this.state.iban
                      ? <th>iban</th>
                      : null
                    }
                    {this.state.bic
                      ? <th>bic</th>
                      : null
                    }
                  </tr>
                  </thead>
                  <tbody>

                  <tr>
                      <td>{this.state.amount}</td>
                      <td>{this.state.iban}</td>
                      <td>{this.state.bic}</td>
                  </tr>

                  </tbody>
                </Table>
              </CardBody>
            </Card>
            </div>
          }
      </div>
    );
  }
}

export default Extraction
