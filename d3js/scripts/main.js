import { drawStackedBarChart } from "./stackedBarChart.js";
import { drawGaugeChart } from "./gaugeChart.js";

const rawData = [
  { year: 2004, country: "Norway", sites: 5 },
  { year: 2022, country: "Norway", sites: 8 },
  { year: 2004, country: "Denmark", sites: 4 },
  { year: 2022, country: "Denmark", sites: 10 },
  { year: 2004, country: "Sweden", sites: 13 },
  { year: 2022, country: "Sweden", sites: 15 }
];

const colors = {
  Norway: "#2B314D",
  Denmark: "#A54836",
  Sweden: "#5375D4"
};

drawStackedBarChart({ svgSelector: "#Stacked-BarChart", data: rawData, colors });
drawGaugeChart({ svgSelector: "Gauge-Chart",  data: rawData,  width: 600, height: 400  });


