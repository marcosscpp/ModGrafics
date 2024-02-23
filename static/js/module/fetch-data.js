import RegisterChart from "./create-chart.js";
let chart;

export default async function fetchData(endpoint, filters) {
  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Falha na resposta da rede");
      }
      return response.json();
    })
    .then((data) => {
      if (chart) {
        const x = data;
        chart.updateChart(x);
      } else {
        chart = new RegisterChart("chart", data);
      }
    });
}
