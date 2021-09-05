import Chart from 'chart.js';
import Component from './component';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT  = 50;

const chart = (statisticCtx, { labels, data }) => new Chart(statisticCtx, {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: labels,
    datasets: [{
      data: data,
      backgroundColor: '#ffe800',
      hoverBackgroundColor: '#ffe800',
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 20,
        },
        color: '#ffffff',
        anchor: 'start',
        align: 'start',
        offset: 40,
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#ffffff',
          padding: 100,
          fontSize: 20,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: 24,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      }],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  },
});

export default class StatisticChartView extends Component {
  constructor(context, data) {
    super();

    this._data = data;
    this._context = context;
  }

  getTemplate() {}

  renderChart() {
    const labels = Object.keys(this._data);
    const data = Object.values(this._data);

    this._context.height = labels.length * BAR_HEIGHT;

    return chart(this._context, { labels, data });
  }
}
