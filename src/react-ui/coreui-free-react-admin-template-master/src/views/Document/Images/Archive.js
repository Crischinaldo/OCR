import React, { Component } from 'react'
import {Card, CardBody, CardHeader} from "reactstrap";
import axios from 'axios';
import Preview from './Preview.js'

class Archive extends Component {

  constructor(props) {
    super(props);
     this.state = {
       files: [],
    };
     this.componentDidMount = this.componentDidMount.bind(this);
     this.getImages = this.getImages.bind(this);
  }
  componentDidMount() {
    const API = "http://localhost:8090/files";
    this.getImages(API)
    };

  getImages = API  => {
    let self = this;
    axios({
      method: 'get',
      url: API,
      config: {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'accept': 'application/json'
        }
      }
    })
      .then(function (response) {
        const files = [];
        response.data.forEach(file => {
          file.hex_img = Buffer.from(file.hex_img, 'hex').toString('base64');
          files.push(file);
        });
        self.setState({files: files});
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        console.log('error');
      });
  };

  render() {
    return (
        <Card>
            <CardHeader>
              <h3> Uploads </h3>
            </CardHeader>
          <CardBody>
            <ul>
              <Preview
                files={this.state.files}

              />
            </ul>
          </CardBody>
        </Card>
    );
  }
}

export default Archive;
