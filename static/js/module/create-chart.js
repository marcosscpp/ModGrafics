export default class RegisterChart {
  constructor(chartId, dataset) {
    this.dataset = dataset;
    this.chartId = chartId;
    this.chartElement = document.getElementById(this.chartId);
    this.chartElement.width = "100%";
    this.chartElement.height = "100%";
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

  getResume() {
    let max = 0;
    const total = this.dataset.reduce((accumulator, curVal) => {
      if (curVal.amount > max) {
        max = curVal.amount;
      }
      return accumulator + parseInt(curVal.amount);
    }, 0);

    const result = {
      total: total,
      max: max,
      average: parseInt(total / this.dataset.length),
    };

    return result;
  }

  renderChart() {
    this.updateTitle();
    this.updateResume();
    this.chart = new Chart(this.ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            data: this.formatData(this.dataset),
            label: document.querySelector("[name='actions']").value,
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

  updateTitle() {
    const currentAction = document.querySelector("[name='actions']").value;
    const currentClient = document.querySelector("[name='clients']");
    let newTitle = "";
    if (currentClient) {
      newTitle +=
        currentClient.options[currentClient.selectedIndex].text + " - ";
    }
    newTitle += currentAction;
    document.querySelector("[data-title]").innerText = newTitle;
  }

  updateChart(newDataset) {
    this.dataset = newDataset;
    this.updateTitle();
    this.updateResume();
    this.chart.data.datasets[0].data = this.formatData(this.dataset);
    this.chart.data.datasets[0].label =
      document.querySelector("[name='actions']").value;
    this.chart.update();
  }

  updateResume() {
    const total = document.querySelector("[data-resume='total']");
    const max = document.querySelector("[data-resume='max']");
    const average = document.querySelector("[data-resume='average']");
    const data = this.getResume();
    total.innerText = data.total;
    max.innerText = data.max;
    average.innerText = data.average;
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
