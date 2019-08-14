import React, { Component } from 'react'
import {Media, Card, CardBody, CardHeader} from "reactstrap";
import doc_analysis from '../../assets/img/icons/doc_analysis.png'

class Classify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classifyFile: false,
    }
  }



   render() {

    return (
        <Card>
            <CardHeader>
              <h3> Classify Invoice </h3>
            </CardHeader>
          <CardBody>
            <Media>
              <Media left href="#">
                <Media object src={doc_analysis} className="classify_img"  />
              </Media>
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
