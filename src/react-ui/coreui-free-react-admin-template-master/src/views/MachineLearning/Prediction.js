import { Card, Button, CardBody, CardHeader, CardImg, Col, Row } from "reactstrap";
import React, { Component } from 'react'
import Extraction from './Extraction'
import { Document, Page , pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Prediction extends Component {
  constructor(props) {
    super(props);
    this.onClickExtract = this.onClickExtract.bind(this);
    this.onDocumentLoadSuccess =this.onDocumentLoadSuccess.bind(this);
    this.state = {
      extractText: false,
      loading: false,
      classifiedImg: null,
    }
  }


  onClickExtract() {
    this.setState({
      extractText: true,
    });
  };
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    return (
      <div className="animated fadeIn" id="class-result">
        <Card body outline color="primary">
          <CardHeader tag="h3">Classification Result</CardHeader>
          <CardBody>
            <Row>
              <Col sm="4">
                {this.props.fileIsPDF
                  ? <Document
                    file={this.props.UploadedFile}
                    onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
                    >
                    <Page pageNumber={1} />
                    </Document>
                  : <CardImg id="file-preview" src={this.props.UploadedFile}/>
                }
              </Col>
              <Col sm="6">
          <div className="lead">
            The image <h5>{this.props.fileName}</h5> name was assigned with a
            probability of <h5>{this.props.accuracy}%</h5> to the class
            <h5> {this.props.predictedClass}</h5></div>
              </Col>
            </Row>
          <hr className="my-2" />
          <p>Do you want to do a text extraction on the document?</p>

          <Button color="info" onClick={() => this.onClickExtract()}>Yes, Extract!</Button>
          </CardBody>
        </Card>
        {
          this.state.extractText
            ? <Extraction
              UploadedFile={this.props.UploadedFile}
              fileIsPDF={this.props.fileIsPDF}
            />
            : null
        }
      </div>
    );
  }
}


export default Prediction

