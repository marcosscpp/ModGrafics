import extractFormData from "./module/extract-form.js";
import fetchData from "./module/fetch-data.js";

const filterForm = document.getElementById("filters");
const visualFilterForm = document.getElementById("visual-filters");


filterForm.addEventListener("change", (e) => {
  e.preventDefault();
  const filters = extractFormData(filterForm);
  fetchData("/get-filter-data", filters);
});




// visualFilterForm.addEventListener("change", () => {
//   const newOptions = {
//     type: visualFilterForm.querySelector("#chart-type").value,
//     backgroundColor: visualFilterForm.querySelector("#chart-color").value,
//   };
//   updateChart(newOptions);
// });
