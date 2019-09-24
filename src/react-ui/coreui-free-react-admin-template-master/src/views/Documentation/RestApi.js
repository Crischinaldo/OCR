import React, { Component } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Collapse,
  Button,
  Col, Table, Badge, Pagination, PaginationItem, PaginationLink
} from "reactstrap";

class RestApi extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: [false, false, false, false],
      query: '{period}'
    };
  }

  toggle(tab) {
    const prevState = this.state.collapse;
    const state = prevState.map((subState, index) => tab === index ? !subState : false);

    this.setState({ collapse: state });
  }

  render() {
    return (
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> REST-Services
              </CardHeader>
              <CardBody>
                <div id="accordion">
                          <ListGroup>
                            <ListGroupItem action color="success">
                              <Row>
                              <Col sm={0.5}>
                                <Button className="ServiceType" onClick={() => this.toggle(0)} id="PostButton">POST</Button>
                              </Col>
                              <Col sm={5}>
                              <div className='ServiceDescription'>/machine-learning/classification</div>
                              </Col>
                              </Row>
                               <Collapse isOpen={this.state.collapse[0]}>
                            <div className='ServiceDetails'>
                              <div className='ParameterTable'>
                                <div className="animated fadeIn">
                                  <Row>
                              <Col xs="12" lg="6">
                                    Payload Parameters
                                    <Table responsive>
                                      <thead>
                                      <tr>
                                        <th>Parameter</th>
                                        <th>Data Type</th>
                                        <th>Required</th>
                                        <th>Description</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                        <td>file</td>
                                        <td>string</td>
                                        <td>True</td>
                                        <td>Image as decoded hex String</td>
                                      </tr>
                                      </tbody>
                                    </Table>
                              </Col>
                                  </Row>
                                </div>
                              </div>
                              <div className='ResponseTable'>
                              <div className="animated fadeIn">
                                  <Row>
                              <Col xs="12" lg="6">
                                    Reponses for Requested Resource
                                    <Table responsive>
                                      <thead>
                                      <tr>
                                        <th>HTTP Status Code</th>
                                        <th>Reason</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                        <td>200</td>
                                        <td>ok</td>
                                      </tr>
                                      <tr>
                                        <td>400</td>
                                        <td>bad request</td>
                                      </tr>
                                      </tbody>
                                    </Table>
                              </Col>
                                  </Row>
                                </div>
                              </div>

                              <div className='ResponseExample'>
                                <div className='ResponseHeader'>Response (Status 200)</div>
                                &nbsp;&#123;<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "CLR00342"<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"class": "rechnungsbeleg"
                                <br/>&nbsp;&#125;
                              </div>

                              </div>
                        </Collapse>
                            </ListGroupItem>
                          </ListGroup>
                          <ListGroup>
                            <ListGroupItem action color="success">
                            <Row>
                              <Col sm={0.5}>
                                <Button className="ServiceType" onClick={() => this.toggle(1)} id="PostButton">POST</Button>
                              </Col>
                              <Col sm={5}>
                              <div className='ServiceDescription'>/machine-learning/extraction</div>
                              </Col>
                              </Row>
                               <Collapse isOpen={this.state.collapse[1]}>
                             <div className='ServiceDetails'>
                              <div className='ParameterTable'>
                                <div className="animated fadeIn">
                                  <Row>
                              <Col xs="12" lg="6">
                                <div>Payload Parameters</div>
                                    <Table responsive>
                                      <thead>
                                      <tr>
                                        <th>Parameter</th>
                                        <th>Data Type</th>
                                        <th>Required</th>
                                        <th>Description</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                        <td>file</td>
                                        <td>string</td>
                                        <td>True</td>
                                        <td>Image as decoded hex String</td>
                                      </tr>
                                      </tbody>
                                    </Table>
                              </Col>
                                  </Row>
                                </div>
                              </div>
                              <div className='ResponseTable'>
                              <div className="animated fadeIn">
                                  <Row>
                              <Col xs="12" lg="6">
                                    Reponses for Requested Resource
                                    <Table responsive>
                                      <thead>
                                      <tr>
                                        <th>HTTP Status Code</th>
                                        <th>Reason</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                        <td>200</td>
                                        <td>ok</td>
                                      </tr>
                                      <tr>
                                        <td>400</td>
                                        <td>Bad Request</td>
                                      </tr>
                                      </tbody>
                                    </Table>
                              </Col>
                                  </Row>
                                </div>
                              </div>

                              <div className='ResponseExample'>
                                <div className='ResponseHeader'>Response (Status 200)</div>
                                &nbsp;&#123;<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "CLR00342"<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"class": "rechnungsbeleg"
                                <br/>&nbsp;&#125;
                              </div>

                              </div>
                        </Collapse>
                              </ListGroupItem>
                          </ListGroup>
                      <ListGroup>
                        <ListGroupItem action color="info">
                       <Row>
                              <Col sm={0.5}>
                                <Button className="ServiceType" id="GetButton" onClick={() => this.toggle(2)}>GET</Button>
                              </Col>
                              <Col sm={5}>
                              <div className='ServiceDescription'>/evaluation</div>
                              </Col>
                              </Row>
                          <Collapse isOpen={this.state.collapse[2]}>
                             <div className='ServiceDetails'>
                              <div className='ParameterTable'>
                                <div className="animated fadeIn">
                                  <Row>
                              <Col xs="12" lg="6">
                                    Payload Parameters
                                    <Table responsive>
                                      <thead>
                                      <tr>
                                        <th>Parameter</th>
                                        <th>Data Type</th>
                                        <th>Required</th>
                                        <th>Description</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                        <td>file</td>
                                        <td>string</td>
                                        <td>True</td>
                                        <td>Image as decoded hex String</td>
                                      </tr>
                                      </tbody>
                                    </Table>
                              </Col>
                                  </Row>
                                </div>
                              </div>
                              <div className='ResponseTable'>
                              <div className="animated fadeIn">
                                  <Row>
                              <Col xs="12" lg="6">
                                    Reponses for Requested Resource
                                    <Table responsive>
                                      <thead>
                                      <tr>
                                        <th>HTTP Status Code</th>
                                        <th>Reason</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                        <td>200</td>
                                        <td>ok</td>
                                      </tr>
                                      <tr>
                                        <td>400</td>
                                        <td>bad request</td>
                                      </tr>
                                      </tbody>
                                    </Table>
                              </Col>
                                  </Row>
                                </div>
                              </div>
                              <div className='ResponseExample'>
                                <div className='ResponseHeader'>Response (Status 200)</div>
                                &nbsp;&#123;<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"class_id": "CLR00342"<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"class": "rechnungsbeleg"
                                <br/>&nbsp;&#125;
                              </div>

                              </div>
                        </Collapse>
                        </ListGroupItem>
                        <ListGroupItem action color="info">
                       <Row>
                              <Col sm={0.5}>
                                <Button className="ServiceType" id="GetButton" onClick={() => this.toggle(3)}>GET</Button>
                              </Col>
                              <Col sm={5}>
                              <div className='ServiceDescription'>/evaluation/]{this.state.query}</div>
                              </Col>
                              </Row>
                          <Collapse isOpen={this.state.collapse[3]}>
                             <div className='ServiceDetails'>
                              <div className='ParameterTable'>
                                <div className="animated fadeIn">
                                  <Row>
                              <Col xs="12" lg="6">
                                    Payload Parameters
                                    <Table responsive>
                                      <thead>
                                      <tr>
                                        <th>Parameter</th>
                                        <th>Data Type</th>
                                        <th>Required</th>
                                        <th>Description</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                        <td>file</td>
                                        <td>string</td>
                                        <td>True</td>
                                        <td>Image as decoded hex String</td>
                                      </tr>
                                      </tbody>
                                    </Table>
                              </Col>
                                  </Row>
                                </div>
                              </div>
                              <div className='ResponseTable'>
                              <div className="animated fadeIn">
                                  <Row>
                              <Col xs="12" lg="6">
                                    Reponses for Requested Resource
                                    <Table responsive>
                                      <thead>
                                      <tr>
                                        <th>HTTP Status Code</th>
                                        <th>Reason</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                        <td>200</td>
                                        <td>ok</td>
                                      </tr>
                                      <tr>
                                        <td>400</td>
                                        <td>bad request</td>
                                      </tr>
                                      </tbody>
                                    </Table>
                              </Col>
                                  </Row>
                                </div>
                              </div>
                              <div className='ResponseExample'>
                                <div className='ResponseHeader'>Response (Status 200)</div>
                                &nbsp;&#123;<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "CLR00342"<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"class": "rechnungsbeleg"
                                <br/>&nbsp;&#125;
                              </div>

                              </div>
                        </Collapse>
                        </ListGroupItem>
                      </ListGroup>
                </div>
              </CardBody>
            </Card>
    );
  }
}


export default RestApi
