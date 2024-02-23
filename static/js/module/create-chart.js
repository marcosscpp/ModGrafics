export default class RegisterChart {
  constructor(chartId, dataset) {
    this.dataset = dataset;
    this.chartId = chartId;
    this.chartElement = document.getElementById(this.chartId);
    this.ctx = this.chartElement.getContext("2d");
    this.init();
  }

  init() {
    this.renderChart();
    const visualFilterForm = document.getElementById("visual-filters");
    visualFilterForm.addEventListener("change", () => {
      const newOptions = {
        type: visualFilterForm.querySelector("#chart-type").value,
        backgroundColor:
          visualFilterForm.querySelector("#chart-bg-color").value,
        borderColor: visualFilterForm.querySelector("#line-color").value,
      };
      this.visualUpdate(newOptions);
    });
  }

  renderChart() {
    this.chart = new Chart(this.ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            data: this.formatData(this.dataset),
            label: "teste",
            borderWidth: 2,
            backgroundColor: "red",
            borderColor: "#36A2EB",
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  updateChart(newDataset) {
    console.log(newDataset);
    this.dataset = newDataset;
    this.chart.data.datasets[0].data = this.formatData(this.dataset);
    this.chart.update();
  }

  visualUpdate(options) {
    const chartOptions = this.chart.data.datasets[0];
    chartOptions.backgroundColor = options.backgroundColor;
    chartOptions.type = options.type;
    chartOptions.borderColor = options.borderColor;
    this.chart.update();
  }

  formatData(dataset) {
    const datasetFormated = [];
    const unifiedData = this.sumDataPerDay(dataset);
    for (const data of unifiedData) {
      const date = new Date(data.date.replace("GMT", ""));
      const register = {
        x: date.toLocaleDateString("pt-BR"),
        y: data.amount,
      };
      datasetFormated.push(register);
    }
    return datasetFormated;
  }

  sumDataPerDay(dataset) {
    const result = Object.values(
      dataset.reduce((acumulator, curVal) => {
        acumulator[curVal.date] = acumulator[curVal.date] || {
          date: curVal.date,
          amount: 0,
        };
        acumulator[curVal.date].amount += +curVal.amount;
        return acumulator;
      }, {})
    );
    return result;
  }
}
