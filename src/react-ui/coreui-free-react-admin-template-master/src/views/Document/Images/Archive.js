import React, { Component } from 'react'
import {Card, CardBody, CardHeader, Pagination} from "reactstrap";
import axios from 'axios';
import Preview from './Preview.js'
import ReactPaginate from 'react-paginate'
import PropTypes from 'prop-types';

class ImageList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  render() {
    return (
      <ul>
      <Preview/>
      </ul>
    );
  }
}

class Archive extends Component {

  constructor(props) {
    super(props);
     this.state = {
       files: [],
    };
     this.offset = 0;
     this.FileUpload = false;
     this.data = [];
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
      data: { limit: this.props.perPage, offset: this.state.offset },
      config: {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'accept': 'application/json'
        }
      }
    })
      .then(function (response) {
        self.setState({
          data: data.files,
          pageCount: Math.ceil(data.meta.total_count / data.meta.limit),
        });
       /* response.data.forEach(file => {
          file.hex_img = Buffer.from(file.hex_img, 'hex').toString('base64');
          files.push(file);
        }); */
        self.setState({files: files});
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        console.log('error');
      });
  };


  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset }, () => {
      this.loadCommentsFromServer();
    });
  };


  render() {

    return (
        <Card>
            <CardHeader>
              <h3> Uploads </h3>
            </CardHeader>
          <CardBody>

            <div className="imageBox">
              <ImageList
                data={this.state.data}
              />
            </div>
          </CardBody>
        </Card>
    );
  }
}

export default Archive;
