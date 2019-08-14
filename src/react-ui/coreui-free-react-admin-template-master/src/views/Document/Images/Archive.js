import React, { Component, useCallback} from 'react'
import {Card, CardBody, CardHeader} from "reactstrap";
import axios from 'axios';

class Archive extends Component {

  constructor(props) {
    super(props);
     this.state = {
       files: [],
    };
     this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    const API = "http://localhost:8090/files";
    let self = this;
    axios({
      method: 'get',
      url: API,
      config: { headers: {
        'Access-Control-Allow-Origin': '*',
        'accept': 'application/json' }}
      })
      .then(function (response) {
        const files = [];
        response.data.forEach( file  => {
          files.push(file);
        });
        self.setState({ files: files });
        console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
          console.log('error');
      });


    };

  render() {
    const imageList = this.state.files.map((item, i) => {
      return <li key={i}>{item.name}<br/><img src={`data:image/jpeg;base64,${item.base64_img}`}/></li>
    });
    return (
        <Card>
            <CardHeader>
              <h3> Uploads </h3>
            </CardHeader>
          <CardBody>
            <ul>
              {imageList}
            </ul>
          </CardBody>
        </Card>
    );
  }

}


export default Archive;
