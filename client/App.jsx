import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

const axios = require('axios').default;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.getData = this.getData.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get('/api')
      .then((response) => {
        // console.log('Response in client', response.data);
        this.setState({
          data: {
            labels: Object.keys(response.data.bpi),
            prices: Object.values(response.data.bpi),
          },
        });
        this.renderChart();
      })
      .catch((error) => {
      // handle error
        console.log(error);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  renderChart() {
    const { prices, labels } = this.state.data;
    // console.log('Prices', prices, 'Labels: ', labels);
    const ctx = document.getElementById('myChart').getContext('2d');
    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Daily BTC Closing Price',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          fill: 1,
          radius: 1,
          lineTension: 0,
          data: prices,
        }],
      },
    });
  }

  render() {
    return (
      <>
        <h1>Bitcoin Closing price for the last 30 days</h1>
        <canvas id="myChart" width="400" height="400" />
        <p>
          “Powered by
          <a href="https://www.coindesk.com/price/bitcoin"> CoinDesk"</a>
        </p>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
