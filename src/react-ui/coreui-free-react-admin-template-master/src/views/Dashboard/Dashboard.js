import React, { Component, lazy, Suspense } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
} from 'reactstrap';
import axios from "axios";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.getResult = this.getResult.bind(this);
    this.state = {
      loading: false,
      accuracies: null,
      amount: null,
      predictions: null,
    };
  }

  componentDidMount() {
    const API = 'http://localhost:8090/classification';
    this.getResult(API)
  }

  getResult = (API) => {
    this.setState({
      loading: true,
    });
    axios({
      method: 'get',
      url: API,
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
            accuracies: response.data.result.accuracies,
            amount: response.data.result.amount,
            predictions: response.data.result.predictions,
            loading: false
          });
        }
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        console.log('error');
      });
  };

  render() {
    const data = (labels, data) => {
      const datasets = [{
        data: data,
        backgroundColor: [
          '#FF2334',
          '#36A2EB',
          '#FFCE56',
          '#3ACE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#1BCE56'
        ]
      }];
      return {
	      labels:labels,
        datasets:datasets,
      }
};

    return (
      <div className="animated fadeIn">
        {
          this.state.loading
          ? <Spinner color="primary" />
          : this.state.predictions
          ?

          <Row>
            <Col>
              <div className="animated fadeIn">
          <Card>
            <CardHeader>Total amount of Classifications: <h2>{this.state.amount}</h2></CardHeader>
            <CardBody>
              <Doughnut
                data={data(Object.keys(this.state.predictions),
                  Object.values(this.state.predictions))} />
            </CardBody>
          </Card>
              </div>
            </Col>
            <Col>
              <div className="animated fadeIn">
                <Card>
            <CardHeader>Accuracy contribution</CardHeader>
            <CardBody>
              <Bar
                data={data(Object.keys(this.state.accuracies),
                  Object.values(this.state.accuracies))} />
            </CardBody>
          </Card>
              </div>

            </Col>
          </Row>
          : null
        }
      </div>
    );
  }
}

export default Dashboard;
