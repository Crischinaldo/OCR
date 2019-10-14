import React, { Component, } from 'react';
import { Bar, Doughnut, HorizontalBar} from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardHeader,
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
            correlation: response.data.result.coefs,
            errorMean: response.data.result.err_mean_amount,
            errorMeanPercentage: response.data.result.err_mean_perc,
            errors: response.data.result.sum_errors,
            errorsPercentage: response.data.result.error_percentages,
            avgSavedTime: response.data.result.saved_time_amount,
            avgSavedTimePercentage: response.data.result.saved_time_perc,
            loading: false
          });
        }
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
        console.log('error');

      });
  };

  render() {

    const DoughnutData = (labels, data, ) => {
      const datasets = [{
        data: data,
        borderWidth: 1,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: [
          '#A232A4',
          '#1239A1',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
        ]
      }];
      return {
        labels: labels,
        datasets: datasets,
      }
    };

      const LineData = (labels, data, label) => {
      const datasets = [{
        label: label,
        data: data,
        borderColor: "#98B9AB",
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
        ],
        backgroundColor: [

          '#36A2EB',
          '#86A2AE',
        ],
      }];
      return {
	      labels:labels,
        datasets:datasets,
      }
  };
       const options = {
         legend: {
         display: false
       },
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            max: 100,
            min: 0,
            stepSize: 10
          }
        }]
      }
    };

       const ErrorData = (labels, data, label) => {
          const datasets = [{
            label: label,
            data: data,
            borderColor: "#98B9AB",
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#AA6384',
              '#B3C2EB',
              '#C53384',
              '#D912EB',
              '#E18384',
              '#F5510B',
              '#C0000B',
            ],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#AA6384',
              '#B3C2EB',
              '#C53384',
              '#D912EB',
              '#E18384',
              '#F5510B',
              '#C0000B',
            ],
          }];
      return {
	      labels:labels,
        datasets:datasets,
      }
  };
       const ErrorOptions = {
         legend: {
         display: false
       },
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            max: 30,
            min: 0,
            stepSize: 5
          }
        }]
      }
    };

      const avg = (x) => {
        const sum = x.reduce(function(a, b) { return a + b; });
        return  sum / x.length;
        };

    return (

      <div className="animated fadeIn">
        {
          this.state.loading
          ? <Spinner color="primary" />
          : this.state.predictions
          ?
            <div className="animated fadeIn">

          <Row>
            <Col>
              <div className="animated fadeIn">
          <Card>
            <CardHeader>Total amount of Classifications: <h2 id='highlight'>{this.state.amount}</h2></CardHeader>
            <CardBody>
              <Doughnut
                data={DoughnutData(Object.keys(this.state.predictions),
                  Object.values(this.state.predictions))}
              />
            </CardBody>
          </Card>
              </div>
            </Col>
            <Col>
              <div className="animated fadeIn">
                <Card>
            <CardHeader>Accuracy contribution
              Overall Average Accuracy: <h1 id='highlight'>{
                avg(Object.values(this.state.accuracies))
                .toFixed(2)}%</h1>
            </CardHeader>
            <CardBody>
              <Bar
                data={LineData(Object.keys(this.state.accuracies),
                  Object.values(this.state.accuracies),
                  'Accuracities'
                )}
                options={options}
              />
            </CardBody>
          </Card>
              </div>

            </Col>
          </Row>
              <Row>
            <Col>
              <div className="animated fadeIn">
                <Card>
                  <CardHeader><h2>Time Measures</h2></CardHeader>
            <CardBody>
                total amount of spared time in seconds: <h3 id='highlight'>{this.state.avgSavedTime}</h3>
                which results in an average of <h3 id='highlight'>{this.state.avgSavedTimePercentage}%</h3>
              <HorizontalBar
                 data={LineData( ['manual', 'automatic'],
                  [this.state.avgSavedTime,
                    86,
                  ], 'time spent')}
                 options={options}
              />
            </CardBody>
          </Card>
              </div>
            </Col>
               <Col>
              <div className="animated fadeIn">
                <Card>
                  <CardHeader><h2>Error Measures</h2></CardHeader>
            <CardBody>
                total amount of errors made: <h3 id='highlight-error'>{Object.values(this.state.errors).reduce((x, y) => x + y)}</h3>
                which results in an average of <h3 id='highlight-error'>{this.state.errorMeanPercentage}%</h3>
              <Bar
                data={ErrorData(Object.keys(this.state.errorsPercentage),
                  Object.values(this.state.errorsPercentage),
                  'Errors'
                )}
                options={ErrorOptions}
              />
            </CardBody>
            </Card>
                </div>
              </Col>
               </Row>

            </div>
          : <h1>no data!</h1>
        }
      </div>
    );
  }
}

export default Dashboard;
